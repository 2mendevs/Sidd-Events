export interface NavItem {
  label: string;
  id: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  detailText: string;
  features: string[];
  basePrice: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  date: string;
  details: string;
}

export interface ConsultationRequest {
  id?: string;
  status?: 'Pending' | 'In Conversation' | 'Confirmed' | 'Completed' | 'Cancelled';
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  message: string;
  servicesNeeded: string[];
  cateringOption: string;
  decorationTier: string;
  totalEstimatedQuote: number;
  adminNotes?: string;
  createdAt?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
