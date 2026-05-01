import LandingHeader from "@/components/custom/landing/landing-header";
import LandingHero from "@/components/custom/landing/landing-hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="h-screen flex flex-col">
        <LandingHeader />
        <LandingHero />
      </section>
    </main>
  );
}
