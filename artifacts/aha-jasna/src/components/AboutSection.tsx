import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { Waves, ParkingCircle, Trees } from "lucide-react";

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

export default function AboutSection() {
  const { t } = useLang();

  const features = [
    { icon: Waves, title: t.about.feature1Title, desc: t.about.feature1Desc },
    { icon: ParkingCircle, title: t.about.feature2Title, desc: t.about.feature2Desc },
    { icon: Trees, title: t.about.feature3Title, desc: t.about.feature3Desc },
  ];

  return (
    <section id="about" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <AnimatedDiv>
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                {t.about.sectionLabel}
              </span>
            </AnimatedDiv>
            <AnimatedDiv delay={100}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {t.about.title}
              </h2>
            </AnimatedDiv>
            <AnimatedDiv delay={200}>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t.about.text}
              </p>
            </AnimatedDiv>
            <AnimatedDiv delay={300}>
              <button
                onClick={() => document.getElementById("apartments")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-[#1C3229] hover:bg-[#243d30] text-white px-8 py-4 rounded-lg font-semibold tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {t.about.readMore}
              </button>
            </AnimatedDiv>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((f, i) => (
              <AnimatedDiv key={f.title} delay={i * 120}>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <f.icon size={22} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-gray-900 text-lg mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <AnimatedDiv delay={400} className="mt-16">
          <div className="bg-[#1C3229] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "9", label: "Apartmánov" },
              { number: "4+", label: "Roky skúseností" },
              { number: "4★", label: "Hodnotenie hostí" },
              { number: "2min", label: "Od lanoviek" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-bold text-amber-400 mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
}
