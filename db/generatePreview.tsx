import { supabase } from './supabase';

export const generatePreview = (imagePath: string) => {
  try {
    const { data } = supabase.storage
      .from('newsletter-images')
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error generating preview URL:', error);
    throw new Error('Failed to generate preview URL');
  }
};
