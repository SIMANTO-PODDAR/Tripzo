import { Mail, Send, Check } from 'lucide-react';

export default function Newsletter() {
    return (
        <section id='Newsletter' className="py-10 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#0F566C]/10 text-[#0F566C] px-5 py-2 rounded-full text-sm font-medium mb-5">
                        <Mail className="w-4 h-4" />
                        Stay Connected
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                        Join Our Travel Newsletter
                    </h2>

                    <p className="max-w-2xl mx-auto text-black text-lg text-justify sm:text-center leading-relaxed">
                        Get the latest travel stories, destination inspiration, AI travel tips, and Tripzo updates delivered straight to your inbox.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="border border-gray-200 rounded-2xl bg-white p-8 md:p-10 transition-all duration-300 ease-out hover:border-[#0F566C]/30 hover:-translate-y-1">
                        <Mail className="w-12 h-12 text-[#E88429] mx-auto mb-4" />

                        <h3 className="text-2xl font-semibold text-[#0F566C] text-center mb-2">
                            Stay Inspired
                        </h3>

                        <p className="text-black text-justify sm:text-center mb-6">
                            Subscribe to receive travel inspiration, featured destinations, community stories, and helpful AI travel updates.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-base placeholder-gray-400 focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-[#E88429] text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#c96b1b] transition-colors shrink-0"
                            >
                                Subscribe
                                <Send className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-3">
                            No spam. Only occasional travel inspiration and product updates.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-black">
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-[#E88429] shrink-0" />
                            <span>Weekly Travel Inspiration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-[#E88429] shrink-0" />
                            <span>AI Travel Tips</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-[#E88429] shrink-0" />
                            <span>Community Stories</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}