import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang, translations, type Lang } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Users, Maximize2 } from "lucide-react";

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

export default function ApartmentsSection() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const types = t.apartments.types;

  const prev = () => setActiveIndex((i) => (i - 1 + types.length) % types.length);
  const next = () => setActiveIndex((i) => (i + 1) % types.length);

  const apt = types[activeIndex];
  const skApt = translations.sk.apartments.types[activeIndex];
  const enApt = translations.en.apartments.types[activeIndex];
  const description = lang === "sk" ? skApt.descSk : enApt.descEn;

  return (
    <section id="apartments" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedDiv className="text-center mb-16">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t.apartments.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.apartments.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.apartments.subtitle}
          </p>
        </AnimatedDiv>

        {/* Type selector tabs */}
        <AnimatedDiv delay={100} className="flex gap-2 flex-wrap justify-center mb-12">
          {types.map((type, i) => (
            <button
              key={type.id}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                i === activeIndex
                  ? "bg-[#1C3229] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-testid={`apartment-tab-${type.id}`}
            >
              {type.count} {type.name}
            </button>
          ))}
        </AnimatedDiv>

        {/* Main card */}
        <AnimatedDiv delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100">
            {/* Image */}
            <div className="relative h-72 lg:h-auto min-h-[400px] img-hover group">
              <img
                src={apt.image}
                alt={apt.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = apt.imageSmall;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Navigation arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                  data-testid="apt-prev"
                >
                  <ChevronLeft size={20} className="text-gray-800" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                  data-testid="apt-next"
                >
                  <ChevronRight size={20} className="text-gray-800" />
                </button>
              </div>

              {/* Count badge */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {apt.count}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {apt.name}
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Maximize2 size={14} className="text-amber-600" />
                    {apt.size}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Users size={14} className="text-amber-600" />
                    {t.booking.guestsCount(apt.capacity)}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  {description}
                </p>
              </div>

              {/* Amenities quick list */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Wi-Fi", "LCD TV", "Kuchynka", "Parkovisko"].map((item) => (
                  <span key={item} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-medium">
                    {item}
                  </span>
                ))}
              </div>

              {/* Book button */}
              <a
                href={`https://aha.ellipsecloud.com/booking/?apartment=${apt.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-xl text-base tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5 text-center"
                data-testid={`apt-book-${apt.id}`}
              >
                {t.apartments.book}
              </a>

              {/* Navigation dots */}
              <div className="flex items-center gap-2 mt-6">
                {types.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-amber-600" : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedDiv>

        {/* Thumbnail grid */}
        <AnimatedDiv delay={300} className="mt-8 grid grid-cols-5 gap-3">
          {types.map((type, i) => (
            <button
              key={type.id}
              onClick={() => setActiveIndex(i)}
              className={`relative rounded-xl overflow-hidden aspect-video img-hover ${
                i === activeIndex ? "ring-2 ring-amber-600 ring-offset-2" : "opacity-70 hover:opacity-100"
              } transition-all`}
            >
              <img
                src={type.imageSmall}
                alt={type.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 p-1">
                <p className="text-white text-xs font-semibold truncate px-1">{type.name}</p>
              </div>
            </button>
          ))}
        </AnimatedDiv>
      </div>
    </section>
  );
}
