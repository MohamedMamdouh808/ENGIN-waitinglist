import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DeveloperSection } from "@/components/DeveloperSection";
import { LiveCounter } from "@/components/LiveCounter";
import { WalkthroughContainer } from "@/components/Walkthrough/WalkthroughContainer";
import { SignupSection } from "@/components/SignupSection";
import { Leaderboard } from "@/components/Leaderboard";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home({
  searchParams,
}: {
  searchParams?: { ref?: string; utm_source?: string };
}) {
  // ?ref=CODE / ?utm_source=… are read server-side so static sections
  // (Hero, FAQ, …) can stay server-rendered for SEO. The interactive
  // signup island (localStorage returning-user check) lives in
  // SignupSection and receives these as initial props.
  const rawRef = typeof searchParams?.ref === "string" ? searchParams.ref : "";
  const refCode = rawRef ? rawRef.toUpperCase().slice(0, 10) : null;
  const rawUtm = typeof searchParams?.utm_source === "string" ? searchParams.utm_source : "";
  const utmSource = rawUtm ? rawUtm.slice(0, 64) : null;

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <DeveloperSection />
        <LiveCounter />

        <section id="how-it-works" className="border-b border-line py-16 sm:py-24">
          <div className="container-engin max-w-3xl">
            <div className="mb-12 text-center sm:mb-16">
              <p className="font-mono text-xs text-accent-soft">how_engin_works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                See what happens between your idea and the software.
              </h2>
              <p className="mt-3 text-muted">No jargon. Just 6 simple steps.</p>
            </div>
            <WalkthroughContainer />
          </div>
        </section>

        <SignupSection initialRefCode={refCode} initialUtmSource={utmSource} />

        <Leaderboard />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
