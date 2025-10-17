-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for newsletter images
INSERT INTO storage.buckets (id, name, public)
VALUES ('newsletter-images', 'newsletter-images', true);

-- Set up RLS (Row Level Security) policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts
CREATE POLICY "Allow public read access on posts" ON posts
  FOR SELECT USING (true);

-- Allow anyone (including anonymous) to insert posts
CREATE POLICY "Allow public insert access on posts" ON posts
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update posts
CREATE POLICY "Allow public update access on posts" ON posts
  FOR UPDATE USING (true);

-- Allow anyone to delete posts
CREATE POLICY "Allow public delete access on posts" ON posts
  FOR DELETE USING (true);

-- Storage policies for the newsletter-images bucket
CREATE POLICY "Allow public read access on newsletter-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'newsletter-images');

-- Allow anyone (including anonymous) to upload images
CREATE POLICY "Allow anonymous upload to newsletter-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'newsletter-images');

-- Allow anyone to update images
CREATE POLICY "Allow anonymous update on newsletter-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'newsletter-images');

-- Allow anyone to delete images
CREATE POLICY "Allow anonymous delete on newsletter-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'newsletter-images');
