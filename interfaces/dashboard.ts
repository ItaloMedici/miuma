// Dashboard-specific interfaces
// This acts as a BFF (Backend for Frontend) data structure
// Combining data from multiple sources into a single, optimized interface

export interface DashboardData {
  profile: DashboardProfile;
  analytics: DashboardAnalytics;
  monthlyGoal: MonthlyGoalData;
  recentActivity: DonationActivity[];
  donors: DonorsData;
  communications: CommunicationData[];
  billing: BillingData;
}

// ============================================================================
// FUTURE: Campaign/Cases Feature (Not in MVP)
// ============================================================================
// Campaign functionality will be added in a future release

export interface DashboardProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  profileId: string;
  verified: boolean;
  active: boolean;
  joinedAt: string;
  location: string;
}

export interface DashboardAnalytics {
  totalRevenue: number;
  formattedTotalRevenue: string;
  averageDonation: number;
  formattedAverageDonation: string;
  totalSupporters: number;
  monthlySupporters: number;
  growthRate: number;
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
}

export interface MonthlyGoalData {
  monthlyGoalAmount: number;
  formattedMonthlyGoal: string;
  currentMonthAmount: number;
  formattedCurrentAmount: string;
  percentAchieved: number;
  remainingAmount: number;
  formattedRemainingAmount: string;
  totalMonthlySupporters: number;
  monthlyRecurringDonations: number;
  formattedMonthlyRecurring: string;
}

export interface DonationActivity {
  id: string;
  donorName: string;
  donorId: string;
  amount: number;
  formattedAmount: string;
  type: "monthly" | "one-time";
  date: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  timeAgo: string;
}

export interface DonorsData {
  summary: {
    totalSupporters: number;
    monthlySupporters: number;
    onetimeSupporters: number;
    newsletterSubscribers: number;
  };
  monthlyDonors: MonthlyDonor[];
}

export interface MonthlyDonor {
  supporterId: string;
  name: string;
  email: string;
  imageUrl?: string;
  value: number;
  formattedValue: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  firstDonationDate: string;
  lastDonationDate: string;
  totalDonations: number;
  donationCount: number;
}

export interface CommunicationData {
  id: string;
  date: string;
  title: string;
  message: string;
  sentTo: "all" | "monthly" | "specific";
  recipientCount: number;
  openedCount: number;
  clickCount: number;
  deliveryStatus: "sent" | "delivered" | "failed";
  images?: Array<{
    url: string;
    alt: string;
  }>;
  tags: string[];
  formattedDate: string;
  openRate: number;
  clickRate: number;
}

export interface BillingData {
  summary: BillingSummary;
  transactions: TransactionData[];
  feeStructure: FeeStructure;
}

export interface BillingSummary {
  totalProcessed: number;
  formattedTotalProcessed: string;
  totalTransferred: number;
  formattedTotalTransferred: string;
  pendingTransfers: number;
  formattedPendingTransfers: string;
  averageTransferTime: string;
  totalFees: number;
  formattedTotalFees: string;
}

export interface TransactionData {
  id: string;
  date: string;
  formattedDate: string;
  amount: number;
  formattedAmount: string;
  status: "completed" | "processing" | "failed";
  donorName: string;
  donorId: string;
  type: "monthly" | "one-time";
  paymentMethod: "pix" | "credit_card" | "boleto";
  splitDetails: {
    platformRate: number;
    processorRate: number;
    platformFee: number;
    formattedPlatformFee: string;
    paymentProcessorFee: number;
    formattedProcessorFee: string;
    totalFees: number;
    formattedTotalFees: string;
    netAmount: number;
    formattedNetAmount: string;
    transferredAt?: string;
    formattedTransferredAt?: string;
    transferStatus: "completed" | "processing" | "pending" | "failed";
  };
}

export interface FeeStructure {
  platformRate: number;
  platformRateFormatted: string;
  processorRate: number;
  processorRateFormatted: string;
  totalRate: number;
  totalRateFormatted: string;
}

// ============================================================================
// FUTURE FEATURES - Not included in MVP
// ============================================================================

/**
 * Campaign/Cases Feature - Planned for future release
 * Allows caregivers to create specific fundraising campaigns
 */
export interface CampaignData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  targetAmount: number;
  formattedTargetAmount: string;
  currentAmount: number;
  formattedCurrentAmount: string;
  percentAchieved: number;
  remainingAmount: number;
  formattedRemainingAmount: string;
  status: "active" | "completed" | "paused";
  startDate: string;
  endDate?: string;
  donorCount: number;
  updatesCount: number;
  category: string;
}
