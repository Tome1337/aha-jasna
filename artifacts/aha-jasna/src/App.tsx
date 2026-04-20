import { useRef, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingBar from "@/components/BookingBar";
import AboutSection from "@/components/AboutSection";
import ApartmentsSection from "@/components/ApartmentsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import GallerySection from "@/components/GallerySection";
import BistroBanner from "@/components/BistroBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const META = {
  sk: {
    title: "AHA Jasná — Atraktívne Horské Apartmány | Jasná, Nízke Tatry",
    description: "Luxusné apartmány pri Jasnej v Nízkych Tatrách. Novopostavené štúdiá s terasou, vírivkou, záhradou a bezplatným parkoviskom. Rezervujte so zľavou -10%.",
    ogTitle: "AHA Jasná — Atraktívne Horské Apartmány",
    ogDesc: "Luxusné apartmány pri Jasnej v Nízkych Tatrách. Novopostavené štúdiá s terasou, vírivkou, záhradou a bezplatným parkoviskom.",
  },
  en: {
    title: "AHA Jasná — Attractive Mountain Apartments | Jasná, Low Tatras",
    description: "Luxury apartments near Jasná in the Low Tatras. Newly built studios with terrace, jacuzzi, garden and free parking. Book with -10% discount.",
    ogTitle: "AHA Jasná — Attractive Mountain Apartments",
    ogDesc: "Luxury apartments near Jasná in the Low Tatras. Newly built studios with terrace, jacuzzi, garden and free parking.",
  },
};

function MetaUpdater() {
  const { lang } = useLang();
  useEffect(() => {
    const m = META[lang];
    document.title = m.title;
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", m.description);
    setMeta("og:title", m.ogTitle, true);
    setMeta("og:description", m.ogDesc, true);
    setMeta("og:locale", lang === "sk" ? "sk_SK" : "en_US", true);
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

function MainPage() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen">
      <MetaUpdater />
      <Navbar />
      <main>
        <HeroSection heroRef={heroRef} />
        <AboutSection />
        <ApartmentsSection />
        <AmenitiesSection />
        <ActivitiesSection />
        <GallerySection />
        <BistroBanner />
        <ContactSection />
      </main>
      <Footer />
      <BookingBar heroRef={heroRef} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <MainPage />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
