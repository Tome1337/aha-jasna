import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { ChevronDown, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const HERO_IMAGES = [
  "/images/gallery/1.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/26.jpg",
  "/images/gallery/33.jpg",
  "/images/gallery/9.jpg",
];

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export default function HeroSection({ heroRef }: HeroSectionProps) {
  const { t } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = () => {
    const base = "https://aha.ellipsecloud.com/booking/";
    const params = new URLSearchParams();
    if (arrival) params.set("arrival", format(arrival, "yyyy-MM-dd"));
    if (departure) params.set("departure", format(departure, "yyyy-MM-dd"));
    params.set("guests", String(guests));
    window.open(`${base}?${params.toString()}`, "_blank");
  };

  const scrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slideshow */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        {/* Text */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-amber-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Nízke Tatry · Jasná · Liptov
          </p>
          <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 drop-shadow-lg">
            {t.hero.headline}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-wide">
            {t.hero.subheadline}
          </p>
        </div>

        {/* Booking Widget */}
        <div className="glass rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-2xl" data-testid="hero-booking-widget">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {/* Arrival */}
            <div className="relative">
              <button
                onClick={() => { setShowArrivalPicker(!showArrivalPicker); setShowDeparturePicker(false); setShowGuestPicker(false); }}
                className="w-full flex items-center gap-2 bg-white/90 hover:bg-white rounded-xl px-4 py-3 text-left transition-all"
                data-testid="booking-arrival-btn"
              >
                <Calendar size={16} className="text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.hero.arrival}</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {arrival ? format(arrival, "dd.MM.yyyy") : t.hero.selectDate}
                  </div>
                </div>
              </button>
              {showArrivalPicker && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl p-2 border border-gray-100">
                  <DayPicker
                    mode="single"
                    selected={arrival}
                    onSelect={(d) => { setArrival(d); setShowArrivalPicker(false); }}
                    disabled={{ before: new Date() }}
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            {/* Departure */}
            <div className="relative">
              <button
                onClick={() => { setShowDeparturePicker(!showDeparturePicker); setShowArrivalPicker(false); setShowGuestPicker(false); }}
                className="w-full flex items-center gap-2 bg-white/90 hover:bg-white rounded-xl px-4 py-3 text-left transition-all"
                data-testid="booking-departure-btn"
              >
                <Calendar size={16} className="text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.hero.departure}</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {departure ? format(departure, "dd.MM.yyyy") : t.hero.selectDate}
                  </div>
                </div>
              </button>
              {showDeparturePicker && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl p-2 border border-gray-100">
                  <DayPicker
                    mode="single"
                    selected={departure}
                    onSelect={(d) => { setDeparture(d); setShowDeparturePicker(false); }}
                    disabled={{ before: arrival || new Date() }}
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="relative">
              <button
                onClick={() => { setShowGuestPicker(!showGuestPicker); setShowArrivalPicker(false); setShowDeparturePicker(false); }}
                className="w-full flex items-center gap-2 bg-white/90 hover:bg-white rounded-xl px-4 py-3 text-left transition-all"
                data-testid="booking-guests-btn"
              >
                <Users size={16} className="text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.hero.guests}</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {t.booking.guestsCount(guests)}
                  </div>
                </div>
              </button>
              {showGuestPicker && (
                <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 min-w-[180px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-700">{t.hero.guests}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >-</button>
                      <span className="w-6 text-center font-bold text-gray-800">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            data-testid="booking-check-btn"
          >
            {t.hero.checkAvailability}
          </button>
        </div>

        {/* Scroll down */}
        <button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-amber-400" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
