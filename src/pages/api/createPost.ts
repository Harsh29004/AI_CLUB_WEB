import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, POSTS_TABLE, IMAGES_BUCKET } from '../../../db/supabase';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, summary, content, imageBase64, imageName } = req.body;

    // Validate input
    if (!title || !summary || !content || !imageBase64) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique filename for the image
    const fileExt = imageName.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Convert base64 to buffer for file upload
    const base64Data = imageBase64.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64');

    // Upload image to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(fileName, binaryData, {
        contentType: imageName.endsWith('.png') ? 'image/png' : 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Create post in database
    const { data: postData, error: postError } = await supabase
      .from(POSTS_TABLE)
      .insert([
        {
          Title: title,
          Summary: summary,
          content,
          imageName,
          imageBase64: uploadData.path, // Store the path as imageBase64 for compatibility
        }
      ])
      .select()
      .single();

    if (postError) {
      // If post creation fails, clean up uploaded image
      await supabase.storage.from(IMAGES_BUCKET).remove([uploadData.path]);
      throw new Error(`Failed to create post: ${postError.message}`);
    }

    return res.status(200).json({
      success: true,
      document: postData,
      file: uploadData,
    });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to create post',
    });
  }
}
