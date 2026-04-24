-- SkillsXAI Supabase Database Schema
-- Run this in Supabase SQL Editor to create the required tables

-- Contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  inquiry_type TEXT NOT NULL DEFAULT 'other',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enrollments table for school/program enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  school_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_count INTEGER NOT NULL DEFAULT 0,
  preferred_dates TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN NOT NULL DEFAULT true
);

-- Chat messages for analytics (optional)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  page_url TEXT
);

-- Masterclass feedback table
CREATE TABLE IF NOT EXISTS masterclass_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  content_rating INTEGER CHECK (content_rating BETWEEN 1 AND 5),
  instructor_rating INTEGER CHECK (instructor_rating BETWEEN 1 AND 5),
  recommend_rating INTEGER CHECK (recommend_rating BETWEEN 1 AND 5),
  best_part TEXT,
  improvements TEXT,
  goals TEXT
);

ALTER TABLE masterclass_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (public masterclass form)
CREATE POLICY "Allow public insert on masterclass_feedback"
  ON masterclass_feedback FOR INSERT TO anon WITH CHECK (true);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts (public can submit forms)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON enrollments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON chat_messages
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at DESC);

-- Masterclass Registrations table (all participant data)
CREATE TABLE IF NOT EXISTS masterclass_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  quiz_score INTEGER,
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  content_rating INTEGER CHECK (content_rating BETWEEN 1 AND 5),
  instructor_rating INTEGER CHECK (instructor_rating BETWEEN 1 AND 5),
  recommend_rating INTEGER CHECK (recommend_rating BETWEEN 1 AND 5),
  best_part TEXT,
  improvements TEXT,
  goals TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  certificate_downloaded BOOLEAN NOT NULL DEFAULT false
);
ALTER TABLE masterclass_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on masterclass_registrations"
  ON masterclass_registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public update on masterclass_registrations"
  ON masterclass_registrations FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_masterclass_reg_email ON masterclass_registrations(email);
CREATE INDEX IF NOT EXISTS idx_masterclass_reg_created ON masterclass_registrations(created_at DESC);

-- Masterclass Payments table (UPI with Paytm verification)
CREATE TABLE IF NOT EXISTS masterclass_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  utr TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 99,
  order_id TEXT,
  paytm_txn_id TEXT,
  paytm_status TEXT,
  paytm_result_code TEXT,
  paytm_result_msg TEXT,
  payment_mode TEXT,
  bank_name TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE
);
ALTER TABLE masterclass_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on masterclass_payments"
  ON masterclass_payments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public update on masterclass_payments"
  ON masterclass_payments FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Masterclass Certificates (unique verifiable links)
CREATE TABLE IF NOT EXISTS masterclass_certificates (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  issued_at TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT ARRAY['Artificial Intelligence','Prompt Engineering','AI Agents & Automation','AI Tools & APIs']
);
ALTER TABLE masterclass_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on masterclass_certificates"
  ON masterclass_certificates FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select on masterclass_certificates"
  ON masterclass_certificates FOR SELECT TO anon USING (true);
CREATE INDEX IF NOT EXISTS idx_masterclass_cert_email ON masterclass_certificates(email);
