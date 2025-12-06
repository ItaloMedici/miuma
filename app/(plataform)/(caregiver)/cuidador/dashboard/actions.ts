"use server";

import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";
import {
  BillingData,
  CommunicationData,
  DashboardAnalytics,
  DashboardData,
  DonationActivity,
  DonorsData,
  MonthlyDonor,
  MonthlyGoalData,
  TransactionData,
} from "@/interfaces/dashboard";
import { formatCurrency } from "@/lib/utils/currency";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";

/**
 * BFF (Backend for Frontend) for Dashboard
 * Combines data from multiple sources and formats it for the dashboard
 */
export const getDashboardData = async (
  profileId: string
): Promise<DashboardData> => {
  // Fetch caregiver data
  const caregiver = await caregiverUseCases.getCaregiverByProfileId(profileId);

  if (!caregiver) {
    notFound();
  }

  const caregiverData = JSON.parse(caregiver.data) as CaregiverDataJson;

  // Parse and format all dashboard sections
  const profile = parseDashboardProfile(caregiver, caregiverData);
  const analytics = parseAnalytics(caregiverData);
  const monthlyGoal = parseMonthlyGoal(caregiverData);
  const recentActivity = parseRecentActivity(caregiverData);
  const donors = parseDonors(caregiverData);
  const communications = parseCommunications(caregiverData);
  const billing = parseBilling(caregiverData);

  return {
    profile,
    analytics,
    monthlyGoal,
    recentActivity,
    donors,
    communications,
    billing,
  };
};

// ============================================================================
// PROFILE PARSING
// ============================================================================

function parseDashboardProfile(
  caregiver: CaregiverEntity,
  data: CaregiverDataJson
): DashboardData["profile"] {
  return {
    id: caregiver.id,
    name: caregiver.name,
    email: caregiver.email,
    imageUrl: data.profile.caregiverImageUrl,
    profileId: caregiver.profileId,
    verified: caregiver.accountVerified,
    active: caregiver.active,
    joinedAt: caregiver.joinedAt,
    location: `${data.profile.location.city}, ${data.profile.location.state}`,
  };
}

// ============================================================================
// ANALYTICS PARSING
// ============================================================================

function parseAnalytics(data: CaregiverDataJson): DashboardAnalytics {
  // Calculate total revenue from actual donations
  const totalRevenue = data.history.donationsReceived.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  // Calculate average donation
  const totalDonations = data.history.donationsReceived.length;
  const averageDonation =
    totalDonations > 0 ? totalRevenue / totalDonations : 0;

  // Calculate conversion rate (supporters / unique visitors)
  const conversionRate =
    data.analytics.uniqueVisitors > 0
      ? (data.stats.totalSupporters / data.analytics.uniqueVisitors) * 100
      : 0;

  // Mock growth rate - TODO: Calculate from time-series data
  const growthRate = data.analytics.growthRate || 0;

  return {
    totalRevenue,
    formattedTotalRevenue: formatCurrency(totalRevenue),
    averageDonation,
    formattedAverageDonation: formatCurrency(averageDonation),
    totalSupporters: data.stats.totalSupporters,
    monthlySupporters: data.stats.totalMonthlySupporters,
    growthRate,
    pageViews: data.analytics.pageViews,
    uniqueVisitors: data.analytics.uniqueVisitors,
    conversionRate: Number(conversionRate.toFixed(1)),
  };
}

// ============================================================================
// MONTHLY GOAL PARSING
// ============================================================================

function parseMonthlyGoal(data: CaregiverDataJson): MonthlyGoalData {
  const monthlyGoalAmount = data.stats.goal.monthlyGoalAmount;
  const currentMonthAmount = data.stats.goal.currentMonthAmount;

  // Calculate percentage achieved
  const percentAchieved =
    monthlyGoalAmount > 0
      ? Math.round((currentMonthAmount / monthlyGoalAmount) * 100)
      : 0;

  // Calculate remaining amount
  const remainingAmount = Math.max(0, monthlyGoalAmount - currentMonthAmount);

  // Calculate total monthly recurring from supporters
  const monthlyRecurringDonations = data.monthlySupporters.reduce(
    (sum, supporter) => sum + supporter.value,
    0
  );

  return {
    monthlyGoalAmount,
    formattedMonthlyGoal: formatCurrency(monthlyGoalAmount),
    currentMonthAmount,
    formattedCurrentAmount: formatCurrency(currentMonthAmount),
    percentAchieved,
    remainingAmount,
    formattedRemainingAmount: formatCurrency(remainingAmount),
    totalMonthlySupporters: data.stats.totalMonthlySupporters,
    monthlyRecurringDonations,
    formattedMonthlyRecurring: formatCurrency(monthlyRecurringDonations),
  };
}

// ============================================================================
// RECENT ACTIVITY PARSING
// ============================================================================

function parseRecentActivity(data: CaregiverDataJson): DonationActivity[] {
  return data.history.donationsReceived.slice(0, 10).map((donation) => ({
    id: `${donation.supporterId}-${donation.date}`,
    donorName: donation.supporterName,
    donorId: donation.supporterId,
    amount: donation.amount,
    formattedAmount: formatCurrency(donation.amount),
    type: donation.type,
    date: donation.date,
    location: donation.location,
    timeAgo: formatDistanceToNow(new Date(donation.date), {
      addSuffix: true,
      locale: ptBR,
    }),
  }));
}

// ============================================================================
// DONORS PARSING
// ============================================================================

