import React from 'react';
import Marquee from 'react-fast-marquee';
import { Star, Quote, CheckCircle, MapPin, MessageCircle } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    country: string;
    avatar: string;
    rating: number;
    storyTitle: string;
    review: string;
    travelType: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        location: 'Bali, Indonesia',
        country: 'Indonesia',
        avatar: 'https://i.pravatar.cc/150?img=47',
        rating: 5,
        storyTitle: 'A Spiritual Awakening in Ubud',
        review:
            'Tripzo helped me craft the perfect narrative of my solo retreat in Bali. The AI suggestions turned my raw notes into a story that truly captured the essence of my journey.',
        travelType: 'Solo Travel',
    },
    {
        id: 2,
        name: 'James Rodriguez',
        location: 'Patagonia, Chile',
        country: 'Chile',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        storyTitle: 'Trekking Through the Wild South',
        review:
            'Sharing my Patagonia trek on Tripzo inspired three of my friends to book the same route. The platform made it so easy to add photos and organize my experience.',
        travelType: 'Adventure',
    },
    {
        id: 3,
        name: 'Emily Chen',
        location: 'Kyoto, Japan',
        country: 'Japan',
        avatar: 'https://i.pravatar.cc/150?img=23',
        rating: 5,
        storyTitle: 'Cherry Blossoms & Quiet Temples',
        review:
            'The AI image analysis blew my mind—it automatically captioned all my temple photos with historical context. Tripzo turned my trip into a beautiful digital journal.',
        travelType: 'Cultural',
    },
    {
        id: 4,
        name: 'Marcus Taylor',
        location: 'Santorini, Greece',
        country: 'Greece',
        avatar: 'https://i.pravatar.cc/150?img=60',
        rating: 5,
        storyTitle: 'Sunset Chasing in the Cyclades',
        review:
            'I never considered myself a writer, but Tripzo’s AI Story Writing feature created such engaging prose from my captions. Now my family actually wants to read about my trips!',
        travelType: 'Adventure',
    },
    {
        id: 5,
        name: 'Olivia Wright',
        location: 'Banff, Canada',
        country: 'Canada',
        avatar: 'https://i.pravatar.cc/150?img=36',
        rating: 5,
        storyTitle: 'Family Adventures in the Rockies',
        review:
            'Documenting our family road trip felt effortless. The kids love seeing their photos with the funny AI-generated captions. Tripzo preserved our memories perfectly.',
        travelType: 'Family Trip',
    },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="group w-85 sm:w-90 shrink-0 h-full">
        <div className="h-full border border-gray-200 rounded-xl bg-white p-4 flex flex-col transition-all duration-300 ease-out hover:border-[#0F566C]/30 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h4 className="font-semibold text-[#0F566C] text-base leading-tight">
                            {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{testimonial.location}</span>
                        </div>
                    </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0F566C]/10 text-[#0F566C] shrink-0">
                    {testimonial.travelType}
                </span>
            </div>

            <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                        key={i}
                        className="w-4 h-4"
                        style={{ fill: '#E88429', stroke: '#E88429' }}
                        aria-hidden="true"
                    />
                ))}
            </div>

            <h5 className="font-semibold text-[#0F566C] text-lg mb-1">
                {testimonial.storyTitle}
            </h5>

            <p className="text-black leading-relaxed grow text-sm line-clamp-4 sm:line-clamp-none">
                {testimonial.review}
            </p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <Quote className="w-5 h-5 text-[#E88429]" />
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0F566C]">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Verified Traveler
                </span>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section id='Testimonials' className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="mb-10 flex justify-center">
                    <span className="badge badge-outline inline-flex items-center gap-2 rounded-full border-[#0F566C] px-5 py-2 text-sm font-medium text-[#0F566C]">
                        <MessageCircle className="w-4 h-4" />
                        Traveler Voices
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                    What Travelers Are Saying
                </h2>

                <p className="max-w-2xl mx-auto text-black text-lg leading-relaxed text-justify sm:text-center">
                    Discover authentic feedback from travelers who have shared their unforgettable journeys through Tripzo. Their experiences inspire others to explore the world with confidence.
                </p>
            </div>

            <Marquee
                autoFill
                pauseOnHover
                gradient={false}
                speed={40}
                className="py-4"
            >
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-3">
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))}
            </Marquee>
        </section>
    );
}