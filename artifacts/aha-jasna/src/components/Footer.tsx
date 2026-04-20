import { useLang } from "@/contexts/LanguageContext";
import { Phone, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.accommodation, id: "apartments" },
    { label: t.nav.gallery, id: "gallery" },
    { label: t.nav.activities, id: "activities" },
    { label: t.nav.contact, id: "contact" },
  ];

  return (
    <footer className="bg-[#111E19] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/images/logo_aha_jasna_white.png"
              alt="AHA Jasná"
              className="h-14 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              {t.footer.tagline}. Nízke Tatry · Jasná · Liptov.
            </p>
            <a
              href="https://aha.ellipsecloud.com/booking/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all hover:shadow-lg"
            >
              {t.nav.book}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white/50 mb-5">
              {t.footer.nav}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white/50 mb-5">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+421905474595"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Phone size={14} className="text-amber-500 shrink-0" />
                  +421 905 474 595
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ahajasna.sk"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Mail size={14} className="text-amber-500 shrink-0" />
                  info@ahajasna.sk
                </a>
              </li>
              <li>
                <p className="text-white/50 text-xs leading-relaxed">
                  Demänovská cesta 516/41<br />
                  03101 Liptovský Mikuláš
                </p>
              </li>
            </ul>

            {/* Partner */}
            <div className="mt-8">
              <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white/50 mb-3">
                {t.footer.partner}
              </h4>
              <a
                href="https://www.ahabistro.sk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                AHA Bistro
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs text-center sm:text-left">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4 text-white/40 text-xs">
              <a href="https://www.ahabistro.sk/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                AHA Bistro
              </a>
              <span>·</span>
              <a href="mailto:info@ahajasna.sk" className="hover:text-white/70 transition-colors">
                info@ahajasna.sk
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
