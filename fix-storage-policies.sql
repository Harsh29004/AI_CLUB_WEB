-- Drop existing policies first
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous upload to newsletter-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous update on newsletter-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anonymous delete on AI CLUB" ON storage.objects;

-- Create new policies that allow anonymous uploads to newsletter-images bucket
CREATE POLICY "Allow anonymous upload to newsletter-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'newsletter-images');

CREATE POLICY "Allow anonymous update on newsletter-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'newsletter-images');

CREATE POLICY "Allow anonymous delete on newsletter-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'newsletter-images');
