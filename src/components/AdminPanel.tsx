import React, { useState, useEffect } from 'react';
import { 
  X, Shield, Lock, Briefcase, Calendar, Users, DollarSign, 
  Search, Filter, CheckCircle, Clock, Trash2, Edit3, Save, 
  Plus, TrendingUp, Award, Layers, MapPin, Phone, Mail, FileText, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConsultationRequest } from '../types';
import { SERVICE_ITEMS } from '../data';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConsultationRequest[];
  onUpdateStatus: (id: string, status: ConsultationRequest['status']) => void;
  onAddNotes: (id: string, notes: string) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking: (booking: ConsultationRequest) => void;
}

// Passcode: admin (very easy for client to access but keeps it secure from random visitors)
const CORRECT_PASSCODE = 'admin';

export default function AdminPanel({
  isOpen,
  onClose,
  bookings,
  onUpdateStatus,
  onAddNotes,
  onDeleteBooking,
  onAddManualBooking
}: AdminPanelProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'calendar' | 'new-booking'>('dashboard');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected booking for detailed view / edit
  const [selectedBooking, setSelectedBooking] = useState<ConsultationRequest | null>(null);
  const [adminNotesText, setAdminNotesText] = useState('');

  // Manual booking states
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newEventType, setNewEventType] = useState(SERVICE_ITEMS[0]?.title || 'Temple Processions (Sammy Oorvalam)');
  const [newEventDate, setNewEventDate] = useState('');
  const [newGuestCount, setNewGuestCount] = useState(150);
  const [newCatering, setNewCatering] = useState('Premium Gourmet Buffet');
  const [newDecor, setNewDecor] = useState('Regal Floral & Lighting Decor');
  const [newMessage, setNewMessage] = useState('');

  // Reset states when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setPasscode('');
      setError('');
    }
  }, [isOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode. Access Denied.');
      setPasscode('');
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
    const baseService = SERVICE_ITEMS.find(s => s.title.toUpperCase() === newEventType.toUpperCase()) || SERVICE_ITEMS[0];
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-luxury-black/95 backdrop-blur-md">
      
      {/* Sidebar panel area */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl h-screen bg-luxury-black border-l border-gold-500/10 flex flex-col relative"
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
              className="p-2 text-gray-400 hover:text-gold-400 focus:outline-none transition-colors border border-transparent hover:border-gold-500/20 rounded cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content body based on Authentication */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400 mb-6 shadow-xl animate-pulse">
              <Lock size={26} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg font-semibold tracking-wider text-white uppercase">
              AUTHENTICATION REQUIRED
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-light mt-2 mb-6">
              This terminal provides access to live customer consultation logs, financial estimates, and scheduler agendas.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-luxury-gray/80 border border-gold-500/15 focus:border-gold-400 px-4 py-3 text-center text-sm text-white tracking-[0.3em] font-mono rounded-none focus:outline-none shadow-inner"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-[10px] font-mono text-rose-400 tracking-wider uppercase bg-rose-500/10 border border-rose-500/15 py-1.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full gold-shimmer-btn py-3 text-luxury-black font-semibold text-xs tracking-[0.2em] uppercase focus:outline-none cursor-pointer"
              >
                UNLOCK TERMINAL
              </button>
            </form>

            <div className="mt-8 border-t border-gold-500/10 pt-4 w-full text-center">
              <p className="text-[10px] font-mono text-gray-500 uppercase">
                Demo Passcode: <span className="text-gold-300 font-bold">admin</span>
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
                            {SERVICE_ITEMS.map((srv) => (
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
                                  if (confirm('Are you sure you want to permanently delete this record?')) {
                                    onDeleteBooking(selectedBooking.id);
                                    setSelectedBooking(null);
                                  }
                                }}
                                className="text-rose-400/80 hover:text-rose-400 text-[10px] font-mono tracking-wider flex items-center gap-1 uppercase transition-colors cursor-pointer"
                              >
                                <Trash2 size={12} /> DELETE BOOKING
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
                              {SERVICE_ITEMS.map((srv) => (
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

                </AnimatePresence>
              </div>
            </div>

          </div>
        )}

      </motion.div>

    </div>
  );
}
