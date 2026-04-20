import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { ExternalLink, UtensilsCrossed } from "lucide-react";

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

export default function BistroBanner() {
  const { t } = useLang();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedDiv>
          <div className="relative overflow-hidden rounded-3xl bg-[#1C3229] shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400 translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-600 -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-10 md:p-14">
              {/* Icon */}
              <div className="w-20 h-20 bg-amber-600/20 rounded-2xl flex items-center justify-center shrink-0">
                <UtensilsCrossed size={36} className="text-amber-400" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
                  {t.bistro.label}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                  {t.bistro.title}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-xl">
                  {t.bistro.text}
                </p>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <a
                  href="https://www.ahabistro.sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-xl text-base tracking-wide transition-all hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap"
                  data-testid="bistro-link"
                >
                  {t.bistro.button}
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
}
