import { Footer } from "@/components/footer";
import { profile } from "console";
import { Metadata } from "next";
import { cache } from "react";
import { getProfile } from "./action";
import CaregiverDescription from "./components/CaregiverDescription";
import { CaregiverHeader } from "./components/CaregiverHeader";
import { DonationCard } from "./components/DonationCard";
import { Gallery } from "./components/Gallery";
import { MobileDonationBar } from "./components/MobileDonationBar";
import { OngoingCases } from "./components/OngoingCases";
import { PetsInCare } from "./components/PetsInCare";
import { ProfileNavHeader } from "./components/ProfileNavHeader";
import { RecentUpdates } from "./components/RecentUpdates";
import { SocialMedia } from "./components/SocialMedia";
import { SocialProofSection } from "./components/SocialProofSection";

const cachedProfile = cache((id: string) => {
  return getProfile(id);
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}): Promise<Metadata> => {
  const paramsList = await params;
  const id = paramsList.profileId;

  const caregiver = await cachedProfile(id);

  if (!caregiver) {
    return { title: "Cuidador não encontrado" };
  }

  const title = `${caregiver.profile.name} — Cuidador de animais em ${caregiver.profile.location}`;
  const description =
    caregiver.profile.shortBio ||
    `Conheça ${profile.name}, cuidador de animais na Miuma.`;

  return {
    title,
    description,
  };
};

export default async function CaregiverProfile({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const paramsList = await params;
  const id = paramsList.profileId;

  const caregiver = await cachedProfile(id);

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar variant="full" /> */}
      <ProfileNavHeader />

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
              <div className="lg:col-span-2 space-y-8 md:space-y-12">
                <CaregiverHeader
                  profile={caregiver.profile}
                  socialMedia={caregiver.socialMedia}
                />

                <section id="sobre">
                  <CaregiverDescription
                    description={caregiver.descriptionMarkdown}
                  />
                </section>

                {/* <BillingProgress billingInfo={caregiver.billingInfo} /> */}

                <section id="animais">
                  <PetsInCare pets={caregiver.petsInCare} />
                </section>

                <section id="casos">
                  <OngoingCases cases={caregiver.ongoingCases} />
                </section>

                <section id="atualizacoes">
                  <RecentUpdates updates={caregiver.recentUpdates} />
                </section>

                <SocialProofSection socialProof={caregiver.socialProof} />

                <SocialMedia socialMedia={caregiver.socialMedia} />
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
