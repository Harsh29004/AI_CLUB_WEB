# Supabase Migration Guide

This guide will help you complete the migration from Appwrite to Supabase.

## 🔧 Setup Steps

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://emetwlaivipizykelrun.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZXR3bGFpdmlwaXp5a2VscnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTE4OTIsImV4cCI6MjA3NjEyNzg5Mn0.25fqqoDbRTPmFIIAC_P2SpCP8zb3GcyZhYDkc0OtfN8

# Admin Configuration (keep your existing values)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

### 2. Database Setup
Run the SQL script in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the contents of `supabase-schema.sql`

This will create:
- `posts` table with the correct schema
- `newsletter-images` storage bucket
- Row Level Security (RLS) policies

### 3. Storage Bucket Setup
The storage bucket `newsletter-images` will be created automatically by the SQL script. Make sure it's configured as public.

## 📊 Database Schema Changes

### Old Appwrite Structure:
- Collection: `newsletters` (or similar)
- Document fields: `title`, `summary`, `content`, `imageName`, `imageBase64`
- Storage bucket for images

### New Supabase Structure:
- Table: `posts`
- Fields: `id`, `title`, `summary`, `content`, `image_name`, `image_path`, `created_at`
- Storage bucket: `newsletter-images`

## 🔄 Key Changes Made

### 1. Database Client (`db/supabase.tsx`)
- Replaced Appwrite client with Supabase client
- Added table and bucket constants

### 2. Data Fetching (`db/fetchData.tsx`)
- Updated to use Supabase queries
- Changed return structure to match new schema

### 3. Post Creation (`db/createPost.tsx`)
- Updated to use Supabase storage and database
- Added proper error handling and cleanup
- Changed file upload logic

### 4. Image Preview (`db/generatePreview.tsx`)
- Updated to use Supabase storage public URLs
- Made function async to handle URL generation

### 5. API Routes (`src/pages/api/createPost.ts`)
- Migrated to Supabase client
- Updated error handling

### 6. Components
- Updated newsletter listing page to use new data structure
- Updated individual post page to use new data structure
- Changed image handling to use direct URLs

### 7. Next.js Configuration (`next.config.js`)
- Removed Appwrite domains
- Added Supabase domain for image optimization

## 🧪 Testing the Migration

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test post creation:**
   - Go to `/createletter`
   - Create a new post with an image
   - Verify the post appears in `/newsletter`

3. **Test post viewing:**
   - Click on a post in the newsletter list
   - Verify the individual post page loads correctly

4. **Test image display:**
   - Verify images load correctly in both list and detail views

## 🚨 Troubleshooting

### Common Issues:

1. **Environment variables not loading:**
   - Make sure `.env.local` is in the project root
   - Restart the development server after adding environment variables

2. **Database connection errors:**
   - Verify your Supabase URL and anon key are correct
   - Check that the database schema was created successfully

3. **Image upload failures:**
   - Ensure the `newsletter-images` bucket exists and is public
   - Check RLS policies for the storage bucket

4. **TypeScript errors:**
   - The new code uses different interfaces - make sure all imports are updated

## 🗑️ Cleanup (Optional)

After confirming everything works, you can remove:
- `db/database.tsx` (old Appwrite configuration)
- Appwrite dependencies from `package.json`
- Any remaining Appwrite environment variables

## 📝 Notes

- The migration maintains the same user interface and functionality
- All existing features should work the same way
- Image URLs are now direct Supabase storage URLs
- The database uses integer IDs instead of Appwrite's string IDs
- Created timestamps are now in ISO format

## 🔐 Security Considerations

- RLS policies are set up to allow public read access to posts
- Storage bucket is public for image access
- Consider implementing authentication if you need to restrict post creation
