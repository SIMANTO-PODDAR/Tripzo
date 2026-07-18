import React from "react";
import { Card, CardHeader, Button } from "@heroui/react";
import {
    Users,
    BookOpen,
    ShieldCheck,
    Heart,
    Lightbulb,
    Compass,
    Music,
    AtSign,
    MessageSquare,
    Phone,
    Send,
    BookOpen as BookIcon,
    Mail,
    MapPin,
    Share2,
} from "lucide-react";
import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";
import { FaInternetExplorer } from "react-icons/fa6";
import ExploreDestinationsBtn from "@/components/share/ExploreDestinationsBtn";
import ShareExperienceBtn from "@/components/share/ShareExperienceBtn";

// ---------- Data ----------
const features = [
    {
        icon: BookOpen,
        title: "Real Travel Stories",
        description:
            "Read authentic, unfiltered travel experiences shared by real explorers from around the world.",
    },
    {
        icon: Share2,
        title: "Share Your Journey",
        description:
            "Turn your trip into a beautiful story with our AI-powered editor and inspire thousands.",
    },
    {
        icon: Users,
        title: "Connect with Travelers",
        description:
            "Meet like-minded adventurers, exchange tips, and build lasting friendships across borders.",
    },
    {
        icon: Lightbulb,
        title: "AI Powered Tools",
        description:
            "Smart itinerary planner, language helper, and packing assistant — all built right in.",
    },
];

const socialPlatforms = [
    { name: "Instagram", icon: BsInstagram, url: "https://instagram.com/tripzo" },
    { name: "Facebook", icon: FaFacebook, url: "https://facebook.com/tripzo" },
    { name: "Twitter", icon: BsTwitterX, url: "https://x.com/tripzo" },
    { name: "YouTube", icon: BsYoutube, url: "https://youtube.com/@tripzo" },
    { name: "LinkedIn", icon: LiaLinkedinIn, url: "https://linkedin.com/company/tripzo" },
    { name: "TikTok", icon: Music, url: "https://tiktok.com/@tripzo" },
    { name: "Threads", icon: AtSign, url: "https://threads.net/@tripzo" },
    { name: "Reddit", icon: MessageSquare, url: "https://reddit.com/r/tripzo" },
    { name: "WhatsApp", icon: Phone, url: "https://wa.me/8801234567890" },
    { name: "Telegram", icon: Send, url: "https://t.me/tripzo" },
    { name: "Medium", icon: BookIcon, url: "https://medium.com/@tripzo" },
    { name: "Website", icon: FaInternetExplorer, url: "https://tripzo.com" },
];

const contactDetails = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@tripzo.com",
        href: "mailto:hello@tripzo.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880 1234-567890",
        href: "tel:+8801234567890",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Dhaka, Bangladesh",
    },
];


const values = [
    {
        icon: ShieldCheck,
        title: "Authentic Experiences",
        description: "We champion genuine, unfiltered stories from real people — no filters, no fakery.",
    },
    {
        icon: Heart,
        title: "Respect Everyone",
        description: "Every traveler’s voice matters. We foster a kind, inclusive, and supportive space.",
    },
    {
        icon: Lightbulb,
        title: "Inspire Others",
        description: "Your adventures can spark someone else’s next journey. Share boldly, inspire freely.",
    },
    {
        icon: Compass,
        title: "Explore Together",
        description: "Travel is better when shared. Discover new perspectives and lifelong friends.",
    },
];

// ---------- Component ----------
export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800">
            {/* ---- Hero Section ---- */}
            <section className="relative bg-linear-to-br from-[#0F566C]/5 to-white py-20 md:py-28">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#0F566C] sm:text-5xl md:text-6xl">
                        Join the Tripzo Community
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
                        Connect with passionate travelers, share your real experiences, and discover the world
                        through stories that inspire.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        
                        <ExploreDestinationsBtn />
                        
                        <div className="bg-[#0F566C]  rounded-2xl">
                            <ShareExperienceBtn />
                        </div>

                    </div>
                </div>
            </section>

            {/* ---- About Tripzo ---- */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-[#0F566C] sm:text-4xl">About Tripzo</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Tripzo is a travel storytelling platform where people share authentic travel stories,
                            discover new destinations, and inspire others. We believe everyone has a story worth
                            telling — and we give you the tools to tell it beautifully.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <Card
                                key={feature.title}
                                className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
                            >
                                <CardHeader className="flex items-center gap-4 px-6 pt-6 pb-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E88429]/10">
                                        <feature.icon className="h-6 w-6 text-[#E88429]" />
                                    </div>
                                </CardHeader>
                                <div className="px-6 pb-6">
                                    <h3 className="text-lg font-semibold text-[#0F566C]">{feature.title}</h3>
                                    <p className="mt-2 text-gray-600">{feature.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- Connect With Us ---- */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-3xl font-bold text-[#0F566C] sm:text-4xl">
                        Connect With Us
                    </h2>
                    <p className="mt-4 text-center text-gray-600">
                        Follow us on your favourite platforms for travel inspiration, tips, and behind-the-scenes.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {socialPlatforms.map((platform) => (
                            <a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F566C]/10 group-hover:bg-[#0F566C] transition-colors">
                                    <platform.icon className="h-6 w-6 text-[#0F566C] group-hover:text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- Contact Information ---- */}
            <section className="py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Card className="rounded-2xl border border-gray-100 bg-white shadow-md">
                        <CardHeader className="px-8 pt-8 pb-0">
                            <h2 className="text-2xl font-bold text-[#0F566C]">Contact Information</h2>
                        </CardHeader>
                        <div className="divide-y divide-gray-100 px-8 pb-8">
                            {contactDetails.map((detail) => (
                                <div key={detail.label} className="flex items-center gap-4 py-4 first:pt-2 last:pb-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E88429]/10">
                                        <detail.icon className="h-5 w-5 text-[#E88429]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                                        {detail.href ? (
                                            <a
                                                href={detail.href}
                                                className="text-lg font-semibold text-[#0F566C] hover:underline"
                                            >
                                                {detail.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg font-semibold text-gray-800">{detail.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            {/* ---- Community Values ---- */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-3xl font-bold text-[#0F566C] sm:text-4xl">
                        Community Values
                    </h2>
                    <p className="mt-4 text-center text-gray-600">
                        The principles that make our community a welcoming home for every traveller.
                    </p>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <Card
                                key={value.title}
                                className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                <CardHeader className="flex items-center gap-4 px-6 pt-6 pb-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E88429]/10">
                                        <value.icon className="h-6 w-6 text-[#E88429]" />
                                    </div>
                                </CardHeader>
                                <div className="px-6 pb-6">
                                    <h3 className="text-lg font-semibold text-[#0F566C]">{value.title}</h3>
                                    <p className="mt-2 text-gray-600">{value.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}