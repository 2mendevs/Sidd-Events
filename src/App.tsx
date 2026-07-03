import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Portfolio from './components/Portfolio';
import Consultation from './components/Consultation';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminPanel from './components/AdminPanel';
import EntranceLoader from './components/EntranceLoader';
import MascotSection from './components/MascotSection';
import ProductsPage from './components/ProductsPage';
import { ConsultationRequest } from './types';
import { loadCMSData, saveCMSData, CMSState } from './cmsData';
import { checkDBStatus, loadBookingsFromDB, upsertBookingToDB, deleteBookingFromDB, loadCMSFromDB, saveCMSDataToDB, DBStatus } from './supabaseSync';

const SEED_BOOKINGS: ConsultationRequest[] = [
  {
    id: 'SB-834912',
    status: 'Confirmed',
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@gmail.com',
    phone: '+91 94432 18451',
    eventType: 'Welcome & Wedding Entry Performances',
    eventDate: '2026-08-15',
    guestCount: 350,
    message: 'We are looking for a Royal Golden theme wedding at Heritage Madurai. It must include 10,000+ hanging marigolds and a grand pathway styling.',
    servicesNeeded: ['Event Styling & Theme Design', 'Vendor Coordination'],
    cateringOption: 'Premium Gourmet Buffet',
    decorationTier: 'Regal Floral & Lighting Decor',
    totalEstimatedQuote: 850000,
    adminNotes: 'Spoke with Ramesh. They finalized the contract. Looking forward to site inspection on July 5th.',
    createdAt: '2026-06-25'
  },
  {
    id: 'SB-491204',
    status: 'Pending',
    fullName: 'Priya Dharshini',
    email: 'priya.dharshini@outlook.com',
    phone: '+91 63805 19482',
    eventType: 'Fun Character & Welcome Costumes',
    eventDate: '2026-07-22',
    guestCount: 120,
    message: 'Need a beautiful themed decoration for my daughter\'s 5th birthday, preferably with dynamic custom lights and high-end photo backdrop in Madurai.',
    servicesNeeded: ['Thematic Balloon & Backdrop Installations', 'Exquisite Cake & Dessert Table Styling'],
    cateringOption: 'Deluxe Traditional Meal',
    decorationTier: 'Classic Elegance Theme',
    totalEstimatedQuote: 230000,
    createdAt: '2026-06-26'
  },
  {
    id: 'SB-194512',
    status: 'Confirmed',
    fullName: 'Meenakshi Mills Annual Gala',
    email: 'contact@meenakshimills.com',
    phone: '+91 452 248231',
    eventType: 'Event Core Services',
    eventDate: '2026-09-05',
    guestCount: 200,
    message: 'Annual corporate rewards and recognition banquet. Require pristine execution, custom LED wall background with dynamic content and premium buffet layout.',
    servicesNeeded: ['Full Event Production', 'Day-of Execution'],
    cateringOption: 'Premium Gourmet Buffet',
    decorationTier: 'Regal Floral & Lighting Decor',
    totalEstimatedQuote: 640000,
    adminNotes: 'Secured deposit. Venue confirmed at Courtyard by Marriott, Madurai.',
    createdAt: '2026-06-24'
  },
  {
    id: 'SB-392105',
    status: 'In Conversation',
    fullName: 'Anand Subramanian',
    email: 'anand.subra@yahoo.co.in',
    phone: '+91 98421 82341',
    eventType: 'Event Food Stalls',
    eventDate: '2026-08-28',
    guestCount: 500,
    message: 'Family function with 500 traditional buffet guests. Needs premium quality authentic South Indian leaf service alongside continental desserts.',
    servicesNeeded: ['Traditional & Fusion Catering', 'Exquisite Live Stations'],
    cateringOption: 'Deluxe Traditional Meal',
    decorationTier: 'Classic Elegance Theme',
    totalEstimatedQuote: 410000,
    adminNotes: 'Discussing fusion menu details. Sent quotation revision 2.',
    createdAt: '2026-06-23'
  }
];

