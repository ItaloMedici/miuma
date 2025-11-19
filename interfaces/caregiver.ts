export interface CaregiverEntity {
  id: string;

  // Account info
  profileId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  accountVerified: boolean;
  active: boolean;
  joinedAt: string;
  inactiveAt?: string;

  // Payment info
  receiverId: string;
  pixKey: string;

  // JSON field containing all profile and supporter data
  data: string; // CaregiverDataJson
}

export interface CaregiverDataJson {
  // Profile data for public page
  profile: CaregiverProfileData;

  // Statistics
  stats: {
    totalDonationsReceived: number;
    totalSupporters: number;
    totalMonthlySupporters: number;
    monthlyRecurringDonations: number;

    goal: {
      monthlyGoalAmount: number;
      currentMonthAmount: number;
      percentAchieved: number;
      totalSupportGoalAmount?: number;
    };
  };

  // Newsletter subscribers
  newsletterSubscribers: Array<{
    supporterId: string;
    email: string;
  }>;

  // Monthly supporters
  monthlySupporters: Array<{
    supporterId: string;
    name: string;
    email: string;
    value: number;
    location: {
      city: string;
      state: string;
      country: string;
    };
    imageUrl?: string;
  }>;

  // Donation history
  history: {
    donationsReceived: Array<{
      amount: number;
      date: string;
      supporterId: string;
      supporterName: string;
      location: {
        city: string;
        state: string;
        country: string;
      };
      type: "one-time" | "monthly";
    }>;
  };

  // Dashboard data
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
  };
}

export interface CaregiverProfileData {
  caregiverImageUrl: string;
  galleryImages: CaregiverGallery;
  descriptionMarkdown: string;
  shortBio: string;

  location: {
    city: string;
    state: string;
    country: string;
  };

  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };

  ongoingCases: Array<OngoingCase>;
  recentUpdates: Array<RecentUpdate>;
  socialProof: SocialProof;
  petsInCare: Array<PetInCare>;

  expenses: Array<Expenses>;
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
