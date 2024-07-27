import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type FolderId, folderIdSchema, folders } from "@/lib/db/schema/folders";
import { links, type CompleteLink } from "@/lib/db/schema/links";

export const getFolders = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(folders).where(eq(folders.userId, session?.user.id!));
  const f = rows
  return { folders: f };
};

export const getFolderById = async (id: FolderId) => {
  const { session } = await getUserAuth();
  const { id: folderId } = folderIdSchema.parse({ id });
  const [row] = await db.select().from(folders).where(and(eq(folders.id, folderId), eq(folders.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { folder: f };
};

export const getFolderByIdWithLinks = async (id: FolderId) => {
  const { session } = await getUserAuth();
  const { id: folderId } = folderIdSchema.parse({ id });
  const rows = await db.select({ folder: folders, link: links }).from(folders).where(and(eq(folders.id, folderId), eq(folders.userId, session?.user.id!))).leftJoin(links, eq(folders.id, links.folderId));
  if (rows.length === 0) return {};
  const f = rows[0].folder;
  const fl = rows.filter((r) => r.link !== null).map((l) => l.link) as CompleteLink[];

  return { folder: f, links: fl };
};