export default function App() {
  const [isIntroActive, setIsIntroActive] = useState(() => {
    const hasSeenIntro = sessionStorage.getItem('siddharth_vibe_has_seen_intro');
    return !hasSeenIntro;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [activeBooking, setActiveBooking] = useState<ConsultationRequest | null>(null);
  const [bookings, setBookings] = useState<ConsultationRequest[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cmsData, setCmsData] = useState<CMSState>(loadCMSData());
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('All');

  const [dbStatus, setDbStatus] = useState<DBStatus>('connecting');

  // Initialize and load bookings & CMS from Supabase
  useEffect(() => {
    async function initSupabaseSync() {
      const status = await checkDBStatus();
      setDbStatus(status);

      if (status === 'connected') {
        // Load bookings
        const dbBookings = await loadBookingsFromDB();
        if (dbBookings && dbBookings.length > 0) {
          setBookings(dbBookings);
          localStorage.setItem('siddharth_vibe_bookings', JSON.stringify(dbBookings));
        } else {
          // If DB is connected but empty, seed it!
          const localBookings = localStorage.getItem('siddharth_vibe_bookings');
          const parsed = localBookings ? JSON.parse(localBookings) : SEED_BOOKINGS;
          setBookings(parsed);
          for (const b of parsed) {
            await upsertBookingToDB(b);
          }
        }

        // Load CMS
        const dbCMS = await loadCMSFromDB();
        if (dbCMS) {
          setCmsData(dbCMS);
          saveCMSData(dbCMS);
        } else {
          // If DB is connected but has no CMS row, seed it!
          const currentCMS = loadCMSData();
          await saveCMSDataToDB(currentCMS);
        }
      } else {
        // Fallback to local storage loading
        const saved = localStorage.getItem('siddharth_vibe_bookings');
        if (saved) {
          try {
            setBookings(JSON.parse(saved));
          } catch (e) {
            setBookings(SEED_BOOKINGS);
          }
        } else {
          setBookings(SEED_BOOKINGS);
          localStorage.setItem('siddharth_vibe_bookings', JSON.stringify(SEED_BOOKINGS));
        }
      }
    }

    initSupabaseSync();
  }, []);

  // Save bookings helper
  const saveBookings = (updated: ConsultationRequest[]) => {
    setBookings(updated);
    localStorage.setItem('siddharth_vibe_bookings', JSON.stringify(updated));
  };

  // CRUD handlers
  const handleUpdateStatus = async (id: string, status: ConsultationRequest['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    saveBookings(updated);
    const target = updated.find(b => b.id === id);
    if (target && dbStatus === 'connected') {
      await upsertBookingToDB(target);
    }
  };

  const handleAddNotes = async (id: string, notes: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, adminNotes: notes } : b);
    saveBookings(updated);
    const target = updated.find(b => b.id === id);
    if (target && dbStatus === 'connected') {
      await upsertBookingToDB(target);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    if (dbStatus === 'connected') {
      await deleteBookingFromDB(id);
    }
  };

  const handleAddManualBooking = async (newBooking: ConsultationRequest) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    if (dbStatus === 'connected') {
      await upsertBookingToDB(newBooking);
    }
  };

  const handleBookingSubmitted = async (req: ConsultationRequest) => {
    // Enrich request with fields for admin tracking
    const enriched: ConsultationRequest = {
      ...req,
      id: 'SB-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updated = [enriched, ...bookings];
    saveBookings(updated);
    setActiveBooking(enriched);
    if (dbStatus === 'connected') {
      await upsertBookingToDB(enriched);
    }
  };

  // Update CMS callback helper
  const handleUpdateCMS = async (newData: CMSState) => {
    setCmsData(newData);
    saveCMSData(newData);
    if (dbStatus === 'connected') {
      await saveCMSDataToDB(newData);
    }
  };


  // Smooth scroll navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookConsultation = () => {
    handleNavigate('packages');
  };

  const handleSelectServiceForCalculator = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('packages');
  };

  // Intersection Observer to update active navigation links on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'packages', 'testimonials', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the sweet spot of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Lock scroll when entrance loader is playing to prevent mobile layout shifts
  useEffect(() => {
    if (isIntroActive) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isIntroActive]);

  // Theme variable styles
  const isDarkMode = cmsData.globalSettings.isDarkMode;
  const primaryColor = cmsData.globalSettings.primaryColor;
  const secondaryColor = cmsData.globalSettings.secondaryColor;
  const headingFont = cmsData.globalSettings.headingFont;
  const bodyFont = cmsData.globalSettings.bodyFont;

  const fontDisplayFamily = headingFont === 'serif' ? '"Cormorant Garamond", Georgia, serif' : headingFont === 'sans-serif' ? '"Inter", sans-serif' : '"Cinzel", "Cinzel Decorative", serif';
  const fontSansFamily = bodyFont === 'mono' ? '"JetBrains Mono", monospace' : bodyFont === 'serif' ? '"Cormorant Garamond", serif' : '"Inter", sans-serif';

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-luxury-black text-gray-200 select-none antialiased">
      {/* Premium Entrance/Loader Animation */}
      <AnimatePresence mode="wait">
        {isIntroActive && (
          <EntranceLoader
            cmsData={cmsData}
            onComplete={() => {
              setIsIntroActive(false);
              sessionStorage.setItem('siddharth_vibe_has_seen_intro', 'true');
            }}
          />
        )}
      </AnimatePresence>

      {/* Real-time Theme Overrides Engine */}
      <style>{`
        :root {
          --color-gold-400: ${primaryColor} !important;
          --color-gold-500: ${primaryColor} !important;
          --color-gold-600: ${primaryColor}dd !important;
          --color-gold-300: ${secondaryColor} !important;
          --font-display: ${fontDisplayFamily} !important;
          --font-sans: ${fontSansFamily} !important;
        }
        
        ${!isDarkMode ? `
          /* High contrast Royal Cream Light mode overrides */
          body, .min-h-screen, html {
            background-color: #fcfbfa !important;
            color: #1a1a1a !important;
          }
          .bg-luxury-black, .bg-[#030303] {
            background-color: #f7f5ef !important;
          }
          .bg-luxury-gray, .bg-luxury-gray\\/40, .bg-luxury-gray\\/85, .bg-luxury-gray\\/90 {
            background-color: #eae6db !important;
          }
          .text-white, .text-gray-200, .text-gray-300 {
            color: #141414 !important;
          }
          .text-gray-400, .text-gray-500 {
            color: #4a4a4a !important;
          }
          .border-gold-500\\/10, .border-gold-400\\/30, .border-gold-400\\/20, .border-gold-500\\/15, .border-gold-500\\/25 {
            border-color: rgba(197, 142, 55, 0.25) !important;
          }
          .divide-gold-500\\/10 > * {
            border-color: rgba(197, 142, 55, 0.25) !important;
          }
          .bg-radial-luxury {
            background: radial-gradient(circle at 50% 50%, rgba(251, 249, 244, 0.75) 0%, rgba(247, 245, 239, 1) 100%) !important;
          }
          .gold-shimmer-btn {
            color: #ffffff !important;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%) !important;
          }
          .text-gold-400, .text-gold-300 {
            color: ${primaryColor} !important;
          }
          .group-hover\\:via-gold-400 {
            background-image: linear-gradient(to right, transparent, ${primaryColor}, transparent) !important;
          }
          /* Overlay adjustments for Hero background visibility */
          .bg-radial-luxury {
            opacity: 0.65 !important;
          }
        ` : ''}
      `}</style>

      {/* Decorative Outer Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[55%] right-[5%] w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[150px]" />
      </div>

      {currentPage === 'home' ? (
        <>
          {/* Primary Fixed Navbar */}
          <Header
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onBookConsultation={handleBookConsultation}
            onOpenAdmin={() => setIsAdminOpen(true)}
            cmsData={cmsData}
          />

          {/* Main Layout Sections */}
          <main className="relative z-10">
            <Hero
              onExploreServices={() => handleNavigate('services')}
              onViewOurWork={() => handleNavigate('portfolio')}
              cmsData={cmsData}
            />
            
            <Services
              onSelectServiceForCalculator={handleSelectServiceForCalculator}
              cmsData={cmsData}
              onViewServicePortfolio={(categoryName) => {
                setSelectedPortfolioCategory(categoryName);
                handleNavigate('portfolio');
              }}
            />
            
            <AboutUs cmsData={cmsData} />
            
            <Portfolio 
              cmsData={cmsData} 
              selectedCategory={selectedPortfolioCategory}
              setSelectedCategory={setSelectedPortfolioCategory}
            />

            <MascotSection 
              cmsData={cmsData} 
              onViewProducts={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} 
            />
            
            <Consultation
              selectedServiceId={selectedServiceId}
              onBookingSuccess={handleBookingSubmitted}
              cmsData={cmsData}
            />
            
            <Testimonials cmsData={cmsData} />
          </main>

          {/* Grand Footer */}
          <Footer onNavigate={handleNavigate} cmsData={cmsData} onOpenAdmin={() => setIsAdminOpen(true)} />
        </>
      ) : (
        <AnimatePresence mode="wait">
          <ProductsPage 
            cmsData={cmsData} 
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
          />
        </AnimatePresence>
      )}

      {/* Consultation Success Modal Popups */}
      <BookingModal
        request={activeBooking}
        onClose={() => setActiveBooking(null)}
      />

      {/* Admin Panel Console Drawer */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        onUpdateStatus={handleUpdateStatus}
        onAddNotes={handleAddNotes}
        onDeleteBooking={handleDeleteBooking}
        onAddManualBooking={handleAddManualBooking}
        cmsData={cmsData}
        onUpdateCMS={handleUpdateCMS}
        dbStatus={dbStatus}
        onReplayIntro={() => {
          setIsIntroActive(true);
          setIsAdminOpen(false);
        }}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
