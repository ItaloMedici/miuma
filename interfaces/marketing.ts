export interface LandingPageData {
  caregivers: Array<{
    id: string;
    profileSlug: string;
    name: string;
    petsUnderCare: string;
    imageUrl?: string;
    shortBio: string;
  }>;
  impact: {
    totalCaregivers: string;
    totalPetsHelped: string;
    totalDonations: string;
  };
}
