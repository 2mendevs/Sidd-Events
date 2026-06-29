import React, { useState, useEffect } from 'react';
import { 
  X, Shield, Lock, Briefcase, Calendar, Users, DollarSign, 
  Search, Filter, CheckCircle, Clock, Trash2, Edit3, Save, Sparkles,
  Plus, TrendingUp, Award, Layers, MapPin, Phone, Mail, FileText, ChevronRight, Upload,
  Sliders, Palette, Image as ImageIcon, Type, Link as LinkIcon, MessageSquare, Compass, Settings, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConsultationRequest } from '../types';
import { CMSState, ServiceCard, GalleryItem } from '../cmsData';
import { DBStatus } from '../supabaseSync';
import { SUPABASE_SQL_SCHEMA, SUPABASE_URL } from '../supabaseClient';
import Logo from './Logo';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConsultationRequest[];
  onUpdateStatus: (id: string, status: ConsultationRequest['status']) => void;
  onAddNotes: (id: string, notes: string) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: ConsultationRequest) => void;
  cmsData: CMSState;
  onUpdateCMS: (data: CMSState) => void;
  onReplayIntro?: () => void;
  dbStatus?: DBStatus;
}

// Admin Credentials
const ADMIN_EMAIL = 'siddharth2307.mba@gmail.com';
const ADMIN_PASSWORD = 'Siddhu@3144';

interface ImageUploaderProps {
  key?: any;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  idPrefix: string;
}

