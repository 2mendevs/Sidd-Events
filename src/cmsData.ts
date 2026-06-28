export interface NavItem {
  label: string;
  id: string;
}

export interface FeatureHighlight {
  id: string;
  icon: string;
  label: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  detailText: string;
  features: string[];
  basePrice: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  date: string;
  details: string;
}

export interface WhyChooseItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialCard {
  id: string;
  name: string;
  role: string;
  comment: string;
  event: string;
  rating: number;
  photoUrl?: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

export interface MascotSection {
  badgeText: string;
  heading: string;
  description: string;
  highlightWords: string;
  tags: string[];
  imageUrl: string;
  ctaText: string;
  products: ProductItem[];
}

export interface CMSState {
  navbar: {
    logoText: string;
    logoSubtext: string;
    logoImage?: string;
    links: NavItem[];
    ctaText: string;
    ctaHref: string;
    isSticky: boolean;
  };
  hero: {
    headline: string;
    subheadline: string;
    taglineLine1: string;
    taglineLine2: string;
    imageUrl: string;
    cta1Text: string;
    cta1Href: string;
    cta2Text: string;
    cta2Href: string;
    overlayOpacity: number; // 0 to 100
    badgeText: string;
  };
  about: {
    heading: string;
    title: string;
    description1: string;
    description2: string;
    signatureName: string;
    signatureRole: string;
    images: string[]; // 3 images
    stats: StatItem[];
  };
  services: {
    heading: string;
    subheading: string;
    items: ServiceCard[];
  };
  gallery: {
    heading: string;
    description: string;
    items: GalleryItem[];
    layout: 'grid' | 'masonry' | 'slider';
  };
  whyChooseUs: {
    heading: string;
    subheading: string;
    items: WhyChooseItem[];
  };
  testimonials: {
    heading: string;
    subheading: string;
    items: TestimonialCard[];
    layout: 'carousel' | 'grid';
  };
  contact: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaHref: string;
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  footer: {
    logoText: string;
    tagline: string;
    quickLinks: FooterLink[];
    servicesLinks: FooterLink[];
    socials: SocialLink[];
    copyrightText: string;
    bottomBarText: string;
  };
  globalSettings: {
    primaryColor: string;
    secondaryColor: string;
    headingFont: 'serif' | 'sans-serif' | 'cinzel';
    bodyFont: 'sans' | 'mono' | 'serif';
    isDarkMode: boolean;
  };
  entranceSettings: {
    heading: string;
    subtext: string;
    tagline: string;
    durationSeconds: number; // e.g., 1.5
    showSkipButton: boolean;
  };
  mascotSection: MascotSection;
}

export const DEFAULT_CMS_DATA: CMSState = {
  navbar: {
    logoText: "SIDDHARTH",
    logoSubtext: "VIBE EVENTS",
    links: [
      { label: 'HOME', id: 'home' },
      { label: 'SERVICES', id: 'services' },
      { label: 'ABOUT US', id: 'about' },
      { label: 'PORTFOLIO', id: 'portfolio' },
      { label: 'PACKAGES', id: 'packages' },
      { label: 'TESTIMONIALS', id: 'testimonials' },
      { label: 'CONTACT', id: 'contact' },
    ],
    ctaText: "BOOK A CONSULTATION",
    ctaHref: "#packages",
    isSticky: true,
  },
  hero: {
    headline: "EXTRAORDINARY EVENTS. TIMELESS MEMORIES.",
    subheadline: "From intimate gatherings to grand celebrations, we design experiences that leave lasting impressions and turn your vision into reality.",
    taglineLine1: "CRAFTING MOMENTS.",
    taglineLine2: "CREATING MEMORIES.",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1800",
    cta1Text: "EXPLORE SERVICES",
    cta1Href: "#services",
    cta2Text: "VIEW OUR WORK",
    cta2Href: "#portfolio",
    overlayOpacity: 85,
    badgeText: "PREMIUM LUXURY EVENTS",
  },
  about: {
    heading: "ABOUT US",
    title: "DETAILS MAKE PERFECTION",
    description1: "At Siddharth Vibe Events, we believe every detail matters. Our passionate team blends creativity, precision, and dedication to craft celebrations that are seamless, stylish, and unforgettable.",
    description2: "We specialize in curating high-end bespoke environments in Madurai and across South India. By blending exquisite lighting designs, magnificent floral setups, and top-tier culinary collaborations, we turn every single venue into an immersive visual sanctuary.",
    signatureName: "Siddharth",
    signatureRole: "FOUNDER & CEO",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1507504038482-762103743ec1?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400"
    ],
    stats: [
      { id: "stat-1", value: "300+", label: "EVENTS COMPLETED" },
      { id: "stat-2", value: "250+", label: "HAPPY CLIENTS" },
      { id: "stat-3", value: "15+", label: "YEARS EXPERIENCE" },
      { id: "stat-4", value: "25+", label: "TEAM MEMBERS" }
    ]
  },
  services: {
    heading: "OUR PREMIUM SERVICES",
    subheading: "Tailored luxury concepts designed and executed with pristine detail",
    items: [
      {
        id: 'temple-processions',
        title: 'Temple Processions (Sammy Oorvalam)',
        description: 'Traditional grand temple festivals and divine holy processions.',
        iconName: 'Flame',
        detailText: 'Enrich your temple and holy festivals with authentic musical bands, beautifully decorated chariots, and spectacular traditional procession management.',
        features: [
          'Authentic temple music and percussions',
          'Beautifully decorated chariot styling',
          'Comprehensive crowd coordination & safety',
          'Traditional divine holy fire and aura displays',
          'Highly experienced local art performers'
        ],
        basePrice: 25000,
      },
      {
        id: 'wedding-entries',
        title: 'Welcome & Wedding Entry Performances',
        description: 'Spectacular royal entry choreographies and guest greetings.',
        iconName: 'Sparkles',
        detailText: 'Create a majestic first impression with synchronized entry performances, custom flower showers, instrumental welcomes, and traditional royal greetings.',
        features: [
          'Synchronized petal and flower shower arrays',
          'Elegant traditional welcome dance troupes',
          'VIP red carpet grand entryway design',
          'Exquisite brass band and trumpet greeting',
          'Personalized custom entry theme concept'
        ],
        basePrice: 35000,
      },
      {
        id: 'food-stalls',
        title: 'Event Food Stalls',
        description: 'Interactive culinary setups, sweet carts, and delicious treats.',
        iconName: 'UtensilsCrossed',
        detailText: 'Treat your guests to delightful live food counters, authentic snack stations, popcorn, cotton candy, and mouthwatering South Indian street food counters.',
        features: [
          'Traditional snack & chaat live stalls',
          'Nostalgic popcorn & cotton candy machines',
          'Authentic live hot dosa & idli counters',
          'Uniformed, polite, and professional chefs',
          'Pristine hygiene and visual presentation'
        ],
        basePrice: 15000,
      },
      {
        id: 'fun-characters',
        title: 'Fun Character & Welcome Costumes',
        description: 'Engaging custom character greetings and kid-friendly entertainment.',
        iconName: 'Smile',
        detailText: 'Enlighten children and family guests with classic welcome characters, funny cartoon lookalikes, and interactive roaming costume performers.',
        features: [
          'Energetic and interactive welcome greetings',
          'Beloved high-quality cartoon characters',
          'Perfect for child birthdays & family zones',
          'Wonderful photo and selfie opportunities',
          'Engaging roaming clown or wizard shows'
        ],
        basePrice: 10000,
      },
      {
        id: 'musical-performances',
        title: 'Musical Instrument Performances',
        description: 'Elegant live fusion bands, classical flute, and premium violin shows.',
        iconName: 'Music',
        detailText: 'Indulge your guests in high-class acoustic vibes, classical carnatic instrumentals, and trending live background melodies.',
        features: [
          'Live violin, flute, and veena acoustic duets',
          'Premium instrumental carnatic fusion bands',
          'Traditional auspicious Nadaswaram & Thavil',
          'High-end acoustic sound system integration',
          'Customized setlist to match event mood'
        ],
        basePrice: 30000,
      },
      {
        id: 'tamil-folk-dances',
        title: 'Traditional Tamil Folk Dances (கிராமிய நிகழ்ச்சிகள்)',
        description: 'Energetic traditional Karagattam, Oyilattam, and folk arts.',
        iconName: 'Heart',
        detailText: 'Preserve and celebrate the heritage of Tamil Nadu with vibrant, highly energetic, authentic folk dance performances.',
        features: [
          'Karagattam & Oyilattam professional ensembles',
          'Traditional Kavadi & Poikkal Kudirai shows',
          'Authentic rustic folk percussion beats',
          'Vibrant custom-tailored traditional attire',
          'High-energy crowd interaction segments'
        ],
        basePrice: 20000,
      },
      {
        id: 'entertainment-shows',
        title: 'Entertainment Shows',
        description: 'Mind-bending magic acts, puppet shows, and interactive games.',
        iconName: 'Tv',
        detailText: 'Keep your guests entertained with premium comedy, international standard magic shows, puppet plays, and lively master of ceremonies.',
        features: [
          'Professional high-energy comedic hosting',
          'Mind-bending magic & illusion stage acts',
          'Traditional storytelling puppet theater',
          'Interactive group and family game setups',
          'Custom event prizes and souvenirs'
        ],
        basePrice: 18000,
      },
      {
        id: 'music-party',
        title: 'Music & Party',
        description: 'Vibrant DJs, custom sound setups, and premium party lighting.',
        iconName: 'Disc',
        detailText: 'Ignite the dance floor with elite sound systems, custom laser light setups, and live dynamic mixes from professional event DJs.',
        features: [
          'Professional high-energy party DJ service',
          'Premium JBL/RCF sound and subwoofers',
          'Custom laser & ambient wash light design',
          'LED dynamic interactive dance floor setups',
          'Curation of custom song request lists'
        ],
        basePrice: 25000,
      },
      {
        id: 'core-services',
        title: 'Event Core Services',
        description: 'Pristine end-to-end coordination, high-end seating, and security.',
        iconName: 'Briefcase',
        detailText: 'Take the stress away. We handle everything from basic staging, luxury seating configurations, logistics, to comprehensive venue coordination.',
        features: [
          'Pristine aluminum staging & trusses',
          'VIP luxury seating & premium linen',
          'On-site senior coordination manager',
          'Comprehensive logistics and load-in control',
          'Professional hostess & safety security teams'
        ],
        basePrice: 40000,
      },
      {
        id: 'sammy-attam',
        title: 'Sammy Attam Costumes (8 Feet Traditional Costumes)',
        description: 'Spectacular 8-feet divine dance figures and majestic costumes.',
        iconName: 'Shield',
        detailText: 'Hypnotize your audience with majestic, towering 8-feet divine figures dancing to intense traditional percussion beats.',
        features: [
          'Towering 8-foot traditional costume structures',
          'Spirit-filled intense temple dance styles',
          'Highly trained custom costume performers',
          'Auspicious live dhol & thavil beats',
          'Stunning grand entrance walk integration'
        ],
        basePrice: 28000,
      },
      {
        id: 'theyyam-dance',
        title: 'Kerala Famous Theyyam Dance',
        description: 'Vibrant, high-art, divine spiritual ritual performance.',
        iconName: 'Crown',
        detailText: 'Invite divine blessings with the world-renowned ritual art form of Kerala. Authentic make-up, elaborate headgears, and powerful dances.',
        features: [
          'Authentic certified traditional Kerala artists',
          'Elaborate face-painting and herbal make-up',
          'Gigantic, breathtaking handcrafted headgears',
          'Powerfully intense live ritual percussions',
          'Divine aura of ancient spiritual culture'
        ],
        basePrice: 35000,
      },
      {
        id: 'trending-entries',
        title: 'Special Trending Entry Collections',
        description: 'Modern LED entries, fog walks, and dramatic theme reveals.',
        iconName: 'Zap',
        detailText: 'Make the most memorable entrance of your life with customized modern smoke fog effect walks, LED wing arrays, and thematic vehicle entries.',
        features: [
          'Premium heavy dry-ice fog carpet effect',
          'LED luminous fairy and butterfly wing guides',
          'Cold-fire indoor sparkler pyro arrays',
          'Thematic chariot, swing, or luxury car entries',
          'Dramatic reveal count-down with music'
        ],
        basePrice: 45000,
      },
      {
        id: 'mascots-large',
        title: 'Mascot Costumes (6–12 Feet)',
        description: 'Gigantic, eye-catching walkabout mascot characters.',
        iconName: 'Gift',
        detailText: 'Turn heads with massive 6 to 12 feet tall inflatable and custom-molded mascots, perfect for grand openings, temple festivals, and carnivals.',
        features: [
          'Gigantic 6 to 12 feet tall inflatable mascots',
          'Vibrant custom themed and colorful designs',
          'Interactive high-fives and crowd greeting',
          'Instant crowd pullers and photo points',
          'Perfect for viral social media reels'
        ],
        basePrice: 16000,
      },
      {
        id: 'mascots-standard',
        title: 'Kids & Adult Mascot Costumes (6 Feet)',
        description: 'Perfect height mascots representing modern animated icons.',
        iconName: 'Users',
        detailText: 'Bring children\'s favorite fantasy stories and superheroes to life with high-quality 6-foot mascot character costumes.',
        features: [
          'Premium-quality 6-foot mascot costumes',
          'Beloved current cartoon and animated icons',
          'Fun interactive game integration with guests',
          'Cake-cutting celebration entourage parade',
          'Memorable photography and family poses'
        ],
        basePrice: 12000,
      },
      {
        id: 'additional-collections',
        title: 'Additional Event Collections',
        description: 'Bespoke event add-ons, premium returns, and special custom orders.',
        iconName: 'PlusCircle',
        detailText: 'Curate your event down to the smallest detail with personalized returns, custom photo-booth backdrops, and signature welcome counters.',
        features: [
          'Personalized premium return gifts & favors',
          'Interactive digital calligraphy guestbooks',
          'Creative visual photo-booth custom grids',
          'Signature mocktail welcome drink stations',
          'Dynamic premium digital invitations'
        ],
        basePrice: 10000,
      }
    ]
  },
  gallery: {
    heading: "EVERY EVENT, A MASTERPIECE",
    description: "View our portfolio of majestic event curations executed to perfection across Southern India",
    layout: "slider",
    items: [
      {
        id: 'port-1',
        title: 'The Golden Canopy Reception',
        category: 'Weddings',
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
        location: 'Heritage Madurai, Madurai',
        date: 'Dec 2025',
        details: 'An ultra-luxurious indoor banquet layout featuring over 15,000 hanging marigolds and orchids, 500+ glowing beeswax candles, and custom golden tableware.',
      },
      {
        id: 'port-2',
        title: 'Royal Crystal Gala Night',
        category: 'Corporate Events',
        imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
        location: 'Courtyard by Marriott, Madurai',
        date: 'Jan 2026',
        details: 'A premium corporate milestone awards dinner utilizing grand crystal chandeliers, high-resolution custom LED walls, and a state-of-the-art immersive surround sound system.',
      },
      {
        id: 'port-3',
        title: 'Midnight Whispers Birthday',
        category: 'Birthdays',
        imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800',
        location: 'Private Villa, Ooty',
        date: 'Feb 2026',
        details: 'A private birthday party in the hills styled in dramatic black velvet, warm copper/gold lighting, personalized neon backdrops, and signature mixology bars.',
      },
      {
        id: 'port-4',
        title: 'Grand Chandelier Banquet',
        category: 'Catering',
        imageUrl: 'https://images.unsplash.com/photo-1507504038482-762103743ec1?auto=format&fit=crop&q=80&w=800',
        location: 'Fortune Pandiyan, Madurai',
        date: 'Mar 2026',
        details: 'A massive 2,000-guest luxury dinner wedding with 15 dramatic culinary stations, customized multi-tier dessert lounges, and fully-uniformed server teams.',
      }
    ]
  },
  whyChooseUs: {
    heading: "WHY SOPHISTICATED HOSTS CHOOSE US",
    subheading: "Setting the gold standard in bespoke South Indian celebrations through unmatched precision and visionary artistry.",
    items: [
      {
        id: "wcu-1",
        icon: "Shield",
        title: "PRISTINE STEWARDSHIP",
        description: "We orchestrate everything. From staging layout permissions, structural engineering, load-ins, to direct multi-vendor synchronization."
      },
      {
        id: "wcu-2",
        icon: "Crown",
        title: "BESPOKE LUXURY ARTISTRY",
        description: "Zero cookie-cutter structures. Every color scheme, light angle, and floral selection is styled exclusively for your family signature."
      },
      {
        id: "wcu-3",
        icon: "Flame",
        title: "LOCAL HERITAGE SPECIALISTS",
        description: "Deeply connected in Madurai, Tanjore, and Chennai. We execute traditional grand temple processions and authentic folk events with flawless cultural reverence."
      }
    ]
  },
  testimonials: {
    heading: "LOVED BY SOPHISTICATED HOSTS",
    subheading: "Read direct feedback from prominent families and corporate clients we have had the privilege to serve.",
    layout: "carousel",
    items: [
      {
        id: 'test-1',
        name: 'Srinivasan Ramanathan',
        role: 'Father of the Bride',
        comment: 'Siddharth Vibe Events turned my daughter\'s wedding into an absolute dream. The level of detail, the majestic gold chandeliers, and the sheer dedication of their staff was remarkable. It felt like walking into a royal palace.',
        event: 'Prestige Wedding at Taj Surya',
        rating: 5,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'test-2',
        name: 'Archana Krishnakumar',
        role: 'Marketing Director, Techcorp',
        comment: 'For our annual gala dinner, we needed something prestigious and flawless. Siddharth\'s team took our brand theme and transformed the hall into an elegant, high-profile awards night. Absolutely professional and highly recommended!',
        event: 'Techcorp Annual Gala',
        rating: 5,
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      },
      {
        id: 'test-3',
        name: 'Senthil & Divya',
        role: 'Newlyweds',
        comment: 'The catering, the floral design, the stage setup—everything was top-tier. Every single guest complimented the exquisite food and the warm candlelit ambiance. Siddharth Vibe Events truly makes every detail perfection.',
        event: 'Luxury Outdoor Wedding',
        rating: 5,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
      }
    ]
  },
  contact: {
    heading: "BEGIN YOUR MASTERPIECE",
    subheading: "Schedule an exclusive personal consultation at our Madurai boutique office or connect with us digitally to draft your custom curation plan.",
    ctaText: "INITIATE EVENT CONSULTATION",
    ctaHref: "#packages",
    phone: "+91 63816 90032",
    email: "siddharthvibeevents@gmail.com",
    address: "Thirupparankundram, Madurai, Tamil Nadu 625005, India",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m4!2m3!1m2!1s0x3b00ced17fd6f897%3A0xc39f28d8b1b59aef!2sThiruparankundram%2C+Madurai%2C+Tamil+Nadu!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ced17fd6f897%3A0xc39f28d8b1b59aef!2sThiruparankundram%2C+Madurai%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1580000000000!5m2!1sen!2sin"
  },
  footer: {
    logoText: "SIDDHARTH VIBE EVENTS",
    tagline: "We design unforgettable experiences with elegance, creativity, and perfect execution. Specializing in bespoke luxury events across Madurai and South India.",
    quickLinks: [
      { id: "fl-1", label: "Home", href: "#home" },
      { id: "fl-2", label: "Services", href: "#services" },
      { id: "fl-3", label: "About Us", href: "#about" },
      { id: "fl-4", label: "Portfolio", href: "#portfolio" },
      { id: "fl-5", label: "Packages", href: "#packages" },
      { id: "fl-6", label: "Testimonials", href: "#testimonials" },
      { id: "fl-7", label: "Contact", href: "#contact" }
    ],
    servicesLinks: [
      { id: "sl-1", label: "Temple Processions", href: "#services" },
      { id: "sl-2", label: "Welcome & Entry", href: "#services" },
      { id: "sl-3", label: "Event Food Stalls", href: "#services" },
      { id: "sl-4", label: "Folk Dances", href: "#services" },
      { id: "sl-5", label: "Sammy Attam", href: "#services" }
    ],
    socials: [
      { id: "soc-1", platform: "Facebook", url: "https://facebook.com", icon: "Facebook" },
      { id: "soc-2", platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
      { id: "soc-3", platform: "YouTube", url: "https://youtube.com", icon: "Youtube" },
      { id: "soc-4", platform: "WhatsApp", url: "https://whatsapp.com", icon: "MessageCircle" }
    ],
    copyrightText: "© 2026 Siddharth Vibe Events. All Rights Reserved.",
    bottomBarText: "Designed with love by 2Mendevs"
  },
  globalSettings: {
    primaryColor: "#c58e37",
    secondaryColor: "#dfc27d",
    headingFont: "cinzel",
    bodyFont: "sans",
    isDarkMode: true,
  },
  entranceSettings: {
    heading: "SIDDHARTH VIBE",
    subtext: "EVENTS",
    tagline: "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND",
    durationSeconds: 1.2, // fast & snappy, but still elegant
    showSkipButton: true,
  },
  mascotSection: {
    badgeText: "SINCE 1991",
    heading: "Mascot Costumes & Inflatable Characters",
    description: "From towering 12-foot mascots to adorable 6-foot characters — our premium export-quality costumes are available for sale & rental across Tamil Nadu and beyond.",
    highlightWords: "sale & rental",
    tags: ["Gorilla", "Teddy Bear", "Dinosaur", "Duck", "Rooster", "Panda", "+ More"],
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800",
    ctaText: "View Products",
    products: [
      {
        id: "prod-1",
        name: "Premium King Kong Gorilla Costume",
        category: "Mascot Costume",
        description: "An impressive, high-fidelity 8-foot tall gorilla mascot perfect for high-impact welcome entries, crowd activation, and premium photoshoots.",
        imageUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental", "Live Performance"]
      },
      {
        id: "prod-2",
        name: "Pink Velvet Royal Teddy Bear",
        category: "Mascot Costume",
        description: "An incredibly soft, luxury pink velvet teddy bear costume with customized accessories. Ideal for grand birthdays, kids' parties, and baby showers.",
        imageUrl: "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental", "Sale"]
      },
      {
        id: "prod-3",
        name: "Colossal T-Rex Inflatable Character",
        category: "Inflatable Character",
        description: "A towering 10-foot tall pneumatic inflatable dinosaur character that dances and interacts with guests, creating an unmatched visual spectacle.",
        imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental Only"]
      },
      {
        id: "prod-4",
        name: "Festive South Indian Rooster Suit",
        category: "Mascot Costume",
        description: "A brightly colored, culturally themed rooster costume suited for grand traditional processions, temple entries, and folk celebrations.",
        imageUrl: "https://images.unsplash.com/photo-1604085572504-a392ddf0b8b8?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental", "Traditional"]
      },
      {
        id: "prod-5",
        name: "Fluffy Golden Yellow Duck",
        category: "Mascot Costume",
        description: "An adorable oversized yellow duck mascot with charming features, extremely popular for school celebrations and themed birthday entries.",
        imageUrl: "https://images.unsplash.com/photo-1582905926827-63dfa4aca0cf?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental", "Sale"]
      },
      {
        id: "prod-6",
        name: "Giant Friendly Panda Suit",
        category: "Mascot Costume",
        description: "A lovable giant panda costume made of premium export-quality breathable material, ensuring smooth energetic dance steps and guest interactions.",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80&w=600",
        tags: ["Rental", "Highly Interactive"]
      }
    ]
  }
};

