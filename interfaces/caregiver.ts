export interface CaregiverProfile {
  profile: CaregiverProfileInfo;

  galleryImages: CoregiverProfileGallery;
  descriptionMarkdown: string;

  billingInfo: CaregiverProfileBillingInfo;

  transparency: {
    foodCosts: number;
    medicalCosts: number;
    otherCosts: number;
    reportMarkdown: string;
  };

  ongoingCases: OngoingCase[];
  recentUpdates: RecentUpdate[];
  socialProof: SocialProof;
  petsInCare: PetInCare[];
}

export interface OngoingCase {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  imageUrl?: string;
}

export interface RecentUpdate {
  id: string;
  date: string;
  message: string;
  emoji?: string;
  images?: Image[];
}

export interface SocialProof {
  totalSupporters: number;
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  date: string;
  message: string;
  avatar?: string;
}

interface Image {
  url: string;
  alt: string;
}

export interface PetInCare {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface CaregiverProfileInfo {
  id: string;
  name: string;
  location: string;
  memberSince: string;
  animalsCount: number;
  verified: boolean;
  active?: boolean;
  imageUrl: string;
}

export interface CoregiverProfileGallery {
  cover: Image;
  photos: Image[];
}

export interface CaregiverProfileBillingInfo {
  monthlyGoal: string;
  currentSupport: string;
  supporters: number;
  percentAchieved: number;
}
