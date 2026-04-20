import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
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

function MainPage() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen">
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
