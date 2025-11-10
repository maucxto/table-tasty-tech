import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
      </main>
    </div>
  );
};

export default Landing;
