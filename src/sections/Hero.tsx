import Image from "next/image";
import { Users, MapPin, Star } from "lucide-react";
import heroBg from "../../public/hero-bg.jpg";
import ExploreDestinationsBtn from "@/components/share/ExploreDestinationsBtn";
import ShareExperienceBtn from "@/components/share/ShareExperienceBtn";
import { FaEarthAmericas } from "react-icons/fa6";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image + Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="Travel hero background"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
                {/* Glassmorphism Badge */}
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  <span className="text-[#E88429]"><FaEarthAmericas /></span>  Explore • Share • Inspire
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                    Discover Your Next
                    <br />
                    <span className="text-[#E88429]">Unforgettable Journey</span>
                </h1>

                {/* Description */}
                <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
                    Explore breathtaking destinations, share your travel experiences, and
                    uncover hidden gems from around the world — all in one place.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    <ExploreDestinationsBtn />
                    <ShareExperienceBtn />
                </div>

                {/* Stats Cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white shadow-lg">
                        <Users className="w-7 h-7 text-[#E88429] mb-2" />
                        <span className="text-3xl font-bold">10K+</span>
                        <span className="text-sm text-white/70">Happy Travelers</span>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white shadow-lg">
                        <MapPin className="w-7 h-7 text-[#E88429] mb-2" />
                        <span className="text-3xl font-bold">120+</span>
                        <span className="text-sm text-white/70">Destinations</span>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white shadow-lg">
                        <Star className="w-7 h-7 text-[#E88429] mb-2 fill-current" />
                        <span className="text-3xl font-bold">4.9</span>
                        <span className="text-sm text-white/70">Community Rating</span>
                    </div>
                </div>
            </div>

            {/* White wave divider at bottom */}
            <div className="absolute -bottom-1 -left-5 right-0 z-10 pointer-events-none">
                <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 60L48 51.7C96 43.3 192 26.7 288 23.3C384 20 480 30 576 36.7C672 43.3 768 46.7 864 43.3C960 40 1056 30 1152 25C1248 20 1344 20 1392 20L1440 20V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V60Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}