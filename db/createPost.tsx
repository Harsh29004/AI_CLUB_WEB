import { database, ID, storage } from "./database";

export const createPost = async (
  title: string,
  summary: string,
  content: any,
  image: File
) => {
  try {
    console.log("Creating post with:", { title, summary, content: content.substring(0, 100) + "...", imageName: image.name });
    
    let id = ID.unique();
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
    const storageId = process.env.NEXT_PUBLIC_STORAGE_ID;
    
    console.log("Environment variables:", { databaseId, collectionId, storageId });
    
    if (!databaseId) throw new Error("NEXT_PUBLIC_DATABASE_ID is not set");
    if (!collectionId) throw new Error("NEXT_PUBLIC_COLLECTION_ID is not set");
    if (!storageId) throw new Error("NEXT_PUBLIC_STORAGE_ID is not set");
    
    console.log("Creating document...");
    const res = await database.createDocument(
      databaseId,
      collectionId,
      id,
      {
        title: title,
        summary: summary,
        content: content,
      }
    );
    console.log("Document created:", res.$id);
    
    console.log("Creating file...");
    const imgRes = await storage.createFile(storageId, res.$id, image);
    console.log("File created:", imgRes.$id);
    
    return { document: res, file: imgRes };
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
};
