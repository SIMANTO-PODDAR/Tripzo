import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/tripzo.png";
import {
    FaFacebookF,
    FaInstagram,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#e0dedc] border-t border-[#E88429]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link href="/">
                            <Image
                                src={Logo}
                                alt="Tripzo Logo"
                                height={40}
                                priority
                            />
                            <p className="text-[#0F566C] ">Explore • Share • Inspire</p>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#0F566C] ">
                            Discover amazing destinations, share unforgettable travel
                            experiences, and inspire others to explore the world with Tripzo.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-5">
                            Explore
                        </h3>

                        <ul className="space-y-3">
                            {[
                                ["Home", "/"],
                                ["Profile", "/profile"],
                                ["Explore", "/explore"],
                                ["Post Story", "/post-story"],
                                ["Community", "/TODO"],
                                ["Story Generator", "/ai-story-generator"],

                            ].map(([title, href]) => (
                                <li key={title}>
                                    <Link
                                        href={href}
                                        className="text-[#0F566C] hover:text-[#E88429] transition-colors"
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-5">
                            Support
                        </h3>

                        <ul className="space-y-3">
                            {[
                                ["Discover", "/#Discover"],
                                ["Newsletter", "/#Newsletter"],
                                ["Why Tripzo", "/#WhyTripzo"],
                                ["AI Features", "/#AiFeatures"],
                                ["Testimonials", "/#Testimonials"],
                                ["Image Explorer", "/ai-image-explorer"],

                            ].map(([title, href]) => (
                                <li key={title}>
                                    <Link
                                        href={href}
                                        className="text-[#0F566C] hover:text-[#E88429] transition-colors"
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-5">
                            Contact
                        </h3>

                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-[#E88429]" />
                                <a
                                    href="mailto:hello@tripzo.com"
                                    className="text-[#0F566C] hover:text-[#E88429]"
                                >
                                    hello@tripzo.com
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#E88429]" />
                                <a
                                    href="tel:+880123456789"
                                    className="text-[#0F566C] hover:text-[#E88429]"
                                >
                                    +880 1234-567890
                                </a>
                            </li>

                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-[#E88429]" />
                                <span className="text-gray-600">
                                    Dhaka, Bangladesh
                                </span>
                            </li>
                        </ul>

                        <div className="flex gap-3 mt-6">
                            {[
                                {
                                    icon: FaFacebookF,
                                    href: "https://facebook.com",
                                },
                                {
                                    icon: FaInstagram,
                                    href: "https://instagram.com",
                                },
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-[#0F566C]/20 flex items-center justify-center text-[#0F566C] hover:bg-[#0F566C] hover:text-white hover:border-[#0F566C] transition-all duration-300"
                                >
                                    <item.icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        © 2026 Tripzo. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Explore • Share • Inspire
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;