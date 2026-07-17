import Hero from "@/sections/Hero";
import Newsletter from "@/sections/Newsletter";
import PopularDestinations from "@/sections/PopularDestinations";
import Testimonials from "@/sections/Testimonials";
import WhyShareYourJourney from "@/sections/WhyShareYourJourney";

export default function Home() {
  return (
    <div>

      <Hero />
      <PopularDestinations />
      <WhyShareYourJourney />
      <Testimonials />
      <Newsletter />

    </div>
  );
}
