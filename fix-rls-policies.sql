-- Fix RLS policies for anonymous access
-- Run this in your Supabase SQL Editor

-- First, drop all existing storage policies
DROP POLICY IF EXISTS "Allow public read access on newsletter-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous upload to newsletter-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous update on newsletter-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous delete on newsletter-images" ON storage.objects;

-- Create new storage policies that allow anonymous access
CREATE POLICY "Allow public read access on newsletter-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'newsletter-images');

CREATE POLICY "Allow anonymous upload to newsletter-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'newsletter-images');

CREATE POLICY "Allow anonymous update on newsletter-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'newsletter-images');

CREATE POLICY "Allow anonymous delete on newsletter-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'newsletter-images');

-- Fix policies for the News table (if it exists)
-- Drop existing News table policies
DROP POLICY IF EXISTS "Allow public read access on News" ON "News";
DROP POLICY IF EXISTS "Allow public insert access on News" ON "News";
DROP POLICY IF EXISTS "Allow public update access on News" ON "News";
DROP POLICY IF EXISTS "Allow public delete access on News" ON "News";
DROP POLICY IF EXISTS "Allow authenticated users to insert News" ON "News";
DROP POLICY IF EXISTS "Allow authenticated users to update News" ON "News";
DROP POLICY IF EXISTS "Allow authenticated users to delete News" ON "News";

-- Enable RLS on News table if not already enabled
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;

-- Create new policies for News table that allow anonymous access
CREATE POLICY "Allow public read access on News" ON "News"
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on News" ON "News"
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on News" ON "News"
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on News" ON "News"
  FOR DELETE USING (true);
