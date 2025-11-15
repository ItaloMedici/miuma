export interface LandingPageData {
  caregivers: Array<{
    id: string;
    profileId: string;
    name: string;
    workDescription: string;
    petsUnderCare: string;
    imageUrl?: string;
    testimonial: string;
  }>;
  impact: {
    totalCaregivers: string;
    totalPetsHelped: string;
    totalDonations: string;
  };
}
