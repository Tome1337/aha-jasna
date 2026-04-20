import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.accommodation, id: "apartments" },
    { label: t.nav.gallery, id: "gallery" },
    { label: t.nav.activities, id: "activities" },
    { label: t.nav.contact, id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 focus:outline-none"
          data-testid="nav-logo"
        >
          <img
            src="/images/logo_aha_jasna_white.png"
            alt="AHA Jasná"
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-10 brightness-0" : "h-32 md:h-36 brightness-100"
            }`}
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
              data-testid={`nav-link-${link.id}`}
            >
              {link.label}
            </button>
          ))}

          {/* Language switcher */}
          <div className={`flex items-center gap-1 text-sm font-medium ${scrolled ? "text-gray-600" : "text-white/80"}`}>
            <button
              onClick={() => setLang("sk")}
              className={`px-2 py-1 rounded transition-all ${lang === "sk" ? (scrolled ? "text-amber-600 font-semibold" : "text-amber-300 font-semibold") : "hover:opacity-70"}`}
              data-testid="lang-sk"
            >SK</button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded transition-all ${lang === "en" ? (scrolled ? "text-amber-600 font-semibold" : "text-amber-300 font-semibold") : "hover:opacity-70"}`}
              data-testid="lang-en"
            >EN</button>
          </div>

          {/* Book button */}
          <button
            onClick={() => window.open("https://aha.ellipsecloud.com/booking/", "_blank")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-lg"
            data-testid="nav-book-btn"
          >
            {t.nav.book}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <div className={`flex items-center gap-1 text-sm font-medium ${scrolled ? "text-gray-600" : "text-white/80"}`}>
            <button onClick={() => setLang("sk")} className={lang === "sk" ? "font-bold" : ""}>SK</button>
            <span className="opacity-40">|</span>
            <button onClick={() => setLang("en")} className={lang === "en" ? "font-bold" : ""}>EN</button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 ${scrolled ? "text-gray-800" : "text-white"}`}
            data-testid="nav-menu-toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-gray-800 font-medium py-2 border-b border-gray-100 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => window.open("https://aha.ellipsecloud.com/booking/", "_blank")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded font-semibold text-center transition-all"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
