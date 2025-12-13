import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { profile } from "console";
import { Metadata } from "next";
import { cache } from "react";
import { getProfile } from "./action";
import CaregiverDescription from "./components/CaregiverDescription";
import { CaregiverHeader } from "./components/CaregiverHeader";
import { CaregiverProfileProvider } from "./components/context";
import { DonationCard } from "./components/DonationCard";
import { Gallery } from "./components/Gallery";
import { MobileDonationBar } from "./components/MobileDonationBar";
import { MyProfileHeader } from "./components/MyProfileHeader";
import { OngoingCases } from "./components/OngoingCases";
import { PetsInCare } from "./components/PetsInCare";
import { ProfileNavHeader } from "./components/ProfileNavHeader";
import { RecentUpdates } from "./components/RecentUpdates";
import { SocialMedia } from "./components/SocialMedia";
import { SocialProofSection } from "./components/SocialProofSection";

type Params = {
  profileSlug: string;
};

const cachedProfile = cache((slug: string) => {
  return getProfile(slug);
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const paramsList = await params;
  const id = paramsList.profileSlug;

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
  params: Promise<Params>;
}) {
  const paramsList = await params;
  const id = paramsList.profileSlug;

  const caregiver = await cachedProfile(id);

  return (
    <CaregiverProfileProvider profile={caregiver}>
      <MyProfileHeader />
      <div className="bg-background min-h-screen">
        <ProfileNavHeader />

        <main className="px-6 pt-6 pb-24 md:pt-12 lg:pb-20">
          <section id="fotos" className="mb-8">
            <div className="container mx-auto max-w-7xl">
              <Gallery />
            </div>
          </section>

          <div>
            <div className="container mx-auto max-w-7xl">
              <div className="grid items-start gap-8 lg:grid-cols-3">
                <div
                  className={cn("space-y-8 md:space-y-12 lg:col-span-2", {
                    "lg:col-span-3":
                      !caregiver?.billingInfo.isReadyForDonations,
                  })}
                >
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

                {caregiver?.billingInfo.isReadyForDonations && (
                  <div className="hidden lg:sticky lg:top-18 lg:block">
                    <DonationCard />
                  </div>
                )}
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
