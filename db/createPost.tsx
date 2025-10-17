import { supabase, POSTS_TABLE, IMAGES_BUCKET } from "./supabase";

export const createPost = async (
  title: string,
  summary: string,
  content: any,
  image: File
) => {
  try {
    console.log("Creating post with:", { title, summary, content: content.substring(0, 100) + "...", imageName: image.name });
    
    // Generate unique filename for the image
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    console.log("Uploading image...");
    // Upload image to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }
    
    console.log("Image uploaded:", uploadData.path);
    
    console.log("Creating post...");
    // Create post in database
    const { data: postData, error: postError } = await supabase
      .from(POSTS_TABLE)
      .insert([
        {
          Title: title,
          Summary: summary,
          content: content,
          imageName: image.name,
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
    
    console.log("Post created:", postData.id);
    
    return { document: postData, file: uploadData };
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
};
