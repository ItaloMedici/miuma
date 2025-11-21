import { CaregiverDataJson } from "@/interfaces/caregiver";
import { CaregiverProfile } from "@/interfaces/profile";
import { formatCurrency } from "@/lib/utils/currency";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";

export const getProfile = async (
  profileId: string
): Promise<CaregiverProfile> => {
  const caregiver = await caregiverUseCases.getCaregiverByProfileId(profileId);

  if (!caregiver) {
    notFound();
  }

  const caregiverData = JSON.parse(caregiver.data) as CaregiverDataJson;

  const location = `${caregiverData.profile.location.city}, ${caregiverData.profile.location.state}`;

  const joinedAtDate = new Date(caregiver.joinedAt);
  const memberSince = formatDate(joinedAtDate, "LLLL yyyy", { locale: ptBR });
  const shortMemberSince = formatDate(joinedAtDate, "LLL yy", { locale: ptBR });

  return {
    profile: {
      animalsCount: caregiverData.profile.petsInCare.length,
      id: caregiver.profileId,
      imageUrl: caregiverData.profile.caregiverImageUrl,
      location,
      memberSince,
      shortMemberSince,
      name: caregiver.name,
      verified: caregiver.accountVerified,
      active: caregiver.active,
      shortBio: caregiverData.profile.shortBio,
    },
    billingInfo: {
      currentMonthlySupport: formatCurrency(
        caregiverData.stats.goal.currentMonthAmount
      ),
      monthlyGoal: formatCurrency(caregiverData.stats.goal.monthlyGoalAmount),
      percentAchieved: caregiverData.stats.goal.percentAchieved,
      supporters: caregiverData.monthlySupporters.length,
    },
    galleryImages: caregiverData.profile.galleryImages,
    descriptionMarkdown: caregiverData.profile.descriptionMarkdown,
    socialMedia: caregiverData.profile.socialMedia,
    ongoingCases: caregiverData.profile.ongoingCases,
    recentUpdates: caregiverData.profile.recentUpdates,
    socialProof: caregiverData.profile.socialProof,
    petsInCare: caregiverData.profile.petsInCare,

    expenses: caregiverData.profile.expenses,
  };
};
