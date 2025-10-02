import { database, ID, storage } from "./database";

export const createPost = async (
  title: string,
  summary: string,
  content: any,
  image: File
) => {
  let id = ID.unique();
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
  const storageId = process.env.NEXT_PUBLIC_STORAGE_ID;
  if (!databaseId) throw new Error("NEXT_PUBLIC_DATABASE_ID is not set");
  if (!collectionId) throw new Error("NEXT_PUBLIC_COLLECTION_ID is not set");
  if (!storageId) throw new Error("NEXT_PUBLIC_STORAGE_ID is not set");
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
  const imgRes = await storage.createFile(storageId, res.$id, image);
};
