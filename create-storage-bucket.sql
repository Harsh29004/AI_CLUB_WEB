-- Create storage bucket for newsletter images
INSERT INTO storage.buckets (id, name, public)
VALUES ('AI CLUB', 'AI CLUB', true);

-- Set up storage policies for the newsletter-images bucket
CREATE POLICY "Allow public read access on AI CLUB" ON storage.objects
  FOR SELECT USING (bucket_id = 'AI CLUB');

CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'AI CLUB' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to update images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'AI CLUB' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'AI CLUB' AND
    auth.role() = 'authenticated'
  );
