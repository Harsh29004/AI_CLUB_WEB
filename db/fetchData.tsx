import { database } from "./database";
export async function fetchData() {
  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
  if (!databaseId) throw new Error("NEXT_PUBLIC_DATABASE_ID is not set");
  if (!collectionId) throw new Error("NEXT_PUBLIC_COLLECTION_ID is not set");
  const docs = await database.listDocuments(databaseId, collectionId);
  return docs.documents;
}
