"use client";

import Image, { StaticImageData } from "next/image";
import Bali from "../../public/Indonesia.jpg";
import Santorini from "../../public/Santorini.jpg";
import SwissAlps from "../../public/Swiss-Alps.jpg";
import { MapPin, Star, Calendar, ArrowRight, Compass, BookOpen } from "lucide-react";
import Link from "next/link";

// Types
interface Destination {
    id: string;
    name: string;
    country: string;
    description: string;
    rating: number;
    stories: number;
    bestSeason: string;
    image: StaticImageData;
    badges: string[];
}


// Destinations Data 
const destinations: Destination[] = [
    {
        id: "bali",
        name: "Bali",
        country: "Indonesia",
        description:
            "Tropical paradise known for its lush rice terraces, ancient temples, and vibrant surf culture.",
        rating: 4.8,
        stories: 320,
        bestSeason: "April – October",
        image: Bali,
        badges: ["Beach", "Nature", "Must Visit"],
    },
    {
        id: "santorini",
        name: "Santorini",
        country: "Greece",
        description:
            "Iconic whitewashed villages perched on volcanic cliffs overlooking the endless Aegean blue.",
        rating: 4.9,
        stories: 275,
        bestSeason: "June – September",
        image: Santorini,
        badges: ["Must Visit", "Romantic", "Hidden Gem"],
    },
    {
        id: "swiss-alps",
        name: "Swiss Alps",
        country: "Switzerland",
        description:
            "Snow‑capped peaks, crystal‑clear lakes, and world‑class hiking for mountain lovers.",
        rating: 4.7,
        stories: 198,
        bestSeason: "December – March",
        image: SwissAlps,
        badges: ["Mountain", "Adventure", "Nature"],
    },
];


export default function PopularDestinations() {
    return (
        <section className="w-full py-10 md:py-20 bg-[#f2f7f8] mt-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#0F566C]/10 text-[#0F566C] px-5 py-2 rounded-full text-sm font-medium mb-5">
                        <Compass className="w-4 h-4" />
                        Explore
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                        Popular Destinations
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Discover the places travelers love the most. Explore inspiring destinations, read authentic travel experiences, and start planning your next unforgettable adventure.
                    </p>
                </div>

                {/* Destination Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination) => (
                        <article
                            key={destination.id}
                            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 border border-gray-100"
                        >
                            {/* Destination Image */}
                            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={destination.image}
                                    alt={`${destination.name}, ${destination.country}`}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-col grow p-5">
                                {/* Name & Country */}
                                <div className="mb-2">
                                    <h3 className="text-2xl font-bold text-[#0F566C] mb-0.5">
                                        {destination.name}
                                    </h3>
                                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 text-[#E88429]" />
                                        {destination.country}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {destination.description}
                                </p>

                                {/* Travel Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {destination.badges.map((badge) => (
                                        <span
                                            key={badge}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0F566C]/10 text-[#0F566C] border border-[#0F566C]/20"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4 mt-auto mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="font-medium text-gray-800">{destination.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-[#0F566C]" />
                                        <span className="font-medium text-gray-800">{destination.stories} Stories</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-[#E88429]" />
                                        <span className="font-medium text-gray-800">{destination.bestSeason}</span>
                                    </div>
                                </div>

                                {/* Explore Button */}
                                <Link href='/todo'>
                                    <button className="w-full flex items-center justify-center gap-2 bg-[#E88429] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-sm">
                                        Explore Stories
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}