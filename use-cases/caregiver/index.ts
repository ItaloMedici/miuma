import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";
import { caregivers } from "@/lib/mock/caregiver";

async function getCaregiverByProfileId(profileId: string) {
  return caregivers.find((caregiver) => caregiver.profileId === profileId);
}

function parseDataJson(careguiver: CaregiverEntity) {
  return JSON.parse(careguiver.data) as CaregiverDataJson;
}

export const caregiverUseCases = { getCaregiverByProfileId, parseDataJson };
