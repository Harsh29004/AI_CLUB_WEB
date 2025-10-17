import { supabase, POSTS_TABLE } from "./supabase";

export async function fetchData() {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .order('$createdAt', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data || [];
}
