import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { Wifi, ParkingCircle, Waves, Flame, TreePine, Armchair, CookingPot, Tv, KeyRound, Droplets, Leaf, Mountain } from "lucide-react";

const ICONS = [Wifi, ParkingCircle, Waves, Flame, TreePine, Armchair, CookingPot, Tv, KeyRound, Droplets, Leaf, Mountain];

function AnimatedDiv({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AmenitiesSection() {
  const { t } = useLang();
  const items = t.amenities.items;

  return (
    <section id="amenities" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedDiv className="text-center mb-16">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t.amenities.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.amenities.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.amenities.subtitle}
          </p>
        </AnimatedDiv>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <AnimatedDiv key={item.title} delay={i * 50}>
                <div className="group bg-white hover:bg-[#1C3229] rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default" data-testid={`amenity-${i}`}>
                  <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon size={22} className="text-amber-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-white text-sm mb-1 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-white/60 text-xs leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
