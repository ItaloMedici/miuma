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
import { CaregiverProfileProvider } from "./components/context";

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
    openGraph: {
      title,
      description,
    },
    icons: {
      icon: caregiver.profile.imageUrl || "/favicon.ico",
    },
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
    <CaregiverProfileProvider profile={caregiver}>
      <div className="min-h-screen bg-background">
        <ProfileNavHeader />

        <main className="pt-6 md:pt-12 pb-24 lg:pb-20 px-6">
          <section id="fotos" className="mb-8">
            <div className="container mx-auto max-w-7xl">
              <Gallery />
            </div>
          </section>

          <div>
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8 md:space-y-12">
                  <CaregiverHeader />

                  <section id="sobre">
                    <CaregiverDescription />
                  </section>

                  <section id="animais">
                    <PetsInCare />
                  </section>

                  <section id="casos">
                    <OngoingCases />
                  </section>

                  <section id="atualizacoes">
                    <RecentUpdates />
                  </section>

                  <SocialProofSection />

                  <SocialMedia />
                </div>

                <div className="hidden lg:block lg:sticky lg:top-18">
                  <DonationCard />
                </div>
              </div>
            </div>
          </div>
        </main>

        <MobileDonationBar />

        <Footer />
      </div>
    </CaregiverProfileProvider>
  );
}
