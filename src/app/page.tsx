import Hero from "@/sections/Hero";
import AiFeatures from "@/sections/AiFeatures";
import Newsletter from "@/sections/Newsletter";
import Testimonials from "@/sections/Testimonials";
import PopularDestinations from "@/sections/PopularDestinations";
import WhyShareYourJourney from "@/sections/WhyShareYourJourney";

export default function Home() {
  return (
    <div>

      <Hero />
      <PopularDestinations />
      <AiFeatures />
      <WhyShareYourJourney />
      <Testimonials />
      <Newsletter />

    </div>
  );
}
