import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "/images/gallery/1-small.jpg", full: "/images/gallery/1.jpg" },
  { src: "/images/gallery/4-small.jpg", full: "/images/gallery/4.jpg" },
  { src: "/images/gallery/5-small.jpg", full: "/images/gallery/5.jpg" },
  { src: "/images/gallery/7-small.jpg", full: "/images/gallery/7.jpg" },
  { src: "/images/gallery/9-small.jpg", full: "/images/gallery/9.jpg" },
  { src: "/images/gallery/10-small.jpg", full: "/images/gallery/10.jpg" },
  { src: "/images/gallery/14-small.jpg", full: "/images/gallery/14.jpg" },
  { src: "/images/gallery/19-small.jpg", full: "/images/gallery/19.jpg" },
  { src: "/images/gallery/22-small.jpg", full: "/images/gallery/22.jpg" },
  { src: "/images/gallery/26-small.jpg", full: "/images/gallery/26.jpg" },
  { src: "/images/gallery/28-small.jpg", full: "/images/gallery/28.jpg" },
  { src: "/images/gallery/33-small.jpg", full: "/images/gallery/33.jpg" },
  { src: "/images/gallery/37-small.jpg", full: "/images/gallery/37.jpg" },
  { src: "/images/gallery/40-small.jpg", full: "/images/gallery/40.jpg" },
  { src: "/images/gallery/41-small.jpg", full: "/images/gallery/41.jpg" },
  { src: "/images/gallery/44-small.jpg", full: "/images/gallery/44.jpg" },
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

export default function GallerySection() {
  const { t } = useLang();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 12);

  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx((i) => i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null);
  const nextImg = () => setLightboxIdx((i) => i !== null ? (i + 1) % GALLERY_IMAGES.length : null);

  return (
    <section id="gallery" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedDiv className="text-center mb-16">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t.gallery.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </AnimatedDiv>

        {/* Gallery grid */}
        <div className="gallery-grid">
          {displayed.map((img, i) => (
            <AnimatedDiv key={img.src} delay={i * 40}>
              <button
                onClick={() => setLightboxIdx(i)}
                className="group relative rounded-lg overflow-hidden aspect-square w-full img-hover focus:outline-none"
                data-testid={`gallery-img-${i}`}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </AnimatedDiv>
          ))}
        </div>

        {/* View more */}
        {!showAll && GALLERY_IMAGES.length > 12 && (
          <AnimatedDiv delay={200} className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#1C3229] hover:bg-[#243d30] text-white px-8 py-4 rounded-xl font-semibold tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5"
              data-testid="gallery-view-more"
            >
              {t.gallery.viewMore}
            </button>
          </AnimatedDiv>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          data-testid="lightbox"
        >
          <div className="relative max-w-5xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[lightboxIdx].full}
              alt={`Gallery ${lightboxIdx + 1}`}
              className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = GALLERY_IMAGES[lightboxIdx].src;
              }}
            />
            {/* Counter */}
            <div className="absolute top-6 left-6 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {lightboxIdx + 1} / {GALLERY_IMAGES.length}
            </div>
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              data-testid="lightbox-close"
            >
              <X size={20} />
            </button>
            {/* Prev */}
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={24} />
            </button>
            {/* Next */}
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              data-testid="lightbox-next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
