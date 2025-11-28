import { CaregiverDataJson } from "@/interfaces/caregiver";
import { CaregiverProfile } from "@/interfaces/profile";
import { formatCurrency } from "@/lib/utils/currency";
import { addressUseCases } from "@/use-cases/address";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { userUseCases } from "@/use-cases/user";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound, redirect } from "next/navigation";

// Phase 1: Updated to use new relational structure
export const getProfile = async (
  profileSlug: string
): Promise<CaregiverProfile> => {
  const caregiver = await caregiverUseCases.getCaregiverByProfileSlug(
    profileSlug
  );

  if (!caregiver) {
    notFound();
  }

  const user = await userUseCases.getUser(caregiver.userId);
  if (!user) {
    notFound();
  }

  const address = await addressUseCases.getAddress(caregiver.addressId);
  if (!address) {
    notFound();
  }

  const caregiverData = JSON.parse(caregiver.data) as CaregiverDataJson;

  const location = `${address.city}, ${address.state}`;

  const joinedAtDate = new Date(caregiver.createdAt);
  const memberSince = formatDate(joinedAtDate, "LLLL yyyy", { locale: ptBR });
  const shortMemberSince = formatDate(joinedAtDate, "LLL yy", { locale: ptBR });

  return {
    profile: {
      animalsCount: caregiverData.petsInCare.length,
      id: caregiver.profileSlug,
      imageUrl: caregiver.caregiverImageUrl,
      location,
      memberSince,
      shortMemberSince,
      name: caregiver.publicName ?? caregiver.name,
      verified: caregiver.accountVerified,
      active: caregiver.active,
      shortBio: caregiverData.shortBio,
    },
    billingInfo: {
      // Phase 1: Mock values since stats are removed
      // In Phase 2, these will come from TRANSACTIONS/SUBSCRIPTIONS tables
      currentMonthlySupport: formatCurrency(0),
      monthlyGoal: formatCurrency(2500),
      percentAchieved: 0,
      supporters: 0,
      pixKey: caregiver.pixKey,
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
