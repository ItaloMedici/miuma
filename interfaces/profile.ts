import {
  CaregiverGallery,
  Expenses,
  OngoingCase,
  PetInCare,
  RecentUpdate,
  SocialProof,
} from "./caregiver";

export interface CaregiverProfileInfo {
  id: string;
  name: string;
  location: string;
  memberSince: string;
  shortMemberSince: string;
  animalsCount: number;
  verified: boolean;
  active?: boolean;
  imageUrl: string;
  shortBio: string;
}

export interface CaregiverProfileBillingInfo {
  monthlyGoal: string;
  currentMonthlySupport: string;
  supporters: number;
  percentAchieved: number;
  pixKey?: string;
  subscriptionPaymentStatus:
    | "DISABLED"
    | "PENDING_PROVIDER_SETUP"
    | "REJECTED"
    | "READY";
  isReadyForDonations: boolean;
  isProfileActive: boolean;
}

export interface CaregiverProfile {
  profile: CaregiverProfileInfo;
  galleryImages: CaregiverGallery;

  isMyProfile: boolean;

  descriptionMarkdown: string;

  billingInfo: CaregiverProfileBillingInfo;

  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };

  ongoingCases: OngoingCase[];
  recentUpdates: RecentUpdate[];
  socialProof: SocialProof;
  petsInCare: PetInCare[];

  expenses: Array<Expenses>;
}
