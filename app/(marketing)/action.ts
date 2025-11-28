import { CaregiverDataJson } from "@/interfaces/caregiver";
import { LandingPageData } from "@/interfaces/marketing";
import { caregivers } from "@/lib/mock/caregiver";

export const getLandingPageData = async (): Promise<LandingPageData> => {
  const caregiversList = caregivers;

  const summaryCaregivers: LandingPageData["caregivers"] = caregiversList.map(
    (cg) => {
      const data = JSON.parse(cg.data) as CaregiverDataJson;

      const petsCount = data.petsInCare.length;

      const petsUnderCare = `${petsCount} ${
        petsCount === 1 ? "animal" : "animais"
      } sob cuidado${petsCount === 1 ? "" : "s"}`;

      return {
        id: cg.id,
        profileId: cg.profileSlug,
        name: cg.publicName ?? cg.name,
        petsUnderCare,
        imageUrl: cg.caregiverImageUrl,
        shortBio: data.shortBio,
      };
    }
  );

  return {
    caregivers: summaryCaregivers,
    impact: {
      totalCaregivers: "3",
      totalPetsHelped: "20",
      totalDonations: "18k",
    },
  };
};
