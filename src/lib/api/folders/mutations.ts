import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  FolderId, 
  NewFolderParams,
  UpdateFolderParams, 
  updateFolderSchema,
  insertFolderSchema, 
  folders,
  folderIdSchema 
} from "@/lib/db/schema/folders";
import { getUserAuth } from "@/lib/auth/utils";

export const createFolder = async (folder: NewFolderParams) => {
  const { session } = await getUserAuth();
  const newFolder = insertFolderSchema.parse({ ...folder, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(folders).values(newFolder).returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFolder = async (id: FolderId, folder: UpdateFolderParams) => {
  const { session } = await getUserAuth();
  const { id: folderId } = folderIdSchema.parse({ id });
  const newFolder = updateFolderSchema.parse({ ...folder, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(folders)
     .set({...newFolder, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(folders.id, folderId!), eq(folders.userId, session?.user.id!)))
     .returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFolder = async (id: FolderId) => {
  const { session } = await getUserAuth();
  const { id: folderId } = folderIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(folders).where(and(eq(folders.id, folderId!), eq(folders.userId, session?.user.id!)))
    .returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

