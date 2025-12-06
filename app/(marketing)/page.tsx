import { Footer } from "@/components/footer";
import { Navbar } from "../../components/nav-bar";
import { getLandingPageData } from "./action";
import { About } from "./components/about";
import { DualCTA } from "./components/dual-cta";
import { FeaturedCaregivers } from "./components/futured-caregivers";
import { Hero } from "./components/hero";
import { HowItWorksForDonors } from "./components/how-it-works";
import { HowItWorksForCaregivers } from "./components/how-it-works-caregivers";
import { Impact } from "./components/impact";
import { Transparency } from "./components/transparency";

export default async function LandingPage() {
  const data = await getLandingPageData();

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorksForDonors />
        <HowItWorksForCaregivers />
        <FeaturedCaregivers caregivers={data.caregivers} />
        <Impact metrics={data.impact} />
        <Transparency />
        <About />
        <DualCTA />
      </main>
      <Footer />
    </div>
  );
}
