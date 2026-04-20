import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { Snowflake, Waves, Mountain, Gem, Footprints, Zap, Navigation, Trees } from "lucide-react";

const ICONS = [Snowflake, Waves, Waves, Gem, Navigation, Zap, Footprints, Mountain];
const COLORS = [
  "from-blue-900 to-blue-700",
  "from-cyan-700 to-cyan-500",
  "from-teal-700 to-teal-500",
  "from-stone-700 to-stone-500",
  "from-emerald-900 to-emerald-700",
  "from-orange-700 to-orange-500",
  "from-red-800 to-red-600",
  "from-green-800 to-green-600",
];
const IMAGES = [
  "/images/gallery/6-small.jpg",
  "/images/gallery/41-small.jpg",
  "/images/gallery/42-small.jpg",
  "/images/gallery/43-small.jpg",
  "/images/gallery/44-small.jpg",
  "/images/gallery/45-small.jpg",
  "/images/gallery/5-small.jpg",
  "/images/gallery/7-small.jpg",
];

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

export default function ActivitiesSection() {
  const { t } = useLang();
  const items = t.activities.items;

  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedDiv className="text-center mb-16">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t.activities.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.activities.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.activities.subtitle}
          </p>
        </AnimatedDiv>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <AnimatedDiv key={item.name} delay={i * 60}>
                <div
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 h-full img-hover"
                  data-testid={`activity-${i}`}
                >
                  {/* Background image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={IMAGES[i]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${COLORS[i % COLORS.length]} opacity-70`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={36} className="text-white drop-shadow-lg" />
                    </div>
                    {/* Season badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {item.season}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-gray-900 text-base mb-2 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
