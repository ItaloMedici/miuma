"use server";

import { CaregiverProfile } from "@/interfaces/profile";
import { getServerSession } from "@/lib/auth-server";
import { formatCurrency } from "@/lib/utils/currency";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound, redirect } from "next/navigation";

export const getProfile = async (
  profileSlug: string
): Promise<CaregiverProfile> => {
  const caregiver = await caregiverUseCases.getBySlug(profileSlug);

  if (!caregiver) {
    notFound();
  }

  const session = await getServerSession();

  // Allow the caregiver to view their own profile even if inactive/unverified
  const isMyProfile =
    session?.user && caregiver && caregiver.userId === session.user.id;

  if (!isMyProfile && (!caregiver.active || !caregiver.accountVerified)) {
    notFound();
  }

  const { address, data: caregiverData } = caregiver;

  const location = `${address?.city}, ${address?.state}`;

  const joinedAtDate = new Date(caregiver.createdAt);
  const memberSince = formatDate(joinedAtDate, "LLLL yyyy", { locale: ptBR });
  const shortMemberSince = formatDate(joinedAtDate, "LLL yy", { locale: ptBR });

  const isReadyForDonations =
    caregiver.subscriptionPaymentStatus === "READY" ||
    Boolean(caregiver.pixKey);

  return {
    profile: {
      animalsCount: caregiver.totalAnimalsCared,
      id: caregiver.profileSlug,
      imageUrl: caregiver.caregiverImageUrl ?? undefined,
      location,
      memberSince,
      shortMemberSince,
      name: caregiver.publicName,
      verified: caregiver.accountVerified as boolean,
      active: caregiver.active,
      shortBio: caregiver.shortBio,
    },
    billingInfo: {
      currentMonthlySupport: formatCurrency(0),
      monthlyGoal: formatCurrency(2500),
      percentAchieved: 0,
      supporters: 0,
      pixKey: caregiver.pixKey ?? undefined,
      isReadyForDonations,
      subscriptionPaymentStatus: caregiver.subscriptionPaymentStatus,
    },
    galleryImages: caregiverData.galleryImages,
    descriptionMarkdown: caregiverData.descriptionMarkdown,
    socialMedia: caregiverData.socialMedia,
    ongoingCases: caregiverData.ongoingCases,
    recentUpdates: caregiverData.recentUpdates,
    socialProof: caregiverData.socialProof,
    petsInCare: caregiverData.petsInCare,
    expenses: caregiverData.expenses,
  };
};

export const subscribeMonthlySupporter = async ({
  profileId,
}: {
  profileId: string;
  value: number;
}) => {
  // TODO: implement subscription logic

  redirect(`/${profileId}/checkout`);
};
