export type SubscriptionPaymentStatus =
  | "DISABLED"
  | "PENDING_PROVIDER_SETUP"
  | "REJECTED"
  | "READY";

export interface CaregiverEntity {
  id: string;

  // Relations
  userId: string; // FK to USERS table
  profileSlug: string; // Unique identifier for profile URL (was profileId)
  addressId: string; // FK to ADDRESSES table

  // Account info
  accountVerified: boolean;
  active: boolean;
  profileUrl: string;

  // Payment info
  subscriptionPaymentStatus: SubscriptionPaymentStatus;
  pixKey: string;
  providerReceiverId: string | null; // ID from payment provider (was receiverId)

  // Profile image (moved from JSON)
  caregiverImageUrl: string;
  name: string;
  publicName?: string;

  // Location data (moved to ADDRESSES table via addressId)
  // name, email, emailVerified (moved to USERS table via userId)

  // JSON field containing only profile data (simplified)
  data: string; // CaregiverDataJson

  // Timestamps
  createdAt: string;
  updatedAt: string;
  inactiveAt?: string;
}

export interface CaregiverDataJson {
  galleryImages: CaregiverGallery;
  descriptionMarkdown: string;
  shortBio: string;
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
  expenses: Expenses[];
}

export interface CaregiverGallery {
  cover: Image;
  photos: Image[];
}

export interface OngoingCase {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
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

export interface PetInCare {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Expenses {
  title: string;
  amount: number;
  date: string;
  occurrence: "on-demand" | "monthly" | "annual";
  type: "food" | "medical" | "home" | "other";
  receiptUrl?: string;
}

export interface Image {
  url: string;
  alt: string;
}
