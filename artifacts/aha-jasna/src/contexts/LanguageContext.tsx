import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "sk" | "en";

export const translations = {
  sk: {
    nav: {
      home: "Domov",
      accommodation: "Ubytovanie",
      gallery: "Galéria",
      activities: "Aktivity",
      contact: "Kontakt",
      book: "Rezervovať",
    },
    hero: {
      headline: "Atraktívne Horské Apartmány",
      subheadline: "Nízke Tatry · Jasná · Liptov",
      arrival: "Príchod",
      departure: "Odchod",
      guests: "Počet hostí",
      checkAvailability: "Overiť dostupnosť",
      selectDate: "Vybrať dátum",
    },
    about: {
      sectionLabel: "O nás",
      title: "Doprajte si luxus za ceny, ktoré si môžete dovoliť",
      text: "Využite jedinečnú príležitosť prežiť nezabudnuteľnú dovolenku na Liptove v novučičkých apartmánoch s veľkou záhradou, detským ihriskom, grilom a vonkajšou vírivkou. Novopostavené prázdninové byty pod severnými svahmi Chopku — vaša dokonalá horská útočňa.",
      feature1Title: "Záhrada & Vírivka",
      feature1Desc: "Relax v outdoorovej vírivke s výhľadom na hory",
      feature2Title: "Parkovisko zadarmo",
      feature2Desc: "Súkromné parkovisko priamo na mieste",
      feature3Title: "Detské ihrisko",
      feature3Desc: "Radosť pre celú rodinu",
      readMore: "Zistiť viac",
    },
    apartments: {
      sectionLabel: "Ubytovanie",
      title: "Naše Apartmány",
      subtitle: "Päť jedinečných štúdií pre dokonalú horskú dovolenku",
      size: "Veľkosť",
      capacity: "Kapacita",
      book: "Rezervovať so zľavou -10%",
      persons: "osoby",
      person: "osoba",
      terrace: "terasa",
      balcony: "balkón",
      mezzanine: "mezonet",
      room: "izba",
      types: [
        {
          id: "a",
          name: "Štúdio LUX",
          count: "1×",
          size: "29m² + terasa 8m²",
          capacity: 4,
          image: "/images/gallery/19.jpg",
          imageSmall: "/images/gallery/19-small.jpg",
          descSk: "Moderné štúdio plné svetla na prízemí s vlastným vchodom a výhľadom do záhrady. Manželská posteľ alebo 2 oddelené lôžka, rozkladacie dvojlôžko pre 2 deti, LCD TV, plne vybavený kuchynský kút, slnečná terasa s vonkajším nábytkom.",
          descEn: "Modern sunlit studio on the ground floor with private entrance and garden view. Queen bed or 2 separate beds, sofa bed for 2 children, LCD TV, fully equipped kitchenette, sunny terrace with outdoor furniture.",
        },
        {
          id: "b",
          name: "Štúdio NOSTALGIA",
          count: "1×",
          size: "29m² + terasa 8m²",
          capacity: 4,
          image: "/images/gallery/22.jpg",
          imageSmall: "/images/gallery/22-small.jpg",
          descSk: "Prízemné štúdio zariadené originálnym starožitným nábytkom z 30-tych rokov minulého storočia. Manželská posteľ, rozkladacie dvojlôžko pre 2 deti, kúpeľňa s vaňou, slnečná terasa s výhľadom do záhrady.",
          descEn: "Ground floor studio furnished with authentic antique furniture from the 1930s. Double bed, sofa bed for 2 children, bathroom with bathtub, sunny terrace with garden view.",
        },
        {
          id: "c",
          name: "Štúdio MEZONET",
          count: "3×",
          size: "29m² + mezonet 18m² + balkón 8m²",
          capacity: 5,
          image: "/images/gallery/28.jpg",
          imageSmall: "/images/gallery/28-small.jpg",
          descSk: "Moderné mezonetové štúdio na poschodí s výhľadom na hory a záhradu. Na prízemí rohová sedačka (2 oddelené postele alebo manželská), 3 samostatné postele na poschodí, vzdušný balkón.",
          descEn: "Modern mezzanine studio on the upper floor with mountain and garden views. Corner sofa (2 separate beds or double) on ground level, 3 single beds upstairs, airy balcony.",
        },
        {
          id: "d",
          name: "Štúdio DOMESTIC",
          count: "2×",
          size: "24m² + terasa 12m²",
          capacity: 2,
          image: "/images/gallery/37.jpg",
          imageSmall: "/images/gallery/37-small.jpg",
          descSk: "Dizajnové štúdio na prízemí s priamym vstupom do záhrady cez nadštandardne veľkú terasu. Manželská posteľ, priestranná sprcha, umývačka riadu, plne vybavená kuchynka.",
          descEn: "Designer ground floor studio with direct garden access through an oversized terrace. Double bed, spacious shower, dishwasher, fully equipped kitchenette.",
        },
        {
          id: "e",
          name: "Štúdio FLOWERS",
          count: "2×",
          size: "24m² + mezonet 6m² + balkón 12m²",
          capacity: 4,
          image: "/images/gallery/40.jpg",
          imageSmall: "/images/gallery/40-small.jpg",
          descSk: "Útulné dizajnové štúdio na poschodí s komfortným balkónom a výhľadom do záhrady. 1 manželská posteľ (180×200), 1 manželská posteľ v lofte (150×200), vzdušný balkón.",
          descEn: "Cozy designer studio on the upper floor with comfortable balcony and garden views. 1 queen bed (180×200), 1 double bed in loft (150×200), airy balcony.",
        },
      ],
    },
    amenities: {
      sectionLabel: "Vybavenie",
      title: "Čo u nás nájdete",
      subtitle: "Všetko pre pohodlnú a príjemnú dovolenku",
      items: [
        { title: "Wi-Fi zadarmo", desc: "Rýchle bezplatné pripojenie" },
        { title: "Parkovisko zadarmo", desc: "Súkromné parkovisko na mieste" },
        { title: "Vírivka", desc: "Vonkajšia vírivka s výhľadom na hory" },
        { title: "Gril", desc: "Záhradný gril pre grilovacie večery" },
        { title: "Detské ihrisko", desc: "Bezpečné ihrisko pre deti" },
        { title: "Terasa / Balkón", desc: "Súkromná terasa alebo balkón" },
        { title: "Kuchynský kút", desc: "Plne vybavená kuchynka" },
        { title: "Smart TV", desc: "LCD televízor v každej izbe" },
        { title: "Súkromný vchod", desc: "Vlastný vchod do apartmánu" },
        { title: "Kúpeľňa", desc: "Sprcha alebo vaňa, sušič vlasov" },
        { title: "Záhrada", desc: "Veľká spoločná záhrada" },
        { title: "Príroda okolo", desc: "Priamo pri prírode a lesoch" },
      ],
    },
    activities: {
      sectionLabel: "Aktivity",
      title: "Od nás máte všetko na skok",
      subtitle: "Dobrodružstvo, relax aj rodinná zábava — všetko v dosahu",
      items: [
        {
          name: "Chopok / Jasná",
          desc: "Najlepší lyžiarsky rezort na Slovensku. 49 zjazdoviek, moderné lanovky, snowparky. V lete turistika, cyklotrasy a paragliding.",
          season: "Celoročne",
        },
        {
          name: "Aquapark Tatralandia",
          desc: "Európsky unikát — 24 toboganov, subtropický raj, termálne bazény, wellness. Zábava pre celú rodinu bez ohľadu na počasie.",
          season: "Celoročne",
        },
        {
          name: "Aquapark Bešeňová",
          desc: "Termálne kúpaliská s liečivými prameňmi, vonkajšie a vnútorné bazény, tobogany a wellness centrum.",
          season: "Celoročne",
        },
        {
          name: "Demänovská Ľadová Jaskyňa",
          desc: "Jedinečná ľadová jaskyňa v Demänovskej doline s bohatou kryštalickou výzdobou. Zapísaná medzi prírodné pamiatky UNESCO.",
          season: "Celoročne",
        },
        {
          name: "Demänovská Jaskyňa Slobody",
          desc: "Najdlhšia sprístupnená jaskyňa na Slovensku s oslnivými kvapľovými výzdobami v celkovej dĺžke 4 km.",
          season: "Celoročne",
        },
        {
          name: "Bobová Dráha Žiarce",
          desc: "Adrenalínová letná a zimná bobová atrakcia na svahoch Nízkych Tatier. Skvelý zážitok pre deti aj dospelých.",
          season: "Sezónne",
        },
        {
          name: "Rafting na Váhu",
          desc: "Adrenalínový rafting na rieke Váh v Liptovskom Mikuláši. Ideálne pre skupiny a rodiny hľadajúce vzrušenie.",
          season: "Leto",
        },
        {
          name: "Turistika v Tatrách",
          desc: "Ďumbier, Chopok, Kvačianska dolina, Prosiecka dolina, Žiarska dolina — stovky kilometrov turistických chodníkov všetkých obtiažností.",
          season: "Celoročne",
        },
      ],
    },
    gallery: {
      sectionLabel: "Galéria",
      title: "Pohľad do apartmánov",
      subtitle: "Nechajte sa inšpirovať",
      viewMore: "Zobraziť viac fotografií",
      close: "Zavrieť",
    },
    bistro: {
      label: "Náš partner",
      title: "Navštívte tiež AHA Bistro",
      text: "Náš partnerský podnik v srdci Liptovského Mikuláša ponúka výnimočné gastronomické zážitky v príjemnej atmosfére. Skvelé jedlo, priateľská obsluha, výhľad na mesto.",
      button: "Navštíviť AHA Bistro",
    },
    contact: {
      sectionLabel: "Kontakt",
      title: "Nájdete nás tu",
      address: "Adresa",
      phone: "Telefón",
      email: "Email",
      gps: "GPS súradnice",
      writeUs: "Napíšte nám",
      quickContact: "Rýchly kontakt",
      desc: "V prípade akýchkoľvek otázok alebo pripomienok nás neváhajte kontaktovať. Sme tu pre vás.",
    },
    footer: {
      tagline: "Atraktívne Horské Apartmány",
      copyright: "© 2025 AHA Jasná · Atraktívne Horské Apartmány · Jasná, Nízke Tatry",
      nav: "Navigácia",
      contact: "Kontakt",
      partner: "Náš partner",
    },
    stats: [
      { number: "9", label: "Apartmánov" },
      { number: "4+", label: "Roky skúseností" },
      { number: "4★", label: "Hodnotenie hostí" },
      { number: "2min", label: "Od lanoviek" },
    ],
    aptChips: ["Wi-Fi", "LCD TV", "Kuchynka", "Parkovisko"],
    booking: {
      guest1: "1 hosť",
      guests: "hostia",
      guestsCount: (n: number) => n === 1 ? "1 hosť" : `${n} hostia`,
    },
  },
  en: {
    nav: {
      home: "Home",
      accommodation: "Accommodation",
      gallery: "Gallery",
      activities: "Activities",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      headline: "Attractive Mountain Apartments",
      subheadline: "Low Tatras · Jasná · Liptov",
      arrival: "Check-in",
      departure: "Check-out",
      guests: "Guests",
      checkAvailability: "Check Availability",
      selectDate: "Select date",
    },
    about: {
      sectionLabel: "About us",
      title: "Luxury at prices you can actually afford",
      text: "Experience an unforgettable holiday in the Low Tatras in brand new apartments with a large garden, children's playground, BBQ grill, and outdoor jacuzzi. Newly built holiday apartments under the northern slopes of Chopok mountain — your perfect mountain retreat.",
      feature1Title: "Garden & Jacuzzi",
      feature1Desc: "Relax in the outdoor jacuzzi with mountain views",
      feature2Title: "Free Parking",
      feature2Desc: "Private parking right on site",
      feature3Title: "Playground",
      feature3Desc: "Fun for the whole family",
      readMore: "Learn more",
    },
    apartments: {
      sectionLabel: "Accommodation",
      title: "Our Apartments",
      subtitle: "Five unique studios for the perfect mountain holiday",
      size: "Size",
      capacity: "Capacity",
      book: "Book with -10% discount",
      persons: "persons",
      person: "person",
      terrace: "terrace",
      balcony: "balcony",
      mezzanine: "mezzanine",
      room: "room",
      types: [
        {
          id: "a",
          name: "Studio LUX",
          count: "1×",
          size: "29m² + terrace 8m²",
          capacity: 4,
          image: "/images/gallery/19.jpg",
          imageSmall: "/images/gallery/19-small.jpg",
          descSk: "",
          descEn: "Modern sunlit studio on the ground floor with private entrance and garden view. Queen bed or 2 separate beds, sofa bed for 2 children, LCD TV, fully equipped kitchenette, sunny terrace with outdoor furniture.",
        },
        {
          id: "b",
          name: "Studio NOSTALGIA",
          count: "1×",
          size: "29m² + terrace 8m²",
          capacity: 4,
          image: "/images/gallery/22.jpg",
          imageSmall: "/images/gallery/22-small.jpg",
          descSk: "",
          descEn: "Ground floor studio furnished with authentic antique furniture from the 1930s. Double bed, sofa bed for 2 children, bathroom with bathtub, sunny terrace with garden view.",
        },
        {
          id: "c",
          name: "Studio MEZZANINE",
          count: "3×",
          size: "29m² + mezzanine 18m² + balcony 8m²",
          capacity: 5,
          image: "/images/gallery/28.jpg",
          imageSmall: "/images/gallery/28-small.jpg",
          descSk: "",
          descEn: "Modern mezzanine studio on the upper floor with mountain and garden views. Corner sofa (2 separate beds or double) on ground level, 3 single beds upstairs, airy balcony.",
        },
        {
          id: "d",
          name: "Studio DOMESTIC",
          count: "2×",
          size: "24m² + terrace 12m²",
          capacity: 2,
          image: "/images/gallery/37.jpg",
          imageSmall: "/images/gallery/37-small.jpg",
          descSk: "",
          descEn: "Designer ground floor studio with direct garden access through an oversized terrace. Double bed, spacious shower, dishwasher, fully equipped kitchenette.",
        },
        {
          id: "e",
          name: "Studio FLOWERS",
          count: "2×",
          size: "24m² + mezzanine 6m² + balcony 12m²",
          capacity: 4,
          image: "/images/gallery/40.jpg",
          imageSmall: "/images/gallery/40-small.jpg",
          descSk: "",
          descEn: "Cozy designer studio on the upper floor with comfortable balcony and garden views. 1 queen bed (180×200), 1 double bed in loft (150×200), airy balcony.",
        },
      ],
    },
    amenities: {
      sectionLabel: "Amenities",
      title: "What you'll find here",
      subtitle: "Everything for a comfortable and enjoyable holiday",
      items: [
        { title: "Free Wi-Fi", desc: "Fast complimentary internet" },
        { title: "Free Parking", desc: "Private parking on site" },
        { title: "Jacuzzi", desc: "Outdoor jacuzzi with mountain views" },
        { title: "BBQ Grill", desc: "Garden BBQ for evening grilling" },
        { title: "Playground", desc: "Safe playground for children" },
        { title: "Terrace / Balcony", desc: "Private terrace or balcony" },
        { title: "Kitchenette", desc: "Fully equipped kitchen corner" },
        { title: "Smart TV", desc: "LCD TV in every studio" },
        { title: "Private Entrance", desc: "Your own entrance to the studio" },
        { title: "Bathroom", desc: "Shower or bathtub, hair dryer" },
        { title: "Garden", desc: "Large shared garden" },
        { title: "Nature Nearby", desc: "Right next to forests and nature" },
      ],
    },
    activities: {
      sectionLabel: "Activities",
      title: "Everything is just a step away",
      subtitle: "Adventure, relaxation, and family fun — all within reach",
      items: [
        {
          name: "Chopok / Jasná Ski Resort",
          desc: "The best ski resort in Slovakia. 49 pistes, modern cable cars, snowparks. In summer: hiking, cycling, and paragliding.",
          season: "Year-round",
        },
        {
          name: "Aquapark Tatralandia",
          desc: "A European gem — 24 slides, subtropical paradise, thermal pools, wellness center. Family fun regardless of the weather.",
          season: "Year-round",
        },
        {
          name: "Aquapark Bešeňová",
          desc: "Thermal baths with healing springs, indoor and outdoor pools, water slides, and wellness center.",
          season: "Year-round",
        },
        {
          name: "Demänovská Ice Cave",
          desc: "A unique ice cave in the Demänovská Valley with stunning crystalline formations. Listed as a UNESCO natural monument.",
          season: "Year-round",
        },
        {
          name: "Demänovská Cave of Liberty",
          desc: "The longest accessible cave in Slovakia with breathtaking stalactite formations spanning 4 km.",
          season: "Year-round",
        },
        {
          name: "Bobsled Track Žiarce",
          desc: "Adrenaline-packed summer and winter bobsled ride on the slopes of the Low Tatras. Great for kids and adults.",
          season: "Seasonal",
        },
        {
          name: "Váh River Rafting",
          desc: "Adrenaline rafting on the Váh river in Liptovský Mikuláš. Perfect for groups and families seeking excitement.",
          season: "Summer",
        },
        {
          name: "Hiking in the Tatras",
          desc: "Ďumbier, Chopok, Kvačianska Valley, Prosiecka Valley, Žiarska Valley — hundreds of km of trails for all abilities.",
          season: "Year-round",
        },
      ],
    },
    gallery: {
      sectionLabel: "Gallery",
      title: "A glimpse inside",
      subtitle: "Let yourself be inspired",
      viewMore: "View more photos",
      close: "Close",
    },
    bistro: {
      label: "Our partner",
      title: "Also visit AHA Bistro",
      text: "Our partner establishment in the heart of Liptovský Mikuláš offers exceptional culinary experiences in a warm and welcoming atmosphere. Great food, friendly staff, beautiful city views.",
      button: "Visit AHA Bistro",
    },
    contact: {
      sectionLabel: "Contact",
      title: "Find us here",
      address: "Address",
      phone: "Phone",
      email: "Email",
      gps: "GPS Coordinates",
      writeUs: "Write to us",
      quickContact: "Quick contact",
      desc: "If you have any questions or comments, don't hesitate to contact us. We're here for you.",
    },
    footer: {
      tagline: "Attractive Mountain Apartments",
      copyright: "© 2025 AHA Jasná · Attractive Mountain Apartments · Jasná, Low Tatras",
      nav: "Navigation",
      contact: "Contact",
      partner: "Our partner",
    },
    stats: [
      { number: "9", label: "Apartments" },
      { number: "4+", label: "Years of experience" },
      { number: "4★", label: "Guest rating" },
      { number: "2min", label: "From lifts" },
    ],
    aptChips: ["Wi-Fi", "LCD TV", "Kitchenette", "Parking"],
    booking: {
      guest1: "1 guest",
      guests: "guests",
      guestsCount: (n: number) => n === 1 ? "1 guest" : `${n} guests`,
    },
  },
};

type Translations = typeof translations.sk;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "sk",
  setLang: () => {},
  t: translations.sk,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("aha-lang");
    return (stored === "en" || stored === "sk") ? stored : "sk";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("aha-lang", l);
  };

  const t = translations[lang] as Translations;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