const LOCAL_STORAGE_KEY = "siddharth_vibe_cms_content";

export function loadCMSData(): CMSState {
  if (typeof window === "undefined") return DEFAULT_CMS_DATA;
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
    return DEFAULT_CMS_DATA;
  }
  try {
    const parsed = JSON.parse(saved);
    // Deep fallback merge to ensure no missing fields if we upgrade schemas
    return {
      ...DEFAULT_CMS_DATA,
      ...parsed,
      navbar: { ...DEFAULT_CMS_DATA.navbar, ...parsed.navbar },
      hero: { ...DEFAULT_CMS_DATA.hero, ...parsed.hero },
      about: { ...DEFAULT_CMS_DATA.about, ...parsed.about },
      services: { ...DEFAULT_CMS_DATA.services, ...parsed.services },
      gallery: { ...DEFAULT_CMS_DATA.gallery, ...parsed.gallery },
      whyChooseUs: { ...DEFAULT_CMS_DATA.whyChooseUs, ...parsed.whyChooseUs },
      testimonials: { ...DEFAULT_CMS_DATA.testimonials, ...parsed.testimonials },
      contact: { ...DEFAULT_CMS_DATA.contact, ...parsed.contact },
      footer: { ...DEFAULT_CMS_DATA.footer, ...parsed.footer },
      globalSettings: { ...DEFAULT_CMS_DATA.globalSettings, ...parsed.globalSettings },
      entranceSettings: { ...DEFAULT_CMS_DATA.entranceSettings, ...parsed.entranceSettings },
      mascotSection: { ...DEFAULT_CMS_DATA.mascotSection, ...parsed.mascotSection },
    };
  } catch (e) {
    return DEFAULT_CMS_DATA;
  }
}

export function saveCMSData(data: CMSState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
}