function ImageUploader({ label, value, onChange, idPrefix }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Image is larger than 2MB. Please compress for fast loading.');
    } else {
      setError('');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2 bg-luxury-gray/10 p-3 border border-gold-500/10 rounded">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase font-semibold">{label}</label>
        {value && value.startsWith('data:image/') && (
          <span className="text-[8px] font-mono text-emerald-400 uppercase bg-emerald-950/20 px-1 border border-emerald-500/20 rounded">Uploaded File</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Preview */}
        <div className="md:col-span-3 flex justify-center">
          {value ? (
            <div className="relative group w-20 h-20 border border-gold-500/20 bg-luxury-black rounded overflow-hidden">
              <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-0 bg-rose-950/80 text-rose-400 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-mono uppercase transition-opacity cursor-pointer font-bold"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 border border-dashed border-gray-700 bg-luxury-black/40 rounded flex flex-col items-center justify-center text-gray-600">
              <ImageIcon size={18} />
              <span className="text-[8px] font-mono mt-1">No Image</span>
            </div>
          )}
        </div>

        {/* Upload zone and Input */}
        <div className="md:col-span-9 space-y-2">
          {/* Drag & drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border border-dashed p-3 text-center transition-colors relative rounded ${
              dragActive 
                ? 'border-gold-400 bg-gold-950/20' 
                : 'border-gold-500/15 bg-luxury-black/40 hover:border-gold-500/30'
            }`}
          >
            <input
              type="file"
              id={`file-upload-${idPrefix}`}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor={`file-upload-${idPrefix}`}
              className="cursor-pointer flex flex-col items-center justify-center gap-1"
            >
              <Upload size={14} className="text-gold-400" />
              <span className="text-[10px] font-mono text-gray-300">
                Drag & drop or <span className="text-gold-400 font-semibold underline">Browse file</span>
              </span>
              <span className="text-[8px] text-gray-500 font-sans">Supports PNG, JPG, SVG, WEBP</span>
            </label>
          </div>

          {/* Or enter URL */}
          <div className="flex gap-2 items-center bg-luxury-black/30 p-1.5 border border-gold-500/5 rounded">
            <span className="text-[8px] font-mono text-gray-500">OR URL:</span>
            <input
              type="text"
              placeholder="Paste direct image link..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 bg-transparent text-[10px] font-mono text-gray-300 focus:outline-none placeholder-gray-600"
            />
          </div>

          {error && (
            <p className="text-[9px] text-rose-400 font-mono animate-pulse">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel({
  isOpen,
  onClose,
  bookings,
  onUpdateStatus,
  onAddNotes,
  onDeleteBooking,
  onAddManualBooking,
  cmsData: propCmsData,
  onUpdateCMS: propOnUpdateCMS,
  onReplayIntro,
  dbStatus = 'connecting'
}: AdminPanelProps) {
  const [cmsData, setCmsData] = useState<CMSState>(propCmsData);

  // Sync from props if propCmsData changes externally (e.g. on Reset)
  useEffect(() => {
    setCmsData(propCmsData);
  }, [propCmsData]);

  // Debounced parent update so typing is ultra-responsive and doesn't lag the main app
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(cmsData) !== JSON.stringify(propCmsData)) {
        propOnUpdateCMS(cmsData);
      }
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [cmsData, propOnUpdateCMS, propCmsData]);

  const onUpdateCMS = (updated: CMSState) => {
    setCmsData(updated);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const tagsArray = prodTags.split(',').map(t => t.trim()).filter(Boolean);
    const existingProducts = cmsData.mascotSection?.products || [];

    if (editingProductId) {
      // Edit existing product
      const updatedProducts = existingProducts.map(p => 
        p.id === editingProductId 
          ? { 
              ...p, 
              name: prodName, 
              category: prodCategory, 
              description: prodDescription, 
              imageUrl: prodImageUrl || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300',
              tags: tagsArray 
            } 
          : p
      );
      onUpdateCMS({
        ...cmsData,
        mascotSection: {
          ...cmsData.mascotSection,
          products: updatedProducts
        }
      });
      setEditingProductId(null);
    } else {
      // Add new product
      const newProduct = {
        id: 'prod-' + Math.floor(100000 + Math.random() * 900000),
        name: prodName,
        category: prodCategory,
        description: prodDescription,
        imageUrl: prodImageUrl || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300',
        tags: tagsArray
      };
      onUpdateCMS({
        ...cmsData,
        mascotSection: {
          ...cmsData.mascotSection,
          products: [...existingProducts, newProduct]
        }
      });
    }

    // Reset form
    setProdName('');
    setProdCategory('Mascot Costume');
    setProdDescription('');
    setProdImageUrl('');
    setProdTags('');
  };

  const handleEditProductClick = (product: any) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdDescription(product.description);
    setProdImageUrl(product.imageUrl);
    setProdTags((product.tags || []).join(', '));
  };

  const handleDeleteProduct = (productId: string) => {
    const existingProducts = cmsData.mascotSection?.products || [];
    const updatedProducts = existingProducts.filter(p => p.id !== productId);
    onUpdateCMS({
      ...cmsData,
      mascotSection: {
        ...cmsData.mascotSection,
        products: updatedProducts
      }
    });
    setProductDeleteConfirmId(null);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'calendar' | 'new-booking' | 'cms' | 'products' | 'database'>('dashboard');
  const [cmsSection, setCmsSection] = useState<'global' | 'entrance' | 'navbar' | 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials' | 'contact' | 'mascots'>('global');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected booking for detailed view / edit
  const [selectedBooking, setSelectedBooking] = useState<ConsultationRequest | null>(null);
  const [adminNotesText, setAdminNotesText] = useState('');

  // Double-click safety confirm states
  const [bookingDeleteConfirmId, setBookingDeleteConfirmId] = useState<string | null>(null);
  const [serviceDeleteConfirmId, setServiceDeleteConfirmId] = useState<string | null>(null);
  const [galleryDeleteConfirmId, setGalleryDeleteConfirmId] = useState<string | null>(null);
  const [testimonialDeleteConfirmId, setTestimonialDeleteConfirmId] = useState<string | null>(null);
  const [resetConfirmActive, setResetConfirmActive] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Product state
  const [productSearch, setProductSearch] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Mascot Costume');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodTags, setProdTags] = useState('');
  const [productDeleteConfirmId, setProductDeleteConfirmId] = useState<string | null>(null);

  // New project category helper states
  const [newProjectCategory, setNewProjectCategory] = useState('Weddings');
  const [newProjectCustomCategory, setNewProjectCustomCategory] = useState('');

  // Manual booking states
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newEventType, setNewEventType] = useState(cmsData.services.items[0]?.title || 'Temple Processions (Sammy Oorvalam)');
  const [newEventDate, setNewEventDate] = useState('');
  const [newGuestCount, setNewGuestCount] = useState(150);
  const [newCatering, setNewCatering] = useState('Premium Gourmet Buffet');
  const [newDecor, setNewDecor] = useState('Regal Floral & Lighting Decor');
  const [newMessage, setNewMessage] = useState('');

  // Reset states when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Email or Password. Access Denied.');
      setPassword('');
    }
  };

  const handleSaveNotes = (id: string) => {
    onAddNotes(id, adminNotesText);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({
        ...selectedBooking,
        adminNotes: adminNotesText
      });
    }
  };

  const handleStatusChange = (id: string, status: ConsultationRequest['status']) => {
    onUpdateStatus(id, status);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({
        ...selectedBooking,
        status
      });
    }
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientEmail || !newClientPhone || !newEventDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Dynamic quote calculation
    const baseService = cmsData.services.items.find(s => s.title.toUpperCase() === newEventType.toUpperCase()) || cmsData.services.items[0];
    const basePrice = baseService ? baseService.basePrice : 25000;
    const cateringPerGuest = newCatering.includes('Gourmet') ? 1200 : 800;
    const estimatedCatering = cateringPerGuest * newGuestCount;
    const estimatedDecor = newDecor.includes('Regal') ? 250000 : 100000;
    const totalEstimate = basePrice + estimatedCatering + estimatedDecor;

    const manualBooking: ConsultationRequest = {
      id: 'SB-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Confirmed',
      fullName: newClientName,
      email: newClientEmail,
      phone: newClientPhone,
      eventType: newEventType,
      eventDate: newEventDate,
      guestCount: newGuestCount,
      message: newMessage || 'Walk-in / Phone Consultation Inquiry booked manually.',
      servicesNeeded: ['Event Styling & Theme Design', 'On-site Coordination', 'Vendor Procurement'],
      cateringOption: newCatering,
      decorationTier: newDecor,
      totalEstimatedQuote: totalEstimate,
      createdAt: new Date().toISOString().split('T')[0],
      adminNotes: 'Manually logged by Admin.'
    };

    onAddManualBooking(manualBooking);

    // Reset fields & redirect
    setNewClientName('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewEventDate('');
    setNewGuestCount(150);
    setNewMessage('');
    setActiveTab('bookings');
  };

  // Calculations for dashboard stats
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalEstimatedQuote, 0);
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length;
  
  // Group event types
  const eventTypesDistribution = bookings.reduce((acc: Record<string, number>, b) => {
    const type = b.eventType.toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Search & Filtered bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || b.eventType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  // Background presets for easy client editing
  const HERO_BACKGROUND_PRESETS = [
    { name: 'Warm Royal Golden Wedding', url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1920&auto=format&fit=crop' },
    { name: 'Traditional Procession Temple Entry', url: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?q=80&w=1920&auto=format&fit=crop' },
    { name: 'Vibrant Flower Hangings & Lighting', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop' },
    { name: 'Exotic Premium Stage Staging', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format&fit=crop' },
  ];

  const BRAND_COLOR_PRESETS = [
    { name: 'Imperial Gold Shimmer', primary: '#C58E37', secondary: '#F3E5AB' },
    { name: 'Royal Crimson Accent', primary: '#9E1A1A', secondary: '#E57373' },
    { name: 'Madurai Peacock Blue', primary: '#1A539E', secondary: '#90CAF9' },
    { name: 'Heritage Emerald Green', primary: '#1A9E58', secondary: '#A5D6A7' },
    { name: 'Modern Rose Platinum', primary: '#D4AF37', secondary: '#ECEFF1' },
  ];

  const ICON_OPTIONS = [
    'Sparkles', 'Music', 'Layers', 'Award', 'Camera', 'Heart', 
    'Mic', 'Disc', 'Coffee', 'Utensils', 'Crown', 'Flame'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-luxury-black/95 backdrop-blur-md">
      
      {/* Sidebar panel area */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`w-full ${isAuthenticated ? 'max-w-6xl' : 'max-w-md md:max-w-lg'} h-screen bg-luxury-black border-l border-gold-500/10 flex flex-col relative transition-all duration-500 ease-in-out`}
      >
        {/* Header bar */}
        <div className="border-b border-gold-500/10 py-5 px-6 md:px-8 flex items-center justify-between bg-luxury-gray">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Shield size={16} />
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold tracking-[0.25em] text-white uppercase">
                ADMIN CONSOLE
              </h2>
              <p className="text-[9px] font-mono tracking-widest text-gold-400 uppercase mt-0.5">
                Siddharth Vibe Events Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-gold-300 uppercase">ACCESS SECURED</span>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gold-400 focus:outline-none transition-colors border border-transparent hover:border-gold-500/20 rounded cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content body based on Authentication */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 text-center max-w-sm md:max-w-md mx-auto w-full">
            
            {/* Custom Logo Integration in Login Panel if exists */}
            {cmsData.navbar.logoImage ? (
              <div className="mb-4">
                <Logo 
                  size="md" 
                  showText={false}
                  logoImage={cmsData.navbar.logoImage}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400 mb-5 shadow-xl animate-pulse">
                <Lock size={22} strokeWidth={1.5} />
              </div>
            )}

            <h3 className="font-display text-base md:text-lg font-semibold tracking-wider text-white uppercase">
              AUTHENTICATION REQUIRED
            </h3>
            <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed font-sans font-light mt-2 mb-6">
              This terminal provides access to live customer consultation logs, financial estimates, and scheduler agendas.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-gold-400 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  autoComplete="username email"
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-luxury-gray/80 border border-gold-500/15 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/10 px-4 py-3 text-base md:text-sm text-white font-mono rounded-none focus:outline-none shadow-inner transition-all duration-200"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-wider text-gold-400 uppercase mb-1.5">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-luxury-gray/80 border border-gold-500/15 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/10 px-4 py-3 text-base md:text-sm text-white font-mono rounded-none focus:outline-none shadow-inner transition-all duration-200"
                  required
                />
              </div>

              {error && (
                <p className="text-[10px] font-mono text-rose-400 tracking-wider uppercase bg-rose-500/10 border border-rose-500/15 py-2 text-center rounded-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full gold-shimmer-btn py-3.5 mt-4 text-luxury-black font-semibold text-xs tracking-[0.2em] uppercase focus:outline-none cursor-pointer shadow-[0_4px_15px_rgba(197,142,55,0.15)] active:translate-y-[1px] transition-transform duration-100"
              >
                UNLOCK TERMINAL
              </button>
            </form>

            <div className="mt-8 border-t border-gold-500/10 pt-4 w-full text-center">
              <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                Authorized Siddharth Vibe Personnel Only
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-48 border-r border-gold-500/10 bg-luxury-gray flex flex-col justify-between py-6">
              <div className="flex flex-col gap-1 px-3">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'dashboard' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TrendingUp size={14} className={activeTab === 'dashboard' ? 'text-gold-300' : 'text-gray-400'} />
                  DASHBOARD
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'bookings' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers size={14} className={activeTab === 'bookings' ? 'text-gold-300' : 'text-gray-400'} />
                  BOOKINGS ({bookings.length})
                </button>

                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'calendar' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calendar size={14} className={activeTab === 'calendar' ? 'text-gold-300' : 'text-gray-400'} />
                  AGENDA CALENDAR
                </button>

                <button
                  onClick={() => setActiveTab('new-booking')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'new-booking' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Plus size={14} className={activeTab === 'new-booking' ? 'text-gold-300' : 'text-gray-400'} />
                  ADD INQUIRY
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'cms' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sliders size={14} className={activeTab === 'cms' ? 'text-gold-300' : 'text-gray-400'} />
                  LIVE SITE EDITOR
                </button>

                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === 'products' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Briefcase size={14} className={activeTab === 'products' ? 'text-gold-300' : 'text-gray-400'} />
                  MANAGE PRODUCTS
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wider font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'database' 
                      ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400 font-semibold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Database size={14} className={activeTab === 'database' ? 'text-gold-300' : 'text-gray-400'} />
                    <span>SUPABASE SYNC</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${
                    dbStatus === 'connected' ? 'bg-emerald-500' :
                    dbStatus === 'setup_required' ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
                  }`} title={`Status: ${dbStatus}`} />
                </button>
              </div>

              {/* Quick statistics signature in CRM rail */}
              <div className="px-6 text-left border-t border-gold-500/10 pt-6">
                <span className="text-[8px] font-mono text-gold-400/60 uppercase tracking-[0.2em] block">STUDIO LOCATION</span>
                <span className="text-[10px] font-medium text-gray-300 block mt-1">MADURAI, TN</span>
                <span className="text-[9px] text-gray-500 block mt-0.5">Siddharth Vibe CRM</span>
              </div>
            </div>

            {/* Main Area based on Tab selection */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: OVERVIEW DASHBOARD */}
                  {activeTab === 'dashboard' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8 text-left"
                    >
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase">
                          STUDIO METRICS SUMMARY
                        </h3>
                        <p className="text-xs text-gray-400 font-light font-sans mt-1">
                          Live snapshot of current event pipelines, conversions, and estimated sales revenue.
                        </p>
                      </div>

                      {/* Stat Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-luxury-gray border border-gold-500/10 p-5 relative shadow-md">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">TOTAL INQUIRIES</div>
                          <div className="text-2xl font-bold font-mono text-white mt-1.5">{bookings.length}</div>
                          <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
                            <TrendingUp size={10} />
                            <span>Active leads cataloged</span>
                          </p>
                        </div>

                        <div className="bg-luxury-gray border border-gold-500/10 p-5 relative shadow-md">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">ESTIMATED VALUATION</div>
                          <div className="text-2xl font-bold font-mono text-gold-300 mt-1.5">
                            ₹{totalRevenue.toLocaleString()}
                          </div>
                          <p className="text-[9px] text-gray-400 mt-1 font-sans">Sum of dynamic estimates</p>
                        </div>

                        <div className="bg-luxury-gray border border-gold-500/10 p-5 relative shadow-md">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">PENDING REVIEW</div>
                          <div className="text-2xl font-bold font-mono text-amber-400 mt-1.5">{pendingCount}</div>
                          <p className="text-[9px] text-amber-300/80 mt-1 flex items-center gap-1 font-mono">
                            <Clock size={10} />
                            <span>Awaiting immediate call</span>
                          </p>
                        </div>

                        <div className="bg-luxury-gray border border-gold-500/10 p-5 relative shadow-md">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">SECURED & COMPLETED</div>
                          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5">{confirmedCount}</div>
                          <p className="text-[9px] text-emerald-300/80 mt-1 flex items-center gap-1 font-mono">
                            <CheckCircle size={10} />
                            <span>Vibe events locked in</span>
                          </p>
                        </div>
                      </div>

                      {/* Distribution & Upcoming Highlights Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Event Category Distribution Bar Chart */}
                        <div className="lg:col-span-7 bg-luxury-gray border border-gold-500/10 p-6 relative flex flex-col justify-between">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div>
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest mb-4">
                              EVENT CAPACITIES BY CATEGORY
                            </h4>
                            <div className="space-y-4">
                              {Object.entries(eventTypesDistribution).map(([type, count]) => {
                                const percentage = bookings.length ? (count / bookings.length) * 100 : 0;
                                return (
                                  <div key={type} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono uppercase text-gray-300">
                                      <span>{type}</span>
                                      <span className="text-gold-300">{count} Events ({Math.round(percentage)}%)</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-luxury-black border border-gold-500/10 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                              {Object.keys(eventTypesDistribution).length === 0 && (
                                <p className="text-xs text-gray-500 font-mono italic text-center py-6">
                                  No data recorded yet
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-gold-500/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-gray-500">
                            <span>MADURAI DISTRICT METRICS</span>
                            <span>UPDATED SECURELY</span>
                          </div>
                        </div>

                        {/* Recent Activity Mini-Feed */}
                        <div className="lg:col-span-5 bg-luxury-gray border border-gold-500/10 p-6 relative flex flex-col justify-between">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/35" />
                          <div>
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest mb-4">
                              RECENT ACTIONS & INCOMING
                            </h4>
                            <div className="space-y-3.5">
                              {bookings.slice(0, 3).map((booking, idx) => (
                                <div key={booking.id} className="flex items-start gap-3 border-b border-gold-500/5 pb-3 last:border-b-0 last:pb-0">
                                  <div className="w-6 h-6 rounded-full border border-gold-400/20 bg-gold-500/5 flex items-center justify-center text-[10px] text-gold-400 font-mono mt-0.5 flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex justify-between items-start gap-2">
                                      <p className="text-xs font-semibold text-white truncate">{booking.fullName}</p>
                                      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 border ${
                                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                      }`}>
                                        {booking.status}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 truncate mt-0.5">
                                      {booking.eventType} on {booking.eventDate}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              {bookings.length === 0 && (
                                <p className="text-xs text-gray-500 font-mono italic text-center py-6">
                                  No inquiries logged
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveTab('bookings')}
                            className="mt-6 w-full py-2.5 bg-luxury-black hover:bg-gold-500/5 border border-gold-500/20 text-[10px] font-mono tracking-widest text-gold-400 uppercase hover:text-white transition-colors duration-300 cursor-pointer"
                          >
                            MANAGE ALL LOGS
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: INTERACTIVE BOOKINGS TABLE */}
                  {activeTab === 'bookings' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-left"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase">
                            CLIENT PORTFOLIO PIPELINE
                          </h3>
                          <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                            Filter, monitor details, modify current statuses, write logs and notes.
                          </p>
                        </div>
                      </div>

                      {/* Filters & Search Toolbar */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-luxury-gray border border-gold-500/10 p-4">
                        <div className="md:col-span-5 relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search client name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 pl-9 pr-4 py-2 text-xs text-white focus:outline-none placeholder-gray-500 font-sans"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3 py-2 text-xs text-gray-300 focus:outline-none font-sans"
                          >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in conversation">In Conversation</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="md:col-span-4">
                          <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3 py-2 text-xs text-gray-300 focus:outline-none font-sans"
                          >
                            <option value="all">All Event Types</option>
                            {cmsData.services.items.map((srv) => (
                              <option key={srv.id} value={srv.title.toLowerCase()}>
                                {srv.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Main Table / Detail Split Panel */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Interactive Inquiries List Table */}
                        <div className={`bg-luxury-gray border border-gold-500/10 overflow-hidden shadow-md ${selectedBooking ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gold-500/10 bg-luxury-black text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                                  <th className="py-3 px-4">Client</th>
                                  <th className="py-3 px-4">Category</th>
                                  <th className="py-3 px-4">Event Date</th>
                                  <th className="py-3 px-4">Quote</th>
                                  <th className="py-3 px-4 text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gold-500/5">
                                {filteredBookings.map((booking) => {
                                  const isSelected = selectedBooking?.id === booking.id;
                                  return (
                                    <tr
                                      key={booking.id}
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setAdminNotesText(booking.adminNotes || '');
                                      }}
                                      className={`text-xs hover:bg-gold-500/5 transition-colors cursor-pointer ${
                                        isSelected ? 'bg-gold-500/10 border-l-2 border-gold-400' : ''
                                      }`}
                                    >
                                      <td className="py-3 px-4">
                                        <div className="font-semibold text-white">{booking.fullName}</div>
                                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{booking.phone}</div>
                                      </td>
                                      <td className="py-3 px-4">
                                        <span className="text-[10px] font-mono text-gold-300 uppercase tracking-wider">
                                          {booking.eventType}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 font-mono text-gray-300">
                                        {booking.eventDate}
                                      </td>
                                      <td className="py-3 px-4 font-semibold text-white font-mono">
                                        ₹{booking.totalEstimatedQuote.toLocaleString()}
                                      </td>
                                      <td className="py-3 px-4 text-center">
                                        <span className={`inline-block text-[8px] font-mono uppercase px-2 py-0.5 border ${
                                          booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                          booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                          booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                          booking.status === 'In Conversation' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                          'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                        }`}>
                                          {booking.status}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}

                                {filteredBookings.length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="py-12 text-center text-xs text-gray-500 italic font-mono">
                                      No matches found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Interactive Booking Detail Sidebar Inspector */}
                        {selectedBooking && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-5 bg-luxury-gray border border-gold-500/20 p-6 relative flex flex-col justify-between shadow-2xl"
                          >
                            <div className="absolute top-0 right-0 p-3">
                              <button
                                onClick={() => setSelectedBooking(null)}
                                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 border-b border-gold-500/10 pb-4 mb-4">
                                <FileText className="text-gold-400 w-4 h-4" />
                                <h4 className="font-display text-xs font-semibold tracking-widest text-white uppercase">
                                  INSPECTION DRAWER
                                </h4>
                              </div>

                              <div className="space-y-4 text-xs font-sans">
                                <div>
                                  <label className="text-[9px] font-mono text-gray-500 uppercase">CLIENT NAME</label>
                                  <p className="text-white font-semibold text-sm mt-0.5">{selectedBooking.fullName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-500 uppercase">EMAIL ADDRESS</label>
                                    <p className="text-gray-300 mt-0.5 font-mono break-all">{selectedBooking.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-500 uppercase">PHONE NUMBER</label>
                                    <p className="text-gray-300 mt-0.5 font-mono">{selectedBooking.phone}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gold-500/5 pt-3">
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-500 uppercase">EVENT DATE</label>
                                    <p className="text-gold-300 mt-0.5 font-mono font-medium">{selectedBooking.eventDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-500 uppercase">CAPACITY LIMIT</label>
                                    <p className="text-gray-300 mt-0.5 font-mono">{selectedBooking.guestCount} Guests</p>
                                  </div>
                                </div>

                                <div className="border-t border-gold-500/5 pt-3">
                                  <label className="text-[9px] font-mono text-gray-500 uppercase">ESTIMATED VALUATION</label>
                                  <p className="text-sm font-bold text-gold-300 font-mono mt-0.5">₹{selectedBooking.totalEstimatedQuote.toLocaleString()}</p>
                                </div>

                                <div className="border-t border-gold-500/5 pt-3">
                                  <label className="text-[9px] font-mono text-gray-500 uppercase">CLIENT DESIGN VISION</label>
                                  <p className="text-gray-300 mt-1 italic leading-relaxed font-light bg-luxury-black/60 p-2.5 border border-gold-500/5">
                                    "{selectedBooking.message}"
                                  </p>
                                </div>

                                {/* Active Configuration Controls */}
                                <div className="border-t border-gold-500/10 pt-4 space-y-3">
                                  <div>
                                    <label className="text-[9px] font-mono text-gold-400 uppercase tracking-wider block mb-1.5">
                                      PIPELINE STATUS
                                    </label>
                                    <div className="grid grid-cols-3 gap-1">
                                      {(['Pending', 'In Conversation', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
                                        <button
                                          key={status}
                                          onClick={() => handleStatusChange(selectedBooking.id, status)}
                                          className={`py-1 text-[8px] font-mono uppercase border transition-colors cursor-pointer ${
                                            selectedBooking.status === status
                                              ? 'bg-gold-500/15 border-gold-400 text-gold-300 font-semibold'
                                              : 'bg-luxury-black border-gold-500/10 text-gray-400 hover:text-white'
                                          }`}
                                        >
                                          {status}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-mono text-gold-400 uppercase tracking-wider block mb-1.5">
                                      ADMIN CONSOLE MEMO
                                    </label>
                                    <textarea
                                      rows={2}
                                      placeholder="Write private details, follow-ups..."
                                      value={adminNotesText}
                                      onChange={(e) => setAdminNotesText(e.target.value)}
                                      className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 p-2 text-xs text-white placeholder-gray-600 focus:outline-none resize-none font-sans"
                                    />
                                    <button
                                      onClick={() => handleSaveNotes(selectedBooking.id)}
                                      className="mt-1.5 flex items-center gap-1 text-[9px] font-mono tracking-widest text-gold-400 hover:text-white uppercase transition-colors"
                                    >
                                      <Save size={10} /> SAVE PRIVATE MEMO
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gold-500/10 pt-4 mt-6 flex justify-between items-center">
                              <button
                                onClick={() => {
                                  if (bookingDeleteConfirmId === selectedBooking.id) {
                                    onDeleteBooking(selectedBooking.id);
                                    setSelectedBooking(null);
                                    setBookingDeleteConfirmId(null);
                                  } else {
                                    setBookingDeleteConfirmId(selectedBooking.id);
                                    setTimeout(() => setBookingDeleteConfirmId(null), 3000);
                                  }
                                }}
                                className={`text-[10px] font-mono tracking-wider flex items-center gap-1 uppercase transition-colors cursor-pointer ${
                                  bookingDeleteConfirmId === selectedBooking.id
                                    ? 'text-rose-500 font-bold animate-pulse'
                                    : 'text-rose-400/80 hover:text-rose-400'
                                }`}
                              >
                                <Trash2 size={12} /> {bookingDeleteConfirmId === selectedBooking.id ? 'CLICK AGAIN TO CONFIRM DELETE' : 'DELETE BOOKING'}
                              </button>
                              <span className="text-[8px] font-mono text-gray-500">ID: {selectedBooking.id}</span>
                            </div>
                          </motion.div>
                        )}

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: AGENDA CALENDAR */}
                  {activeTab === 'calendar' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-left"
                    >
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase">
                          STUDIO CALENDAR AGENDA
                        </h3>
                        <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                          Chronological distribution of booked elite celebrations across Tamil Nadu.
                        </p>
                      </div>

                      {/* Timeline Agenda list grouped by Month */}
                      <div className="space-y-6">
                        {bookings.length === 0 ? (
                          <div className="bg-luxury-gray border border-gold-500/10 p-12 text-center text-xs text-gray-500 italic font-mono">
                            No event dates scheduled in system.
                          </div>
                        ) : (
                          [...bookings]
                            .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
                            .map((booking) => {
                              const dateObj = new Date(booking.eventDate);
                              const formattedDate = dateObj.toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              });
                              return (
                                <div
                                  key={booking.id}
                                  className="bg-luxury-gray border border-gold-500/10 hover:border-gold-500/30 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative transition-all duration-300"
                                >
                                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-400" />
                                  
                                  <div className="pl-4 space-y-1">
                                    <div className="flex items-center gap-2 text-gold-400">
                                      <Calendar size={13} />
                                      <span className="text-xs font-mono font-medium">{formattedDate}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white tracking-wide">
                                      {booking.fullName} – {booking.eventType}
                                    </h4>
                                    <p className="text-[11px] text-gray-400 flex items-center gap-2">
                                      <Users size={11} className="text-gray-500" />
                                      <span>Capacity: {booking.guestCount} Guests</span>
                                      <span className="text-gold-500/30">|</span>
                                      <span>Catering: {booking.cateringOption}</span>
                                    </p>
                                  </div>

                                  <div className="pl-4 md:pl-0 flex flex-row md:flex-col items-start md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-gold-500/5 pt-3.5 md:pt-0 gap-2">
                                    <div className="text-right">
                                      <span className="text-[9px] font-mono text-gray-500 block uppercase">VALUATION</span>
                                      <span className="text-xs font-mono font-bold text-gold-300">
                                        ₹{booking.totalEstimatedQuote.toLocaleString()}
                                      </span>
                                    </div>

                                    <span className={`text-[8px] font-mono uppercase px-2 py-0.5 border ${
                                      booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                      booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                      booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                      {booking.status}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: ADD MANUAL INQUIRY FORM */}
                  {activeTab === 'new-booking' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-left max-w-2xl mx-auto"
                    >
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase">
                          MANUALLY SECURE INQUIRY
                        </h3>
                        <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                          Log walk-in client briefs or phone call event briefs directly into local CRM records.
                        </p>
                      </div>

                      <form onSubmit={handleCreateManualBooking} className="space-y-4 bg-luxury-gray border border-gold-500/10 p-6 md:p-8 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-400/30" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Client Full Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh Kumar"
                              value={newClientName}
                              onChange={(e) => setNewClientName(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Phone Number *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. +91 98765 43210"
                              value={newClientPhone}
                              onChange={(e) => setNewClientPhone(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. client@example.com"
                              value={newClientEmail}
                              onChange={(e) => setNewClientEmail(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Target Event Date *</label>
                            <input
                              type="date"
                              required
                              value={newEventDate}
                              onChange={(e) => setNewEventDate(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-white focus:outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Event Category</label>
                            <select
                              value={newEventType}
                              onChange={(e) => setNewEventType(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-gray-300 focus:outline-none"
                            >
                              {cmsData.services.items.map((srv) => (
                                <option key={srv.id} value={srv.title}>
                                  {srv.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Expected Guest Capacity ({newGuestCount})</label>
                            <input
                              type="range"
                              min="50"
                              max="3000"
                              step="50"
                              value={newGuestCount}
                              onChange={(e) => setNewGuestCount(Number(e.target.value))}
                              className="w-full accent-gold-400 bg-luxury-black h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Decor Tier preference</label>
                            <select
                              value={newDecor}
                              onChange={(e) => setNewDecor(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-gray-300 focus:outline-none"
                            >
                              <option value="Regal Floral & Lighting Decor">Regal Floral & Lighting (Premium)</option>
                              <option value="Classic Elegance Theme">Classic Elegance (Standard)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Catering Tier preference</label>
                            <select
                              value={newCatering}
                              onChange={(e) => setNewCatering(e.target.value)}
                              className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 px-3.5 py-2 text-xs text-gray-300 focus:outline-none"
                            >
                              <option value="Premium Gourmet Buffet">Premium Gourmet Buffet (₹1,200/head)</option>
                              <option value="Deluxe Traditional Meal">Deluxe Traditional Meal (₹800/head)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Consultation Event brief / Message</label>
                          <textarea
                            rows={3}
                            placeholder="Write event layout notes, unique items requested..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full bg-luxury-black border border-gold-500/15 focus:border-gold-400 p-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full gold-shimmer-btn py-3 mt-4 text-luxury-black font-semibold text-xs tracking-widest uppercase focus:outline-none cursor-pointer"
                        >
                          PROVISION BOOKING RECORD
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* TAB 5: CMS SITE CONTENT EDITOR */}
                  {activeTab === 'cms' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-left"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase">
                            LIVE SITE CMS EDITOR
                          </h3>
                          <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                            Modify styles, text copy, service catalogs, layouts, and review listings in real-time.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (resetConfirmActive) {
                                localStorage.removeItem('siddharth_vibe_cms_content');
                                localStorage.removeItem('siddharth_vibe_cms_data');
                                window.location.reload();
                              } else {
                                setResetConfirmActive(true);
                                setTimeout(() => setResetConfirmActive(false), 3000);
                              }
                            }}
                            className={`px-3 py-1.5 border text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                              resetConfirmActive
                                ? 'border-red-500 bg-red-950/40 text-red-400 animate-pulse font-bold'
                                : 'border-rose-500/30 hover:border-rose-500 text-rose-400 bg-rose-950/20'
                            }`}
                          >
                            {resetConfirmActive ? 'CLICK AGAIN TO RESTORE DEFAULTS' : 'RESTORE TEMPLATE DEFAULTS'}
                          </button>
                        </div>
                      </div>

                      {/* Section Navigation Pills */}
                      <div className="flex flex-wrap gap-1.5 border-b border-gold-500/10 pb-3">
                        {([
                          { id: 'global', label: 'Theme & Fonts', icon: Palette },
                          { id: 'entrance', label: 'Entrance Intro', icon: Sparkles },
                          { id: 'navbar', label: 'Navbar', icon: Compass },
                          { id: 'hero', label: 'Hero Cover', icon: ImageIcon },
                          { id: 'about', label: 'About Us', icon: Type },
                          { id: 'services', label: 'Services', icon: Briefcase },
                          { id: 'portfolio', label: 'Portfolio Grid', icon: Sliders },
                          { id: 'mascots', label: 'Mascot Section', icon: Award },
                          { id: 'testimonials', label: 'Client Reviews', icon: MessageSquare },
                          { id: 'contact', label: 'Contact Coordinates', icon: Settings },
                        ] as const).map((sec) => {
                          const Icon = sec.icon;
                          const isActive = cmsSection === sec.id;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => setCmsSection(sec.id)}
                              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono tracking-widest uppercase border transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-gold-500/15 border-gold-400 text-gold-300 font-semibold'
                                  : 'bg-luxury-gray/40 border-gold-500/10 text-gray-400 hover:text-white hover:bg-luxury-gray'
                              }`}
                            >
                              <Icon size={12} />
                              {sec.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-luxury-gray border border-gold-500/10 p-6 md:p-8 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-400/35" />

                        {/* SECTION 1: GLOBAL STYLING */}
                        {cmsSection === 'global' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Palette size={14} /> BRAND STYLING & PALETTE PRESETS
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Dark Mode vs Light Mode */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  VISUAL INTERFACE STYLE MODE
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                                    onClick={() => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        globalSettings: {
                                          ...cmsData.globalSettings,
                                          isDarkMode: true
                                        }
                                      });
                                    }}
                                    className={`py-2 text-xs font-mono uppercase border transition-colors cursor-pointer ${
                                      cmsData.globalSettings.isDarkMode
                                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 font-bold'
                                        : 'bg-luxury-black border-gold-500/10 text-gray-400'
                                    }`}
                                  >
                                    🌌 COSMIC OBSIDIAN (DARK)
                                  </button>
                                  <button
                                    onClick={() => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        globalSettings: {
                                          ...cmsData.globalSettings,
                                          isDarkMode: false
                                        }
                                      });
                                    }}
                                    className={`py-2 text-xs font-mono uppercase border transition-colors cursor-pointer ${
                                      !cmsData.globalSettings.isDarkMode
                                        ? 'bg-gold-500/15 border-gold-400 text-gold-300 font-bold'
                                        : 'bg-luxury-black border-gold-500/10 text-gray-400'
                                    }`}
                                  >
                                    👑 ROYAL CREAM (LIGHT)
                                  </button>
                                </div>
                                <p className="text-[10px] text-gray-500 font-sans italic mt-1">
                                  Cosmic Obsidian sets an eye-safe deep slate background. Royal Cream triggers high-contrast ivory, ideal for daytime demonstrations.
                                </p>
                              </div>

                              {/* Palette Preset Quick selector */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  ACCENT PALETTE PRESETS
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                                  {BRAND_COLOR_PRESETS.map((preset) => (
                                    <button
                                      key={preset.name}
                                      onClick={() => {
                                        onUpdateCMS({
                                          ...cmsData,
                                          globalSettings: {
                                            ...cmsData.globalSettings,
                                            primaryColor: preset.primary,
                                            secondaryColor: preset.secondary
                                          }
                                        });
                                      }}
                                      className="bg-luxury-black border border-gold-500/10 hover:border-gold-400 p-2 text-left transition-all duration-300 rounded cursor-pointer"
                                    >
                                      <div className="text-[9px] font-mono font-medium text-white truncate uppercase">{preset.name}</div>
                                      <div className="flex gap-1 mt-1">
                                        <div className="w-4 h-2" style={{ backgroundColor: preset.primary }} />
                                        <div className="w-4 h-2" style={{ backgroundColor: preset.secondary }} />
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gold-500/10 pt-4">
                              {/* Custom Accent Colors */}
                              <div className="space-y-3">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  CUSTOM BRAND OVERRIDES
                                </label>
                                <div className="flex items-center gap-4">
                                  <div className="flex-1 space-y-1">
                                    <span className="text-[9px] font-mono text-gray-500 block">PRIMARY GLOW ACCENT</span>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="color"
                                        value={cmsData.globalSettings.primaryColor}
                                        onChange={(e) => {
                                          onUpdateCMS({
                                            ...cmsData,
                                            globalSettings: {
                                              ...cmsData.globalSettings,
                                              primaryColor: e.target.value
                                            }
                                          });
                                        }}
                                        className="w-8 h-8 rounded border border-gold-500/20 bg-transparent cursor-pointer"
                                      />
                                      <input
                                        type="text"
                                        value={cmsData.globalSettings.primaryColor}
                                        onChange={(e) => {
                                          onUpdateCMS({
                                            ...cmsData,
                                            globalSettings: {
                                              ...cmsData.globalSettings,
                                              primaryColor: e.target.value
                                            }
                                          });
                                        }}
                                        className="flex-grow bg-luxury-black border border-gold-500/15 p-1.5 text-xs text-white font-mono uppercase"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex-1 space-y-1">
                                    <span className="text-[9px] font-mono text-gray-500 block">SECONDARY SUB-GLOW</span>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="color"
                                        value={cmsData.globalSettings.secondaryColor}
                                        onChange={(e) => {
                                          onUpdateCMS({
                                            ...cmsData,
                                            globalSettings: {
                                              ...cmsData.globalSettings,
                                              secondaryColor: e.target.value
                                            }
                                          });
                                        }}
                                        className="w-8 h-8 rounded border border-gold-500/20 bg-transparent cursor-pointer"
                                      />
                                      <input
                                        type="text"
                                        value={cmsData.globalSettings.secondaryColor}
                                        onChange={(e) => {
                                          onUpdateCMS({
                                            ...cmsData,
                                            globalSettings: {
                                              ...cmsData.globalSettings,
                                              secondaryColor: e.target.value
                                            }
                                          });
                                        }}
                                        className="flex-grow bg-luxury-black border border-gold-500/15 p-1.5 text-xs text-white font-mono uppercase"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Typography Engine options */}
                              <div className="space-y-3">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  TYPOGRAPHY FONTS SELECTOR
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono text-gray-500 block">DISPLAY HEADINGS</span>
                                    <select
                                      value={cmsData.globalSettings.headingFont}
                                      onChange={(e) => {
                                        onUpdateCMS({
                                          ...cmsData,
                                          globalSettings: {
                                            ...cmsData.globalSettings,
                                            headingFont: e.target.value as any
                                          }
                                        });
                                      }}
                                      className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                    >
                                      <option value="cinzel">Cinzel (Luxury Serif)</option>
                                      <option value="serif">Cormorant Garamond (Classical)</option>
                                      <option value="sans-serif">Inter Grotesque (Modern Swiss)</option>
                                    </select>
                                  </div>

                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono text-gray-500 block">BODY & DETAILS</span>
                                    <select
                                      value={cmsData.globalSettings.bodyFont}
                                      onChange={(e) => {
                                        onUpdateCMS({
                                          ...cmsData,
                                          globalSettings: {
                                            ...cmsData.globalSettings,
                                            bodyFont: e.target.value as any
                                          }
                                        });
                                      }}
                                      className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                    >
                                      <option value="sans-serif">Inter (Highly Legible Sans)</option>
                                      <option value="serif">Cormorant Garamond (Elegant Serif)</option>
                                      <option value="mono">JetBrains Mono (Technical Monospace)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Entrance Animation Trigger Section */}
                            {onReplayIntro && (
                              <div className="border-t border-gold-500/10 pt-5 mt-5 space-y-3">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  PREMIUM WEBSITE ENTRANCE
                                </label>
                                <p className="text-[9px] text-gray-500 font-sans">
                                  We have implemented a high-end, immersive golden entrance loader featuring your custom logo, cinematic particle dusts, and elegant tracking reveal animation. Click below to experience the website's royal opening sequence.
                                </p>
                                <button
                                  type="button"
                                  onClick={onReplayIntro}
                                  className="gold-shimmer-btn text-luxury-black text-[10px] font-mono font-bold tracking-widest py-2.5 px-5 uppercase focus:outline-none hover:shadow-[0_0_15px_rgba(197,142,55,0.3)] transition-all cursor-pointer flex items-center gap-2"
                                >
                                  <ImageIcon size={14} /> REPLAY CINEMATIC INTRO
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* SECTION: ENTRANCE INTRO */}
                        {cmsSection === 'entrance' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Sparkles size={14} /> LUXURY ENTRANCE INTRO LOADER
                            </h4>

                            <p className="text-xs text-gray-400 font-sans leading-relaxed">
                              Configure the cinematic website introduction animation. This sequence features high-end golden dust, spinning geometric rings, and dynamic tracking text layouts for premium brand recognition.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Entrance Heading</label>
                                <input
                                  type="text"
                                  value={cmsData.entranceSettings?.heading ?? ""}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      entranceSettings: { 
                                        ...(cmsData.entranceSettings || { heading: "", subtext: "", tagline: "", durationSeconds: 1.2, showSkipButton: true }), 
                                        heading: e.target.value 
                                      }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Entrance Subtext</label>
                                <input
                                  type="text"
                                  value={cmsData.entranceSettings?.subtext ?? ""}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      entranceSettings: { 
                                        ...(cmsData.entranceSettings || { heading: "", subtext: "", tagline: "", durationSeconds: 1.2, showSkipButton: true }), 
                                        subtext: e.target.value 
                                      }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Entrance Bottom Tagline</label>
                                <input
                                  type="text"
                                  value={cmsData.entranceSettings?.tagline ?? ""}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      entranceSettings: { 
                                        ...(cmsData.entranceSettings || { heading: "", subtext: "", tagline: "", durationSeconds: 1.2, showSkipButton: true }), 
                                        tagline: e.target.value 
                                      }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">Loading Duration (seconds)</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    max="8.0"
                                    value={cmsData.entranceSettings?.durationSeconds ?? 1.2}
                                    onChange={(e) => {
                                      const val = parseFloat(e.target.value) || 1.2;
                                      onUpdateCMS({
                                        ...cmsData,
                                        entranceSettings: { 
                                          ...(cmsData.entranceSettings || { heading: "", subtext: "", tagline: "", durationSeconds: 1.2, showSkipButton: true }), 
                                          durationSeconds: val 
                                        }
                                      });
                                    }}
                                    className="w-24 bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none"
                                  />
                                  <span className="text-[10px] text-gray-500 font-mono">Recommended: 1.0 - 2.0s</span>
                                </div>
                              </div>

                              <div className="space-y-1 flex flex-col justify-center">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block mb-1">Interactive Elements</label>
                                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={cmsData.entranceSettings?.showSkipButton !== false}
                                    onChange={(e) => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        entranceSettings: { 
                                          ...(cmsData.entranceSettings || { heading: "", subtext: "", tagline: "", durationSeconds: 1.2, showSkipButton: true }), 
                                          showSkipButton: e.target.checked 
                                        }
                                      });
                                    }}
                                    className="accent-gold-500"
                                  />
                                  <span>Show "Skip Intro" Button</span>
                                </label>
                              </div>
                            </div>

                            {/* Entrance Animation Trigger Section */}
                            {onReplayIntro && (
                              <div className="border-t border-gold-500/10 pt-5 mt-5 space-y-3">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                  PREVIEW CINEMATIC EXPERIENCE
                                </label>
                                <p className="text-[9px] text-gray-500 font-sans">
                                  Click below to replay the opening sequence and see your custom changes instantly.
                                </p>
                                <button
                                  type="button"
                                  onClick={onReplayIntro}
                                  className="gold-shimmer-btn text-luxury-black text-[10px] font-mono font-bold tracking-widest py-2.5 px-5 uppercase focus:outline-none hover:shadow-[0_0_15px_rgba(197,142,55,0.3)] transition-all cursor-pointer flex items-center gap-2"
                                >
                                  <Sparkles size={14} /> REPLAY CINEMATIC INTRO
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* SECTION 2: NAVBAR */}
                        {cmsSection === 'navbar' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Compass size={14} /> HEADER NAVIGATION BAR SETTINGS
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Logo Title Text</label>
                                <input
                                  type="text"
                                  value={cmsData.navbar.logoText}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      navbar: { ...cmsData.navbar, logoText: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Logo Subheading/Tagline</label>
                                <input
                                  type="text"
                                  value={cmsData.navbar.logoSubtext}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      navbar: { ...cmsData.navbar, logoSubtext: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gold-500/10 pt-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Header CTA button label</label>
                                <input
                                  type="text"
                                  value={cmsData.navbar.ctaText}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      navbar: { ...cmsData.navbar, ctaText: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">Sticky behavior state</label>
                                <button
                                  onClick={() => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      navbar: { ...cmsData.navbar, isSticky: !cmsData.navbar.isSticky }
                                    });
                                  }}
                                  className={`w-full py-2 text-xs font-mono uppercase border transition-colors cursor-pointer ${
                                    cmsData.navbar.isSticky
                                      ? 'bg-gold-500/15 border-gold-400 text-gold-300 font-bold'
                                      : 'bg-luxury-black border-gold-500/10 text-gray-400'
                                  }`}
                                >
                                  {cmsData.navbar.isSticky ? '● STICKY HEADER ACTIVE' : '○ STATIC HEADER OVERLAY'}
                                </button>
                              </div>
                            </div>

                            {/* Logo Image Option */}
                            <div className="border-t border-gold-500/10 pt-4">
                              <ImageUploader
                                label="Custom Logo Image"
                                value={cmsData.navbar.logoImage || ''}
                                onChange={(val) => {
                                  onUpdateCMS({
                                    ...cmsData,
                                    navbar: { ...cmsData.navbar, logoImage: val || undefined }
                                  });
                                }}
                                idPrefix="logo"
                              />
                              <p className="text-[8px] text-gray-500 font-sans mt-1">
                                Upload your company logo or provide a web URL to override and replace the default text & crown graphic logo.
                              </p>
                            </div>

                            {/* Navigation Links custom labels */}
                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">NAVIGATION HEADER LINK LABELS</label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {cmsData.navbar.links.map((link) => (
                                  <div key={link.id} className="space-y-1 bg-luxury-gray/30 p-2.5 border border-gold-500/5">
                                    <span className="text-[8px] font-mono text-gray-500 uppercase">{link.id} Destination</span>
                                    <input
                                      type="text"
                                      value={link.label}
                                      onChange={(e) => {
                                        const updatedLinks = cmsData.navbar.links.map(l => l.id === link.id ? { ...l, label: e.target.value.toUpperCase() } : l);
                                        onUpdateCMS({
                                          ...cmsData,
                                          navbar: { ...cmsData.navbar, links: updatedLinks }
                                        });
                                      }}
                                      className="w-full bg-luxury-black border border-gold-500/15 px-2 py-1 text-xs text-white focus:outline-none uppercase"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 3: HERO COVER */}
                        {cmsSection === 'hero' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <ImageIcon size={14} /> HERO BACKGROUND & DISPLAY HEADLINES
                            </h4>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Main Headline (H1)</label>
                                <textarea
                                  rows={2}
                                  value={cmsData.hero.headline}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      hero: { ...cmsData.hero, headline: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Top Accent Tagline 1</label>
                                  <input
                                    type="text"
                                    value={cmsData.hero.taglineLine1}
                                    onChange={(e) => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        hero: { ...cmsData.hero, taglineLine1: e.target.value }
                                      });
                                    }}
                                    className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Top Accent Tagline 2</label>
                                  <input
                                    type="text"
                                    value={cmsData.hero.taglineLine2}
                                    onChange={(e) => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        hero: { ...cmsData.hero, taglineLine2: e.target.value }
                                      });
                                    }}
                                    className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Subheadline / Narrative description</label>
                                <textarea
                                  rows={2}
                                  value={cmsData.hero.subheadline}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      hero: { ...cmsData.hero, subheadline: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="border-t border-gold-500/10 pt-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Hero Presets */}
                                <div className="space-y-2">
                                  <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">Background Presets</label>
                                  <div className="space-y-1.5">
                                    {HERO_BACKGROUND_PRESETS.map((preset) => (
                                      <button
                                        key={preset.name}
                                        onClick={() => {
                                          onUpdateCMS({
                                            ...cmsData,
                                            hero: { ...cmsData.hero, imageUrl: preset.url }
                                          });
                                        }}
                                        className={`w-full text-left p-1.5 border flex items-center gap-3 transition-all cursor-pointer ${
                                          cmsData.hero.imageUrl === preset.url
                                            ? 'border-gold-400 bg-gold-500/5'
                                            : 'border-gold-500/10 bg-luxury-black'
                                        }`}
                                      >
                                        <img src={preset.url} alt="" className="w-8 h-8 object-cover rounded" />
                                        <span className="text-[10px] font-mono text-gray-300 truncate">{preset.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Custom Cover Image and Opacity */}
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <ImageUploader
                                       label="Cover Background Image"
                                       value={cmsData.hero.imageUrl}
                                       onChange={(val) => {
                                         onUpdateCMS({
                                           ...cmsData,
                                           hero: { ...cmsData.hero, imageUrl: val }
                                         });
                                       }}
                                       idPrefix="hero-cover"
                                     />

                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                                      Cover Backdrop Overlay Opacity ({(cmsData.hero.overlayOpacity).toFixed(0)}%)
                                    </label>
                                    <input
                                      type="range"
                                      min="10"
                                      max="95"
                                      step="5"
                                      value={cmsData.hero.overlayOpacity}
                                      onChange={(e) => {
                                        onUpdateCMS({
                                          ...cmsData,
                                          hero: { ...cmsData.hero, overlayOpacity: Number(e.target.value) }
                                        });
                                      }}
                                      className="w-full accent-gold-400 bg-luxury-black h-1.5 rounded-lg appearance-none cursor-pointer"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gold-500/10 pt-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Primary Button CTA text</label>
                                  <input
                                    type="text"
                                    value={cmsData.hero.cta1Text}
                                    onChange={(e) => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        hero: { ...cmsData.hero, cta1Text: e.target.value }
                                      });
                                    }}
                                    className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Secondary Button CTA text</label>
                                  <input
                                    type="text"
                                    value={cmsData.hero.cta2Text}
                                    onChange={(e) => {
                                      onUpdateCMS({
                                        ...cmsData,
                                        hero: { ...cmsData.hero, cta2Text: e.target.value }
                                      });
                                    }}
                                    className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 4: ABOUT US */}
                        {cmsSection === 'about' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Type size={14} /> ABOUT STUDIO DESCRIPTIONS & COUNTERS
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section Heading Title</label>
                                <input
                                  type="text"
                                  value={cmsData.about.heading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, heading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Secondary Title Header</label>
                                <input
                                  type="text"
                                  value={cmsData.about.title}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, title: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Primary descriptive paragraph</label>
                                <textarea
                                  rows={2}
                                  value={cmsData.about.description1}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, description1: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Secondary narrative summary</label>
                                <textarea
                                  rows={2}
                                  value={cmsData.about.description2}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, description2: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gold-500/10 pt-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Director Signature name</label>
                                <input
                                  type="text"
                                  value={cmsData.about.signatureName}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, signatureName: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Director Signature subtitle/role</label>
                                <input
                                  type="text"
                                  value={cmsData.about.signatureRole}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      about: { ...cmsData.about, signatureRole: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Stats Counters Grid */}
                            <div className="border-t border-gold-500/10 pt-4 space-y-3">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">STUDIO STATS METRICS</label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {cmsData.about.stats.map((stat, idx) => (
                                  <div key={idx} className="bg-luxury-black border border-gold-500/10 p-3 space-y-2">
                                    <div className="text-[8px] font-mono text-gold-400/50">COUNTER #{idx + 1}</div>
                                    <div className="space-y-1">
                                      <span className="text-[8px] font-mono text-gray-500 block">VALUE</span>
                                      <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => {
                                          const updatedStats = [...cmsData.about.stats];
                                          updatedStats[idx] = { ...stat, value: e.target.value };
                                          onUpdateCMS({ ...cmsData, about: { ...cmsData.about, stats: updatedStats } });
                                        }}
                                        className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1 text-xs text-white focus:outline-none font-mono"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <span className="text-[8px] font-mono text-gray-500 block">LABEL</span>
                                      <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => {
                                          const updatedStats = [...cmsData.about.stats];
                                          updatedStats[idx] = { ...stat, label: e.target.value };
                                          onUpdateCMS({ ...cmsData, about: { ...cmsData.about, stats: updatedStats } });
                                        }}
                                        className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1 text-[10px] text-gray-300 focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* About Us Showcase Images */}
                            <div className="border-t border-gold-500/10 pt-4 space-y-4">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">ABOUT US SHOWCASE IMAGES (3 IMAGES)</label>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[0, 1, 2].map((idx) => (
                                  <ImageUploader
                                    key={idx}
                                    label={`Showcase Image #${idx + 1}`}
                                    value={cmsData.about.images[idx] || ''}
                                    onChange={(val) => {
                                      const updatedImages = [...cmsData.about.images];
                                      updatedImages[idx] = val;
                                      onUpdateCMS({
                                        ...cmsData,
                                        about: {
                                          ...cmsData.about,
                                          images: updatedImages
                                        }
                                      });
                                    }}
                                    idPrefix={`about-img-${idx}`}
                                  />
                                ))}
                              </div>
                            </div>

                          </div>
                        )}

                        {/* SECTION 5: SERVICES */}
                        {cmsSection === 'services' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex justify-between items-center">
                              <span className="flex items-center gap-2"><Briefcase size={14} /> SERVICE CATALOGS MANAGER</span>
                              <button
                                onClick={() => {
                                  const newItem: ServiceCard = {
                                    id: 'srv-' + Date.now(),
                                    title: 'Special Celebration Arrangement',
                                    description: 'Spectacular entry setups and decor with professional coordinates customized entirely from scratch.',
                                    basePrice: 45000,
                                    features: ['Traditional Tamil folk background', 'Premium LED backdrops'],
                                    iconName: 'Sparkles',
                                    detailText: 'Spectacular entry setups and decor with professional coordinates customized entirely from scratch.'
                                  };
                                  onUpdateCMS({
                                    ...cmsData,
                                    services: {
                                      ...cmsData.services,
                                      items: [...cmsData.services.items, newItem]
                                    }
                                  });
                                }}
                                className="px-2.5 py-1 bg-gold-500 hover:bg-gold-400 text-luxury-black font-semibold text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Plus size={10} /> ADD NEW SERVICE
                              </button>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section title heading</label>
                                <input
                                  type="text"
                                  value={cmsData.services.heading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      services: { ...cmsData.services, heading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section subheading tagline</label>
                                <input
                                  type="text"
                                  value={cmsData.services.subheading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      services: { ...cmsData.services, subheading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Service catalog accordion listings */}
                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">CATALOG SERVICES ({cmsData.services.items.length})</label>
                              
                              <div className="grid grid-cols-1 gap-3.5 max-h-[400px] overflow-y-auto pr-2">
                                {cmsData.services.items.map((item, idx) => (
                                  <div key={item.id} className="bg-luxury-black border border-gold-500/10 hover:border-gold-500/30 p-4 space-y-3 relative transition-all">
                                    <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
                                      <button
                                        onClick={() => {
                                          if (serviceDeleteConfirmId === item.id) {
                                            const updated = cmsData.services.items.filter(s => s.id !== item.id);
                                            onUpdateCMS({ ...cmsData, services: { ...cmsData.services, items: updated } });
                                            setServiceDeleteConfirmId(null);
                                          } else {
                                            setServiceDeleteConfirmId(item.id);
                                            setTimeout(() => setServiceDeleteConfirmId(null), 3000);
                                          }
                                        }}
                                        className={`p-1 transition-colors flex items-center gap-1 text-[9px] font-mono ${
                                          serviceDeleteConfirmId === item.id
                                            ? 'text-rose-500 font-bold animate-pulse bg-rose-950/20 px-1.5'
                                            : 'text-gray-500 hover:text-rose-400'
                                        }`}
                                        title="Delete listing"
                                      >
                                        <Trash2 size={13} />
                                        {serviceDeleteConfirmId === item.id && <span>Confirm?</span>}
                                      </button>
                                      <span className="text-[8px] font-mono text-gray-600">#{idx + 1}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                      <div className="md:col-span-4 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Service Name</span>
                                        <input
                                          type="text"
                                          value={item.title}
                                          onChange={(e) => {
                                            const updated = cmsData.services.items.map(s => s.id === item.id ? { ...s, title: e.target.value } : s);
                                            onUpdateCMS({ ...cmsData, services: { ...cmsData.services, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-3 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Base Price (₹)</span>
                                        <input
                                          type="number"
                                          value={item.basePrice}
                                          onChange={(e) => {
                                            const updated = cmsData.services.items.map(s => s.id === item.id ? { ...s, basePrice: Number(e.target.value) } : s);
                                            onUpdateCMS({ ...cmsData, services: { ...cmsData.services, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white font-mono focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-3 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Icon Ornament</span>
                                        <select
                                          value={item.iconName}
                                          onChange={(e) => {
                                            const updated = cmsData.services.items.map(s => s.id === item.id ? { ...s, iconName: e.target.value } : s);
                                            onUpdateCMS({ ...cmsData, services: { ...cmsData.services, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-[10px] text-gray-300 focus:outline-none"
                                        >
                                          {ICON_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[8px] font-mono text-gray-500 uppercase">Service Description Copy</span>
                                      <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => {
                                          const updated = cmsData.services.items.map(s => s.id === item.id ? { ...s, description: e.target.value } : s);
                                          onUpdateCMS({ ...cmsData, services: { ...cmsData.services, items: updated } });
                                        }}
                                        className="w-full bg-luxury-gray border border-gold-500/15 px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 6: PORTFOLIO GRID */}
                        {cmsSection === 'portfolio' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <span className="flex items-center gap-2"><Sliders size={14} /> PORTFOLIO PROJECTS GALLERY</span>
                              
                              <div className="flex flex-wrap items-center gap-2 bg-luxury-black/60 p-1.5 border border-gold-500/10 rounded">
                                <span className="text-[9px] text-gray-400 font-mono">NEW PROJECT CATEGORY:</span>
                                <select
                                  value={newProjectCategory}
                                  onChange={(e) => setNewProjectCategory(e.target.value)}
                                  className="bg-luxury-gray border border-gold-500/20 px-2 py-1 text-[10px] text-white font-mono focus:outline-none focus:border-gold-400"
                                >
                                  <option value="Weddings">Weddings</option>
                                  <option value="Corporate Events">Corporate Events</option>
                                  <option value="Birthdays">Birthdays</option>
                                  <option value="Catering">Catering</option>
                                  <option value="TEMPLE">Temple / Processions</option>
                                  <option value="Mascots">Mascots & Costumes</option>
                                  <option value="Music & Dance">Music & Folk Dance</option>
                                  <option value="Custom">Custom...</option>
                                </select>
                                
                                {newProjectCategory === 'Custom' && (
                                  <input
                                    type="text"
                                    placeholder="Enter Category Name..."
                                    value={newProjectCustomCategory}
                                    onChange={(e) => setNewProjectCustomCategory(e.target.value)}
                                    className="bg-luxury-gray border border-gold-500/20 px-2 py-1 text-[10px] text-white font-mono focus:outline-none focus:border-gold-400 w-32"
                                  />
                                )}

                                <button
                                  onClick={() => {
                                    const finalCategory = newProjectCategory === 'Custom' 
                                      ? (newProjectCustomCategory.trim() || 'Custom') 
                                      : newProjectCategory;
                                    
                                    const newItem: GalleryItem = {
                                      id: 'gal-' + Date.now(),
                                      category: finalCategory,
                                      title: `New ${finalCategory} Event Showcase`,
                                      imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?q=80&w=1200&auto=format&fit=crop',
                                      location: 'Madurai, Tamil Nadu',
                                      date: new Date().toISOString().slice(0, 7), // YYYY-MM
                                      details: 'Enter high-quality custom event details here...'
                                    };
                                    onUpdateCMS({
                                      ...cmsData,
                                      gallery: { ...cmsData.gallery, items: [...cmsData.gallery.items, newItem] }
                                    });
                                    // Reset custom input if used
                                    if (newProjectCategory === 'Custom') {
                                      setNewProjectCustomCategory('');
                                    }
                                  }}
                                  className="px-2.5 py-1.5 bg-gold-500 hover:bg-gold-400 text-luxury-black font-semibold text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Plus size={10} /> ADD GALLERY PROJECT
                                </button>
                              </div>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Gallery Layout Grid Style</label>
                                <select
                                  value={cmsData.gallery.layout}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      gallery: { ...cmsData.gallery, layout: e.target.value as any }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 p-2 text-xs text-white focus:outline-none font-mono"
                                >
                                  <option value="grid">Grid (Elegant Rows)</option>
                                  <option value="slider">Slider Carousel (Breathtaking Focus)</option>
                                  <option value="masonry">Masonry (Fluid Organic Heights)</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section title heading</label>
                                <input
                                  type="text"
                                  value={cmsData.gallery.heading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      gallery: { ...cmsData.gallery, heading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section subheading tagline</label>
                                <input
                                  type="text"
                                  value={cmsData.gallery.description}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      gallery: { ...cmsData.gallery, description: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Gallery List items */}
                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">GALLERY PORTFOLIO LOG ({cmsData.gallery.items.length})</label>
                              <div className="grid grid-cols-1 gap-3.5 max-h-[350px] overflow-y-auto pr-2">
                                {cmsData.gallery.items.map((item, idx) => (
                                  <div key={item.id} className="bg-luxury-black border border-gold-500/10 p-4 space-y-3 relative">
                                    <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
                                      <button
                                        onClick={() => {
                                          if (galleryDeleteConfirmId === item.id) {
                                            const updated = cmsData.gallery.items.filter(g => g.id !== item.id);
                                            onUpdateCMS({ ...cmsData, gallery: { ...cmsData.gallery, items: updated } });
                                            setGalleryDeleteConfirmId(null);
                                          } else {
                                            setGalleryDeleteConfirmId(item.id);
                                            setTimeout(() => setGalleryDeleteConfirmId(null), 3000);
                                          }
                                        }}
                                        className={`p-1 transition-colors flex items-center gap-1 text-[9px] font-mono ${
                                          galleryDeleteConfirmId === item.id
                                            ? 'text-rose-500 font-bold animate-pulse bg-rose-950/20 px-1.5'
                                            : 'text-gray-500 hover:text-rose-400'
                                        }`}
                                      >
                                        <Trash2 size={13} />
                                        {galleryDeleteConfirmId === item.id && <span>Confirm?</span>}
                                      </button>
                                      <span className="text-[8px] font-mono text-gray-600">#{idx + 1}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                      <div className="md:col-span-4 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase font-light">Project Title</span>
                                        <input
                                          type="text"
                                          value={item.title}
                                          onChange={(e) => {
                                            const updated = cmsData.gallery.items.map(g => g.id === item.id ? { ...g, title: e.target.value } : g);
                                            onUpdateCMS({ ...cmsData, gallery: { ...cmsData.gallery, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-3 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase font-light">Location</span>
                                        <input
                                          type="text"
                                          value={item.location}
                                          onChange={(e) => {
                                            const updated = cmsData.gallery.items.map(g => g.id === item.id ? { ...g, location: e.target.value } : g);
                                            onUpdateCMS({ ...cmsData, gallery: { ...cmsData.gallery, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-12 space-y-1 mt-2">
                                        <ImageUploader
                                          label="Project Event Image"
                                          value={item.imageUrl}
                                          onChange={(val) => {
                                            const updated = cmsData.gallery.items.map(g => g.id === item.id ? { ...g, imageUrl: val } : g);
                                            onUpdateCMS({ ...cmsData, gallery: { ...cmsData.gallery, items: updated } });
                                          }}
                                          idPrefix={`gal-item-${item.id}`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 7: TESTIMONIALS */}
                        {cmsSection === 'testimonials' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex justify-between items-center">
                              <span className="flex items-center gap-2"><MessageSquare size={14} /> CLIENT TESTIMONIALS & RATING SYSTEM</span>
                              <button
                                onClick={() => {
                                  const newItem = {
                                    id: 'test-' + Date.now(),
                                    name: 'Suresh & Malini',
                                    role: 'Corporate Hosts',
                                    event: 'Acoustic Violin Festival',
                                    comment: 'Outstanding! The stage details, floral arrangements, and traditional Theyyam dancers completely transformed our events.',
                                    rating: 5
                                  };
                                  onUpdateCMS({
                                    ...cmsData,
                                    testimonials: { ...cmsData.testimonials, items: [...cmsData.testimonials.items, newItem] }
                                  });
                                }}
                                className="px-2.5 py-1 bg-gold-500 hover:bg-gold-400 text-luxury-black font-semibold text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Plus size={10} /> ADD REVIEW
                              </button>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section Heading</label>
                                <input
                                  type="text"
                                  value={cmsData.testimonials.heading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      testimonials: { ...cmsData.testimonials, heading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Section Subtitle</label>
                                <input
                                  type="text"
                                  value={cmsData.testimonials.subheading}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      testimonials: { ...cmsData.testimonials, subheading: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Reviews Accordion management */}
                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">REVIEWS & RATINGS LOG ({cmsData.testimonials.items.length})</label>
                              <div className="grid grid-cols-1 gap-3.5 max-h-[350px] overflow-y-auto pr-2">
                                {cmsData.testimonials.items.map((item, idx) => (
                                  <div key={item.id} className="bg-luxury-black border border-gold-500/10 p-4 space-y-3 relative">
                                    <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
                                      <button
                                        onClick={() => {
                                          if (testimonialDeleteConfirmId === item.id) {
                                            const updated = cmsData.testimonials.items.filter(t => t.id !== item.id);
                                            onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                            setTestimonialDeleteConfirmId(null);
                                          } else {
                                            setTestimonialDeleteConfirmId(item.id);
                                            setTimeout(() => setTestimonialDeleteConfirmId(null), 3000);
                                          }
                                        }}
                                        className={`p-1 transition-colors flex items-center gap-1 text-[9px] font-mono ${
                                          testimonialDeleteConfirmId === item.id
                                            ? 'text-rose-500 font-bold animate-pulse bg-rose-950/20 px-1.5'
                                            : 'text-gray-500 hover:text-rose-400'
                                        }`}
                                      >
                                        <Trash2 size={13} />
                                        {testimonialDeleteConfirmId === item.id && <span>Confirm?</span>}
                                      </button>
                                      <span className="text-[8px] font-mono text-gray-600">#{idx + 1}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                      <div className="md:col-span-4 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Client Name</span>
                                        <input
                                          type="text"
                                          value={item.name}
                                          onChange={(e) => {
                                            const updated = cmsData.testimonials.items.map(t => t.id === item.id ? { ...t, name: e.target.value } : t);
                                            onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-4 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Client Role</span>
                                        <input
                                          type="text"
                                          value={item.role}
                                          onChange={(e) => {
                                            const updated = cmsData.testimonials.items.map(t => t.id === item.id ? { ...t, role: e.target.value } : t);
                                            onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                      </div>

                                      <div className="md:col-span-4 space-y-1">
                                        <span className="text-[8px] font-mono text-gray-500 uppercase">Reviewer Rating (Stars)</span>
                                        <select
                                          value={item.rating}
                                          onChange={(e) => {
                                            const updated = cmsData.testimonials.items.map(t => t.id === item.id ? { ...t, rating: Number(e.target.value) } : t);
                                            onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                          }}
                                          className="w-full bg-luxury-gray border border-gold-500/15 px-2 py-1.5 text-xs text-white focus:outline-none"
                                        >
                                          <option value="5">5 Stars (Excellent)</option>
                                          <option value="4">4 Stars (Good)</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[8px] font-mono text-gray-500 uppercase">Comment text</span>
                                      <textarea
                                        rows={2}
                                        value={item.comment}
                                        onChange={(e) => {
                                          const updated = cmsData.testimonials.items.map(t => t.id === item.id ? { ...t, comment: e.target.value } : t);
                                          onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                        }}
                                        className="w-full bg-luxury-gray border border-gold-500/15 p-2 text-xs text-white focus:outline-none font-sans"
                                      />
                                    </div>

                                    <div className="space-y-1 mt-2">
                                      <ImageUploader
                                        label="Client Portrait/Photo"
                                        value={item.photoUrl || ''}
                                        onChange={(val) => {
                                          const updated = cmsData.testimonials.items.map(t => t.id === item.id ? { ...t, photoUrl: val } : t);
                                          onUpdateCMS({ ...cmsData, testimonials: { ...cmsData.testimonials, items: updated } });
                                        }}
                                        idPrefix={`test-portrait-${item.id}`}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 8: CONTACT COORDS & FOOTER */}
                        {cmsSection === 'contact' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Settings size={14} /> CONTACT COORDINATES & FOOTER COORDINATES
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Telephone hotline</label>
                                <input
                                  type="text"
                                  value={cmsData.contact.phone}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      contact: { ...cmsData.contact, phone: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none font-mono"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">E-mail coordinates</label>
                                <input
                                  type="text"
                                  value={cmsData.contact.email}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      contact: { ...cmsData.contact, email: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none font-mono"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Studio address</label>
                                <input
                                  type="text"
                                  value={cmsData.contact.address}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      contact: { ...cmsData.contact, address: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="border-t border-gold-500/10 pt-4 space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Footer Brand Slogan Tagline</label>
                                <input
                                  type="text"
                                  value={cmsData.footer.tagline}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      footer: { ...cmsData.footer, tagline: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {cmsSection === 'mascots' && (
                          <div className="space-y-6">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-2 flex items-center gap-2">
                              <Award size={14} /> MASCOT SECTION BANNER EDITOR
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Capsule Badge Text</label>
                                <input
                                  type="text"
                                  value={cmsData.mascotSection.badgeText}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      mascotSection: { ...cmsData.mascotSection, badgeText: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Highlight Words (In Gold)</label>
                                <input
                                  type="text"
                                  value={cmsData.mascotSection.highlightWords}
                                  onChange={(e) => {
                                    onUpdateCMS({
                                      ...cmsData,
                                      mascotSection: { ...cmsData.mascotSection, highlightWords: e.target.value }
                                    });
                                  }}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none font-semibold"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Banner Headline</label>
                              <input
                                type="text"
                                value={cmsData.mascotSection.heading}
                                onChange={(e) => {
                                  onUpdateCMS({
                                    ...cmsData,
                                    mascotSection: { ...cmsData.mascotSection, heading: e.target.value }
                                  });
                                }}
                                className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none font-display font-medium"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Banner Description</label>
                              <textarea
                                rows={3}
                                value={cmsData.mascotSection.description}
                                onChange={(e) => {
                                  onUpdateCMS({
                                    ...cmsData,
                                    mascotSection: { ...cmsData.mascotSection, description: e.target.value }
                                  });
                                }}
                                className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:outline-none leading-relaxed"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Banner Capsule Tags (Comma separated)</label>
                              <input
                                type="text"
                                value={cmsData.mascotSection.tags.join(', ')}
                                onChange={(e) => {
                                  const parsedTags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                                  onUpdateCMS({
                                    ...cmsData,
                                    mascotSection: { ...cmsData.mascotSection, tags: parsedTags }
                                  });
                                }}
                                className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:outline-none font-mono"
                                placeholder="Gorilla, Teddy Bear, Dinosaur..."
                              />
                            </div>

                            <div className="space-y-1">
                              <ImageUploader
                                label="Mascots Group Picture"
                                value={cmsData.mascotSection.imageUrl}
                                onChange={(newUrl) => {
                                  onUpdateCMS({
                                    ...cmsData,
                                    mascotSection: { ...cmsData.mascotSection, imageUrl: newUrl }
                                  });
                                }}
                                idPrefix="mascot-banner"
                              />
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: PREMIUM PRODUCTS INVENTORY & CREATOR */}
                  {activeTab === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8 text-left"
                    >
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase flex items-center gap-2">
                          <Briefcase size={16} className="text-gold-400" /> MASCOT & DOLLS PRODUCT MANAGER
                        </h3>
                        <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                          Add, update, and manage your inventory of custom mascot costumes, pneumatic inflatables, and doll characters. Previews and edits go live instantly.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Side: Creation / Edit Form */}
                        <div className="xl:col-span-5 bg-luxury-gray border border-gold-500/10 p-6 rounded-md relative">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30" />
                          <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-3 mb-5 flex items-center justify-between">
                            <span>{editingProductId ? 'Edit Costume Details' : 'Register New Costume'}</span>
                            {editingProductId && (
                              <button
                                onClick={() => {
                                  setEditingProductId(null);
                                  setProdName('');
                                  setProdCategory('Mascot Costume');
                                  setProdDescription('');
                                  setProdImageUrl('');
                                  setProdTags('');
                                }}
                                className="text-[9px] text-rose-400 font-mono hover:underline uppercase cursor-pointer"
                              >
                                Cancel Edit
                              </button>
                            )}
                          </h4>

                          <form onSubmit={handleSaveProduct} className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Product Name</label>
                              <input
                                type="text"
                                required
                                value={prodName}
                                onChange={(e) => setProdName(e.target.value)}
                                placeholder="e.g. Royal Golden Teddy Bear"
                                className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Category</label>
                                <select
                                  value={prodCategory}
                                  onChange={(e) => setProdCategory(e.target.value)}
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-gray-300 focus:border-gold-400 focus:outline-none cursor-pointer"
                                >
                                  <option value="Mascot Costume">Mascot Costume</option>
                                  <option value="Inflatable Character">Inflatable Character</option>
                                  <option value="Puppet Doll">Puppet Doll</option>
                                  <option value="Welcome Entry Character">Welcome Entry</option>
                                  <option value="Other Premium Item">Other</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Status Tags (Comma split)</label>
                                <input
                                  type="text"
                                  value={prodTags}
                                  onChange={(e) => setProdTags(e.target.value)}
                                  placeholder="Rental, Sale, Popular"
                                  className="w-full bg-luxury-black border border-gold-500/15 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none font-mono"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">Costume Description</label>
                              <textarea
                                rows={3}
                                required
                                value={prodDescription}
                                onChange={(e) => setProdDescription(e.target.value)}
                                placeholder="Provide dimensions, materials, and suitability notes (e.g. ideal for weddings)..."
                                className="w-full bg-luxury-black border border-gold-500/15 p-3 text-xs text-white focus:border-gold-400 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <ImageUploader
                                label="Costume Reference Image"
                                value={prodImageUrl}
                                onChange={(newUrl) => setProdImageUrl(newUrl)}
                                idPrefix="product-image"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full gold-shimmer-btn py-3 text-luxury-black font-semibold text-xs tracking-widest uppercase focus:outline-none cursor-pointer flex items-center justify-center gap-2"
                            >
                              {editingProductId ? <Save size={14} /> : <Plus size={14} />}
                              <span>{editingProductId ? 'UPDATE INVENTORY' : 'ADD TO GALLERY'}</span>
                            </button>
                          </form>
                        </div>

                        {/* Right Side: Inventory Table */}
                        <div className="xl:col-span-7 bg-luxury-gray border border-gold-500/10 p-6 rounded-md relative flex flex-col">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30" />
                          
                          {/* Table Header Controls */}
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-4 border-b border-gold-500/10">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest">
                              Inventory List ({(cmsData.mascotSection?.products || []).length})
                            </h4>

                            <div className="relative w-full md:w-64">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
                              <input
                                type="text"
                                placeholder="Filter costumes..."
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                                className="w-full bg-luxury-black border border-gold-500/15 rounded-sm py-1.5 pl-8 pr-3 text-[10px] font-sans text-white focus:outline-none focus:border-gold-400/40"
                              />
                            </div>
                          </div>

                          {/* Inventory Table Container */}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-gold-500/10 text-[9px] font-mono text-gold-400/70 uppercase tracking-wider">
                                  <th className="pb-3 pl-2">Costume</th>
                                  <th className="pb-3">Category</th>
                                  <th className="pb-3">Tags</th>
                                  <th className="pb-3 text-right pr-2">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gold-500/5 text-xs">
                                {((cmsData.mascotSection?.products || []).filter(p => 
                                  p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                                  p.category.toLowerCase().includes(productSearch.toLowerCase())
                                )).map((prod) => (
                                  <tr key={prod.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="py-3 pl-2 flex items-center gap-3">
                                      <div className="w-10 h-10 rounded border border-gold-500/10 bg-black overflow-hidden flex-shrink-0">
                                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <span className="font-semibold text-white block leading-tight">{prod.name}</span>
                                        <span className="text-[10px] text-gray-500 font-sans line-clamp-1">{prod.description}</span>
                                      </div>
                                    </td>
                                    <td className="py-3">
                                      <span className="text-[10px] font-mono bg-gold-400/5 border border-gold-400/10 px-2 py-0.5 rounded text-gold-300">
                                        {prod.category}
                                      </span>
                                    </td>
                                    <td className="py-3">
                                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                                        {(prod.tags || []).map((t, idx) => (
                                          <span key={idx} className="text-[8px] font-mono bg-luxury-black px-1.5 py-0.5 rounded text-gray-400">
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="py-3 text-right pr-2">
                                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button
                                          onClick={() => handleEditProductClick(prod)}
                                          className="p-1 hover:text-gold-300 text-gray-400 hover:bg-gold-500/5 rounded cursor-pointer"
                                          title="Edit details"
                                        >
                                          <Edit3 size={13} />
                                        </button>

                                        {productDeleteConfirmId === prod.id ? (
                                          <div className="flex items-center gap-1 bg-rose-950/40 border border-rose-500/30 rounded px-1.5 py-0.5">
                                            <button
                                              onClick={() => handleDeleteProduct(prod.id)}
                                              className="text-[9px] font-mono text-rose-400 hover:text-rose-300 font-bold uppercase cursor-pointer"
                                            >
                                              Confirm
                                            </button>
                                            <span className="text-gray-600">|</span>
                                            <button
                                              onClick={() => setProductDeleteConfirmId(null)}
                                              className="text-[9px] font-mono text-gray-400 hover:text-white cursor-pointer"
                                            >
                                              No
                                            </button>
                                          </div>
                                        ) : (
                                          <button
                                            onClick={() => setProductDeleteConfirmId(prod.id)}
                                            className="p-1 hover:text-rose-400 text-gray-400 hover:bg-rose-500/5 rounded cursor-pointer"
                                            title="Delete costume"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                {((cmsData.mascotSection?.products || []).filter(p => 
                                  p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                                  p.category.toLowerCase().includes(productSearch.toLowerCase())
                                )).length === 0 && (
                                  <tr>
                                    <td colSpan={4} className="py-6 text-center text-gray-500 font-sans">
                                      No costumes match your search query.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 7: SUPABASE SYNCHRONIZATION & SQL SCHEMA */}
                  {activeTab === 'database' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8 text-left"
                    >
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-wider text-white uppercase flex items-center gap-2">
                          <Database size={16} className="text-gold-400" /> SUPABASE SYNCHRONIZATION CENTRE
                        </h3>
                        <p className="text-xs text-gray-400 font-sans font-light mt-0.5">
                          Monitor connection status, link your persistent PostgreSQL cloud database, and copy SQL instructions to initialize schema.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Connection Status Panel */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="bg-luxury-gray border border-gold-500/10 p-6 rounded-md relative">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30" />
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-3 mb-4 flex items-center gap-2">
                              <span>Connection Health</span>
                            </h4>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-luxury-black border border-gold-500/5 rounded">
                                <div className="flex items-center gap-3">
                                  <span className={`w-3 h-3 rounded-full ${
                                    dbStatus === 'connected' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' :
                                    dbStatus === 'setup_required' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' :
                                    'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                                  }`} />
                                  <div>
                                    <span className="text-xs font-semibold text-white block uppercase font-mono tracking-wider">
                                      {dbStatus === 'connected' ? 'Connected' :
                                       dbStatus === 'setup_required' ? 'Tables Setup Required' :
                                       'Connecting / Error'}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                      {dbStatus === 'connected' ? 'Data syncing in real-time with Supabase' :
                                       dbStatus === 'setup_required' ? 'Connected, but tables need to be created' :
                                       'Checking connection or authentication credentials'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between py-1 border-b border-gold-500/5">
                                  <span className="text-gray-500">Service Provider:</span>
                                  <span className="text-white font-mono font-medium">Supabase Cloud PostgreSQL</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-gold-500/5">
                                  <span className="text-gray-500">Active URL:</span>
                                  <span className="text-gold-300 font-mono text-[10px] break-all">{SUPABASE_URL}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-gold-500/5">
                                  <span className="text-gray-500">Security Mode:</span>
                                  <span className="text-white">Row Level Security (RLS) Active</span>
                                </div>
                              </div>

                              <div className="p-3 bg-gold-500/5 border border-gold-500/10 rounded text-[11px] leading-relaxed text-gray-400">
                                <span className="font-semibold text-gold-300 block mb-1">💡 Offline Resilience / Fallback State:</span>
                                Siddharth Vibe incorporates a smart local storage sync strategy. If your cloud tables are not active, your booking records and web content edits are safely persisted in the browser cache. Once tables are set up, all operations seamlessly proxy to Supabase!
                              </div>
                            </div>
                          </div>

                          <div className="bg-luxury-gray border border-gold-500/10 p-6 rounded-md relative">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30" />
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest border-b border-gold-500/10 pb-3 mb-3">
                              How to Apply Connection
                            </h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-gray-300 leading-relaxed font-sans">
                              <li>Open your <span className="text-gold-400 font-semibold">Supabase Dashboard</span>.</li>
                              <li>Go to the <span className="text-gold-400">SQL Editor</span> tab from the left navigation drawer.</li>
                              <li>Click <span className="text-gold-400">New Query</span>.</li>
                              <li>Copy the SQL script provided on the right pane.</li>
                              <li>Paste the script into the query box and click <span className="text-emerald-400 font-bold">RUN</span>.</li>
                              <li>Refresh this page. Your connection badge will turn green!</li>
                            </ol>
                          </div>
                        </div>

                        {/* SQL Code Copy Block */}
                        <div className="lg:col-span-7 bg-luxury-gray border border-gold-500/10 p-6 rounded-md relative flex flex-col">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-400/30" />
                          
                          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gold-500/10">
                            <h4 className="text-xs font-mono text-gold-300 uppercase tracking-widest flex items-center gap-2">
                              <FileText size={14} /> SQL SCHEMA SCRIPT
                            </h4>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                                setSqlCopied(true);
                                setTimeout(() => setSqlCopied(false), 3000);
                              }}
                              className="px-3 py-1 bg-gold-500 text-luxury-black font-mono font-bold text-[10px] uppercase tracking-wider rounded cursor-pointer hover:bg-gold-400 transition-colors flex items-center gap-1.5"
                            >
                              {sqlCopied ? (
                                <span className="text-emerald-950 font-bold">COPIED TO CLIPBOARD!</span>
                              ) : (
                                <>
                                  <Save size={10} />
                                  <span>COPY SQL CODE</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="bg-luxury-black rounded border border-gold-500/10 p-4 overflow-x-auto max-h-[380px]">
                            <pre className="text-[10px] font-mono text-gray-300 leading-relaxed whitespace-pre select-all">
                              {SUPABASE_SQL_SCHEMA}
                            </pre>
                          </div>

                          <div className="mt-4 text-[10px] text-gray-500 text-right italic">
                            Double click code or use button above to copy to clipboard.
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

          </div>
        )}

      </motion.div>

    </div>
  );
}
