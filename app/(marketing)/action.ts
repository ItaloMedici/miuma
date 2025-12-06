import { LandingPageData } from "@/interfaces/marketing";
import { logger } from "@/lib/logger";
import { caregiverUseCases } from "@/use-cases/caregiver";

export const getLandingPageData = async (): Promise<LandingPageData> => {
  const allCaregivers = await caregiverUseCases.getAll({ limit: 16 });

  if (!allCaregivers) {
    logger.error({
      msg: "Failed to fetch caregivers for landing page",
    });

    return {
      caregivers: [],
      impact: {
        totalCaregivers: "0",
        totalPetsHelped: "0",
        totalDonations: "0",
      },
    };
  }

  const summaryCaregivers = allCaregivers.map<
    LandingPageData["caregivers"][number]
  >((caregiver) => {
    const petsCount = caregiver.data.petsInCare.length;

    const petsUnderCare = `${petsCount} ${
      petsCount === 1 ? "animal" : "animais"
    } sob cuidado${petsCount === 1 ? "" : "s"}`;

    return {
      id: caregiver.id,
      profileSlug: caregiver.profileSlug,
      name: caregiver.publicName,
      petsUnderCare,
      imageUrl: caregiver.caregiverImageUrl ?? undefined,
      shortBio: caregiver.shortBio,
    };
  });

  const totalPetsHelped = allCaregivers.reduce((acc, caregiver) => {
    return acc + caregiver.totalAnimalsCared;
  }, 0);

  return {
    caregivers: summaryCaregivers,
    impact: {
      totalCaregivers: allCaregivers.length.toString(),
      totalPetsHelped: totalPetsHelped.toString(),
      totalDonations: "0",
    },
  };
};
