import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";
import { caregivers } from "@/lib/mock/caregiver";

async function getCaregiverByProfileSlug(profileSlug: string) {
  return caregivers.find((caregiver) => caregiver.profileSlug === profileSlug);
}

function parseDataJson(caregiver: CaregiverEntity) {
  return JSON.parse(caregiver.data) as CaregiverDataJson;
}

export const caregiverUseCases = {
  getCaregiverByProfileSlug,
  parseDataJson,
  getCaregiverByProfileId: getCaregiverByProfileSlug,
};
