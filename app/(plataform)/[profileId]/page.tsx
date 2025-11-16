import { Footer } from "@/components/footer";
import { getProfile } from "./action";
import CaregiverDescription from "./components/CaregiverDescription";
import { CaregiverHeader } from "./components/CaregiverHeader";
import { DonationCard } from "./components/DonationCard";
import { Gallery } from "./components/Gallery";
import { MobileDonationBar } from "./components/MobileDonationBar";
import { OngoingCases } from "./components/OngoingCases";
import { PetsInCare } from "./components/PetsInCare";
import { RecentUpdates } from "./components/RecentUpdates";
import { SocialProofSection } from "./components/SocialProofSection";

export default async function CaregiverProfile({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const id = (await params).profileId;

  const caregiver = await getProfile(id);

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar variant="full" /> */}

      <main className="pt-6 md:pt-12 pb-24 lg:pb-20 px-6">
        {/* Gallery Section */}
        <section id="fotos" className="mb-8">
          <div className="container mx-auto max-w-7xl">
            <Gallery gallery={caregiver.galleryImages} />
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div>
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Left Content Column */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-12">
                  <CaregiverHeader profile={caregiver.profile} />
                </div>

                <CaregiverDescription
                  description={caregiver.descriptionMarkdown}
                />

                {/* <BillingProgress billingInfo={caregiver.billingInfo} /> */}

                <PetsInCare pets={caregiver.petsInCare} />

                <OngoingCases cases={caregiver.ongoingCases} />

                <RecentUpdates updates={caregiver.recentUpdates} />

                <SocialProofSection socialProof={caregiver.socialProof} />
              </div>

              {/* Right Sticky Donation Card - Desktop only */}
              <div className="hidden lg:block lg:sticky lg:top-12">
                <DonationCard profileId={caregiver.profile.id} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Donation Bar */}
      <MobileDonationBar profileId={caregiver.profile.id} />

      <Footer />
    </div>
  );
}
