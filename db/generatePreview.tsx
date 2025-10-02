import { storage } from "./database";
export const generatePreview = (id: string) => {
  const storageId = process.env.NEXT_PUBLIC_STORAGE_ID;
  if (!storageId) throw new Error("NEXT_PUBLIC_STORAGE_ID is not set");
  const filePrev = storage.getFilePreview(storageId, id);
  return filePrev.href;
};