function parseDonors(data: CaregiverDataJson): DonorsData {
  const totalSupporters = data.stats.totalSupporters;
  const monthlySupporters = data.stats.totalMonthlySupporters;
  const onetimeSupporters = totalSupporters - monthlySupporters;

  const monthlyDonors: MonthlyDonor[] = data.monthlySupporters.map(
    (supporter) => {
      // Mock additional fields - TODO: Get from actual donor history
      const mockFirstDonation = new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString();
      const mockLastDonation = new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      const mockTotalDonations =
        supporter.value * Math.floor(Math.random() * 12 + 1);
      const mockDonationCount = Math.floor(Math.random() * 12) + 1;

      return {
        supporterId: supporter.supporterId,
        name: supporter.name,
        email: supporter.email,
        imageUrl: supporter.imageUrl,
        value: supporter.value,
        formattedValue: formatCurrency(supporter.value),
        location: supporter.location,
        firstDonationDate: mockFirstDonation,
        lastDonationDate: mockLastDonation,
        totalDonations: mockTotalDonations,
        donationCount: mockDonationCount,
      };
    }
  );

  return {
    summary: {
      totalSupporters,
      monthlySupporters,
      onetimeSupporters,
      newsletterSubscribers: data.newsletterSubscribers.length,
    },
    monthlyDonors,
  };
}

// ============================================================================
// COMMUNICATIONS PARSING
// ============================================================================

function parseCommunications(data: CaregiverDataJson): CommunicationData[] {
  return data.communications.map((comm) => {
    // Mock engagement metrics - TODO: Get from email service
    const mockOpenedCount = Math.floor(comm.recipientCount * 0.7);
    const mockClickCount = Math.floor(mockOpenedCount * 0.3);
    const openRate = (mockOpenedCount / comm.recipientCount) * 100;
    const clickRate = (mockClickCount / comm.recipientCount) * 100;

    return {
      id: comm.id,
      date: comm.date,
      title: comm.title,
      message: comm.message,
      sentTo: comm.sentTo,
      recipientCount: comm.recipientCount,
      openedCount: mockOpenedCount,
      clickCount: mockClickCount,
      deliveryStatus: "delivered", // Mock - TODO: Get from email service
      images: comm.images,
      tags: ["update"], // Mock - TODO: Get from actual tags
      formattedDate: format(new Date(comm.date), "dd 'de' MMMM, yyyy", {
        locale: ptBR,
      }),
      openRate: Number(openRate.toFixed(1)),
      clickRate: Number(clickRate.toFixed(1)),
    };
  });
}

// ============================================================================
// BILLING PARSING
// ============================================================================

function parseBilling(data: CaregiverDataJson): BillingData {
  const platformRate = 0.05; // 5%
  const processorRate = 0.045; // 4.5%

  const transactions: TransactionData[] = data.billing.transactions.map(
    (transaction) => {
      // Calculate fees
      const platformFee = transaction.amount * platformRate;
      const paymentProcessorFee = transaction.amount * processorRate;
      const totalFees = platformFee + paymentProcessorFee;
      const netAmount = transaction.amount - totalFees;

      // Mock payment method - TODO: Get from actual transaction data
      const mockPaymentMethod: "pix" | "credit_card" | "boleto" =
        transaction.type === "monthly" ? "credit_card" : "pix";

      return {
        id: transaction.id,
        date: transaction.date,
        formattedDate: format(new Date(transaction.date), "dd/MM/yyyy", {
          locale: ptBR,
        }),
        amount: transaction.amount,
        formattedAmount: formatCurrency(transaction.amount),
        status: transaction.status,
        donorName: transaction.donorName,
        donorId: transaction.donorId,
        type: transaction.type,
        paymentMethod: mockPaymentMethod,
        splitDetails: {
          platformRate,
          processorRate,
          platformFee,
          formattedPlatformFee: formatCurrency(platformFee),
          paymentProcessorFee,
          formattedProcessorFee: formatCurrency(paymentProcessorFee),
          totalFees,
          formattedTotalFees: formatCurrency(totalFees),
          netAmount,
          formattedNetAmount: formatCurrency(netAmount),
          transferredAt: transaction.splitDetails.transferredAt,
          formattedTransferredAt: transaction.splitDetails.transferredAt
            ? format(
                new Date(transaction.splitDetails.transferredAt),
                "dd/MM 'às' HH:mm",
                { locale: ptBR }
              )
            : undefined,
          transferStatus: transaction.splitDetails.transferredAt
            ? "completed"
            : "processing",
        },
      };
    }
  );

  // Calculate summary
  const totalProcessed = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions.reduce(
    (sum, t) => sum + t.splitDetails.totalFees,
    0
  );
  const totalTransferred = transactions
    .filter((t) => t.splitDetails.transferStatus === "completed")
    .reduce((sum, t) => sum + t.splitDetails.netAmount, 0);
  const pendingTransfers = transactions
    .filter((t) => t.splitDetails.transferStatus === "processing")
    .reduce((sum, t) => sum + t.splitDetails.netAmount, 0);

  return {
    summary: {
      totalProcessed,
      formattedTotalProcessed: formatCurrency(totalProcessed),
      totalTransferred,
      formattedTotalTransferred: formatCurrency(totalTransferred),
      pendingTransfers,
      formattedPendingTransfers: formatCurrency(pendingTransfers),
      averageTransferTime: data.billing.summary.averageTransferTime,
      totalFees,
      formattedTotalFees: formatCurrency(totalFees),
    },
    transactions,
    feeStructure: {
      platformRate,
      platformRateFormatted: `${(platformRate * 100).toFixed(1)}%`,
      processorRate,
      processorRateFormatted: `${(processorRate * 100).toFixed(1)}%`,
      totalRate: platformRate + processorRate,
      totalRateFormatted: `${((platformRate + processorRate) * 100).toFixed(
        1
      )}%`,
    },
  };
}
