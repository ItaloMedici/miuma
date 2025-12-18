"use server";

import { CaregiverProfile } from "@/interfaces/profile";
import { getServerSession } from "@/lib/auth-server";
import { logger } from "@/lib/logger";
import { formatCurrency } from "@/lib/utils/currency";
import { lexicalToMarkdown } from "@/lib/utils/markdown";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound, redirect } from "next/navigation";
import { CAREGIVER_IMAGE_PLACEHOLDER } from "../(caregiver)/cuidador/perfil/constants";

export const getProfile = async (
  profileSlug: string
): Promise<CaregiverProfile> => {
  const caregiver = await caregiverUseCases.getBySlug(profileSlug);

  if (!caregiver) {
    logger.info({
      msg: "Caregiver profile not found",
      profileSlug,
    });
    notFound();
  }

  const session = await getServerSession();

  const isMyProfile = Boolean(
    session?.user && caregiver && caregiver.userId === session.user.id
  );

  if (!isMyProfile && (!caregiver.active || !caregiver.accountVerified)) {
    notFound();
  }

  const { address, data: caregiverData } = caregiver;

  const location = `${address?.city}, ${address?.state}`;

  const joinedAtDate = new Date(caregiver.createdAt);
  const memberSince = formatDate(joinedAtDate, "LLLL yyyy", { locale: ptBR });
  const shortMemberSince = formatDate(joinedAtDate, "LLL yy", { locale: ptBR });

  const isSubscriptionReady = caregiver.subscriptionPaymentStatus === "READY";

  const paymentIsInitialized = isSubscriptionReady || Boolean(caregiver.pixKey);

  const isProfileActive = caregiver.active && caregiver.accountVerified;

  const isReadyForDonations =
    isMyProfile || (paymentIsInitialized && isProfileActive);

  const descriptionMarkdown = caregiverData.descriptionMarkdown
    ? lexicalToMarkdown(caregiverData.descriptionMarkdown)
    : "";

  return {
    profile: {
      animalsCount: caregiver.totalAnimalsCared,
      id: caregiver.profileSlug,
      imageUrl: caregiver.caregiverImageUrl?.length
        ? caregiver.caregiverImageUrl
        : CAREGIVER_IMAGE_PLACEHOLDER,
      location,
      memberSince,
      shortMemberSince,
      name: caregiver.publicName,
      verified: caregiver.accountVerified as boolean,
      active: caregiver.active,
      shortBio: caregiver.shortBio,
    },
    isMyProfile,
    billingInfo: {
      currentMonthlySupport: formatCurrency(0),
      monthlyGoal: formatCurrency(2500),
      percentAchieved: 0,
      supporters: 0,
      pixKey: caregiver.pixKey ?? undefined,
      isReadyForDonations,
      isProfileActive,
      subscriptionPaymentStatus: caregiver.subscriptionPaymentStatus,
    },
    galleryImages: caregiverData.galleryImages,
    descriptionMarkdown,
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
