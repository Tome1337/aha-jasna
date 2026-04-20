import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface BookingBarProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export default function BookingBar({ heroRef }: BookingBarProps) {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [showArrival, setShowArrival] = useState(false);
  const [showDeparture, setShowDeparture] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

  const handleBook = () => {
    const base = "https://aha.ellipsecloud.com/booking/";
    const params = new URLSearchParams();
    if (arrival) params.set("arrival", format(arrival, "yyyy-MM-dd"));
    if (departure) params.set("departure", format(departure, "yyyy-MM-dd"));
    params.set("guests", String(guests));
    window.open(`${base}?${params.toString()}`, "_blank");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      data-testid="booking-bar"
    >
      <div className="bg-[#1C3229] shadow-2xl border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Arrival */}
            <div className="relative flex-1 min-w-[130px]">
              <button
                onClick={() => { setShowArrival(!showArrival); setShowDeparture(false); setShowGuests(false); }}
                className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-left text-white transition-all"
                data-testid="bar-arrival-btn"
              >
                <Calendar size={14} className="text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">{t.hero.arrival}</div>
                  <div className="text-sm font-semibold">
                    {arrival ? format(arrival, "dd.MM.yyyy") : t.hero.selectDate}
                  </div>
                </div>
              </button>
              {showArrival && (
                <div className="absolute bottom-full mb-2 left-0 z-50 bg-white rounded-xl shadow-2xl p-2 border border-gray-100">
                  <DayPicker
                    mode="single"
                    selected={arrival}
                    onSelect={(d) => { setArrival(d); setShowArrival(false); }}
                    disabled={{ before: new Date() }}
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            {/* Departure */}
            <div className="relative flex-1 min-w-[130px]">
              <button
                onClick={() => { setShowDeparture(!showDeparture); setShowArrival(false); setShowGuests(false); }}
                className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-left text-white transition-all"
                data-testid="bar-departure-btn"
              >
                <Calendar size={14} className="text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">{t.hero.departure}</div>
                  <div className="text-sm font-semibold">
                    {departure ? format(departure, "dd.MM.yyyy") : t.hero.selectDate}
                  </div>
                </div>
              </button>
              {showDeparture && (
                <div className="absolute bottom-full mb-2 left-0 z-50 bg-white rounded-xl shadow-2xl p-2 border border-gray-100">
                  <DayPicker
                    mode="single"
                    selected={departure}
                    onSelect={(d) => { setDeparture(d); setShowDeparture(false); }}
                    disabled={{ before: arrival || new Date() }}
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            {/* Guests */}
            <div className="relative min-w-[120px]">
              <button
                onClick={() => { setShowGuests(!showGuests); setShowArrival(false); setShowDeparture(false); }}
                className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-left text-white transition-all"
                data-testid="bar-guests-btn"
              >
                <Users size={14} className="text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">{t.hero.guests}</div>
                  <div className="text-sm font-semibold">{t.booking.guestsCount(guests)}</div>
                </div>
              </button>
              {showGuests && (
                <div className="absolute bottom-full mb-2 right-0 z-50 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 min-w-[160px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-700">{t.hero.guests}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700">-</button>
                      <span className="w-6 text-center font-bold text-gray-800">{guests}</span>
                      <button onClick={() => setGuests(Math.min(10, guests + 1))} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700">+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleBook}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all whitespace-nowrap hover:shadow-lg"
              data-testid="bar-book-btn"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
