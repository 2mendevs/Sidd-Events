import { NavItem, ServiceItem, PortfolioItem, StatItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', id: 'home' },
  { label: 'ABOUT US', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'PORTFOLIO', id: 'portfolio' },
  { label: 'PACKAGES', id: 'packages' },
  { label: 'TESTIMONIALS', id: 'testimonials' },
  { label: 'CONTACT', id: 'contact' },
];

export const SERVICE_ITEMS: ServiceItem[] = [
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
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
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
  },
];

export const STATS_ITEMS: StatItem[] = [
  { value: '300+', label: 'EVENTS COMPLETED' },
  { value: '250+', label: 'HAPPY CLIENTS' },
  { value: '15+', label: 'YEARS EXPERIENCE' },
  { value: '25+', label: 'TEAM MEMBERS' },
];

export const TESTIMONIALS_ITEMS = [
  {
    name: 'Srinivasan Ramanathan',
    role: 'Father of the Bride',
    comment: 'Siddharth Vibe Events turned my daughter\'s wedding into an absolute dream. The level of detail, the majestic gold chandeliers, and the sheer dedication of their staff was remarkable. It felt like walking into a royal palace.',
    event: 'Prestige Wedding at Taj Surya',
    rating: 5,
  },
  {
    name: 'Archana Krishnakumar',
    role: 'Marketing Director, Techcorp',
    comment: 'For our annual gala dinner, we needed something prestigious and flawless. Siddharth\'s team took our brand theme and transformed the hall into an elegant, high-profile awards night. Absolutely professional and highly recommended!',
    event: 'Techcorp Annual Gala',
    rating: 5,
  },
  {
    name: 'Senthil & Divya',
    role: 'Newlyweds',
    comment: 'The catering, the floral design, the stage setup—everything was top-tier. Every single guest complimented the exquisite food and the warm candlelit ambiance. Siddharth Vibe Events truly makes every detail perfection.',
    event: 'Luxury Outdoor Wedding',
    rating: 5,
  },
];
