import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

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

export default function ContactSection() {
  const { t } = useLang();

  const contactItems = [
    {
      icon: MapPin,
      label: t.contact.address,
      value: "AHA Jasná, Demänovská cesta 516/41\n03101 Liptovský Mikuláš",
      href: "https://maps.google.com/?q=49.056651,19.582057",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+421 905 474 595",
      href: "tel:+421905474595",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "info@ahajasna.sk",
      href: "mailto:info@ahajasna.sk",
    },
    {
      icon: Navigation,
      label: t.contact.gps,
      value: "49.056651°N, 19.582057°E",
      href: "https://maps.google.com/?q=49.056651,19.582057",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <AnimatedDiv className="text-center mb-16">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            {t.contact.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.contact.desc}
          </p>
        </AnimatedDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <AnimatedDiv delay={100}>
            <div className="space-y-5">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-5 bg-white rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
                  data-testid={`contact-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <item.icon size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-gray-800 font-medium whitespace-pre-line leading-relaxed">{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Book CTA */}
              <div className="bg-[#1C3229] rounded-2xl p-6 text-center">
                <p className="text-white/80 text-sm mb-4">
                  {t.contact.quickContact}
                </p>
                <a
                  href="https://aha.ellipsecloud.com/booking/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-xl tracking-wide transition-all hover:shadow-xl"
                  data-testid="contact-book-btn"
                >
                  {t.nav.book}
                </a>
              </div>
            </div>
          </AnimatedDiv>

          {/* Map */}
          <AnimatedDiv delay={200}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-96 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.6540584636837!2d19.57985!3d49.05665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDAzJzM5LjkiTiAxOcKwMzQnNTUuNCJF!5e0!3m2!1ssk!2ssk!4v1709123456789!5m2!1ssk!2ssk"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AHA Jasná Location"
                data-testid="contact-map"
              />
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
