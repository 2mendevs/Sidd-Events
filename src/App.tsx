import React, { useState, useEffect } from 'react';
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
import { ConsultationRequest } from './types';

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
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [activeBooking, setActiveBooking] = useState<ConsultationRequest | null>(null);
  const [bookings, setBookings] = useState<ConsultationRequest[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize and load bookings
  useEffect(() => {
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
  }, []);

  // Save bookings helper
  const saveBookings = (updated: ConsultationRequest[]) => {
    setBookings(updated);
    localStorage.setItem('siddharth_vibe_bookings', JSON.stringify(updated));
  };

  // CRUD handlers
  const handleUpdateStatus = (id: string, status: ConsultationRequest['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    saveBookings(updated);
  };

  const handleAddNotes = (id: string, notes: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, adminNotes: notes } : b);
    saveBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
  };

  const handleAddManualBooking = (newBooking: ConsultationRequest) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  const handleBookingSubmitted = (req: ConsultationRequest) => {
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

  return (
    <div className="relative min-h-screen bg-luxury-black text-gray-200 select-none antialiased">
      {/* Decorative Outer Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[55%] right-[5%] w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Primary Fixed Navbar */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBookConsultation={handleBookConsultation}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Layout Sections */}
      <main className="relative z-10">
        <Hero
          onExploreServices={() => handleNavigate('services')}
          onViewOurWork={() => handleNavigate('portfolio')}
        />
        
        <Services
          onSelectServiceForCalculator={handleSelectServiceForCalculator}
        />
        
        <AboutUs />
        
        <Portfolio />
        
        <Consultation
          selectedServiceId={selectedServiceId}
          onBookingSuccess={handleBookingSubmitted}
        />
        
        <Testimonials />
      </main>

      {/* Grand Footer */}
      <Footer onNavigate={handleNavigate} />

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
      />
    </div>
  );
}
