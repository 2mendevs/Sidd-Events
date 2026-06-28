import { createClient } from '@supabase/supabase-js';

// Fallback to the user's provided Supabase project credentials
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://pontvvtvxmldaqkwwuxn.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbnR2dnR2eG1sZGFxa3d3dXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MTcxNDAsImV4cCI6MjA5ODE5MzE0MH0.VWWKQG212MYKL-K4cLIEuCDv6LFCH0EniLXjpUpr2Qs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_SQL_SCHEMA = `-- 1. CREATE BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  status TEXT DEFAULT 'Pending',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date TEXT,
  guest_count INTEGER,
  message TEXT,
  services_needed TEXT[],
  catering_option TEXT,
  decoration_tier TEXT,
  total_estimated_quote NUMERIC,
  admin_notes TEXT,
  created_at TEXT
);

-- Enable Row Level Security (RLS) for Bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create Policies for Bookings (Public Access)
CREATE POLICY "Allow public insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON bookings FOR DELETE USING (true);


-- 2. CREATE CMS DATA TABLE
CREATE TABLE IF NOT EXISTS cms_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for CMS Data
ALTER TABLE cms_data ENABLE ROW LEVEL SECURITY;

-- Create Policies for CMS Data (Public Access)
CREATE POLICY "Allow public select" ON cms_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON cms_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON cms_data FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON cms_data FOR DELETE USING (true);
`;
