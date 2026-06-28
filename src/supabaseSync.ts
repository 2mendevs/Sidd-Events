import { supabase } from './supabaseClient';
import { ConsultationRequest } from './types';
import { CMSState } from './cmsData';

export type DBStatus = 'connecting' | 'connected' | 'setup_required' | 'error';

// Helper to map DB row (snake_case) to Frontend model (camelCase)
export function mapRowToBooking(row: any): ConsultationRequest {
  return {
    id: row.id,
    status: row.status || 'Pending',
    fullName: row.full_name || '',
    email: row.email || '',
    phone: row.phone || '',
    eventType: row.event_type || '',
    eventDate: row.event_date || '',
    guestCount: Number(row.guest_count || 0),
    message: row.message || '',
    servicesNeeded: row.services_needed || [],
    cateringOption: row.catering_option || '',
    decorationTier: row.decoration_tier || '',
    totalEstimatedQuote: Number(row.total_estimated_quote || 0),
    adminNotes: row.admin_notes || '',
    createdAt: row.created_at || ''
  };
}

// Helper to map Frontend model (camelCase) to DB row (snake_case)
export function mapBookingToRow(booking: ConsultationRequest) {
  return {
    id: booking.id,
    status: booking.status || 'Pending',
    full_name: booking.fullName,
    email: booking.email,
    phone: booking.phone || '',
    event_type: booking.eventType || '',
    event_date: booking.eventDate || '',
    guest_count: booking.guestCount || 0,
    message: booking.message || '',
    services_needed: booking.servicesNeeded || [],
    catering_option: booking.cateringOption || '',
    decoration_tier: booking.decorationTier || '',
    total_estimated_quote: booking.totalEstimatedQuote || 0,
    admin_notes: booking.adminNotes || '',
    created_at: booking.createdAt || new Date().toISOString().split('T')[0]
  };
}

// Check if tables exist by doing a quick count query on both tables
export async function checkDBStatus(): Promise<DBStatus> {
  try {
    // 1. Check bookings table
    const { error: bookingsError } = await supabase
      .from('bookings')
      .select('id')
      .limit(1);

    if (bookingsError) {
      if (
        bookingsError.code === 'PGRST116' || 
        bookingsError.message?.includes('relation') || 
        bookingsError.message?.includes('not found')
      ) {
        return 'setup_required';
      }
      return 'error';
    }

    // 2. Check cms_data table
    const { error: cmsError } = await supabase
      .from('cms_data')
      .select('id')
      .limit(1);

    if (cmsError) {
      if (
        cmsError.code === 'PGRST116' || 
        cmsError.message?.includes('relation') || 
        cmsError.message?.includes('not found')
      ) {
        return 'setup_required';
      }
      return 'error';
    }

    return 'connected';
  } catch (err) {
    console.error('Supabase status check failed:', err);
    return 'error';
  }
}

// Load bookings from Supabase with fallback to local state
export async function loadBookingsFromDB(): Promise<ConsultationRequest[] | null> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Could not load bookings from Supabase:', error.message);
      return null;
    }

    if (data) {
      return data.map(mapRowToBooking);
    }
    return [];
  } catch (err) {
    console.error('Failed fetching bookings from Supabase:', err);
    return null;
  }
}

// Upsert a booking to Supabase
export async function upsertBookingToDB(booking: ConsultationRequest): Promise<boolean> {
  try {
    let row = mapBookingToRow(booking);
    let attempts = 0;
    const maxAttempts = 15; // Max possible table columns

    while (attempts < maxAttempts) {
      const { error } = await supabase
        .from('bookings')
        .upsert(row);

      if (!error) {
        return true;
      }

      // Check if it's an undefined column error
      const isUndefinedColumn = 
        error.code === '42703' || 
        error.message?.toLowerCase().includes('column') ||
        error.message?.toLowerCase().includes('could not find');

      if (isUndefinedColumn && error.message) {
        // Try to extract the column name inside single quotes
        const match = error.message.match(/'([^']+)'/);
        if (match && match[1]) {
          const columnName = match[1];
          if (columnName in row) {
            console.warn(`Supabase table is missing column '${columnName}'. Stripping and retrying...`);
            const nextRow = { ...row };
            delete (nextRow as any)[columnName];
            row = nextRow;
            attempts++;
            continue;
          }
        }
      }

      // If we couldn't resolve it or it's a different error, log and fail
      console.error('Error upserting booking to Supabase:', error.message);
      return false;
    }

    return false;
  } catch (err) {
    console.error('Failed upserting booking to Supabase:', err);
    return false;
  }
}

// Delete a booking from Supabase
export async function deleteBookingFromDB(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting booking from Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed deleting booking from Supabase:', err);
    return false;
  }
}

// Load CMS data from Supabase
export async function loadCMSFromDB(): Promise<CMSState | null> {
  try {
    const { data, error } = await supabase
      .from('cms_data')
      .select('data')
      .eq('id', 'singleton')
      .maybeSingle(); // Use maybeSingle to avoid errors if 0 rows exist

    if (error) {
      console.warn('Could not load CMS from Supabase:', error.message);
      return null;
    }

    if (data && data.data) {
      return data.data as CMSState;
    }
    return null;
  } catch (err) {
    console.error('Failed loading CMS from Supabase:', err);
    return null;
  }
}

// Save CMS data to Supabase
export async function saveCMSDataToDB(cmsData: CMSState): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('cms_data')
      .upsert({
        id: 'singleton',
        data: cmsData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving CMS data to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed saving CMS data to Supabase:', err);
    return false;
  }
}
