import { Globe, Album, Compass, Sparkles, Camera } from 'lucide-react';
import ShareExperienceBtn from '@/components/share/ShareExperienceBtn';


interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: 'Preserve Your Memories',
    description:
      'Turn unforgettable trips into lasting stories that you can revisit anytime.',
    icon: Album,
  },
  {
    title: 'Inspire Travelers',
    description:
      'Help others discover amazing destinations through your real experiences.',
    icon: Compass,
  },
  {
    title: 'AI Story Writing',
    description:
      'Generate engaging travel stories instantly with the built-in AI assistant.',
    icon: Sparkles,
  },
  {
    title: 'AI Image Analysis',
    description:
      'Automatically generate captions, scene descriptions, detect objects, and understand the mood of your travel photos.',
    icon: Camera,
  },
];

export default function WhyShareYourJourney() {
  return (
    <section id='Why-Tripzo' className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0F566C]/10 text-[#0F566C] px-5 py-2 rounded-full text-sm font-medium mb-5">
            <Globe className="w-4 h-4" />
            Why Tripzo
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
            Why Share Your Journey?
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            Every journey has a story worth remembering. Share your adventures,
            inspire fellow travelers, and let AI help transform your memories
            into engaging travel experiences.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group h-full border border-gray-200 rounded-2xl p-6 bg-white transition-all duration-300 ease-out hover:border-[#0F566C]/30 hover:-translate-y-1"
            >
              {/* Icon container */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F566C]/10 text-[#0F566C] mb-4 transition-colors duration-300 group-hover:bg-[#0F566C]/20">
                <feature.icon className="w-6 h-6" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-semibold text-[#0F566C] mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <ShareExperienceBtn />
      </div>
    </section>
  );
}