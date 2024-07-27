import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { folders } from "@/lib/db/schema/folders";
import { type LinkId, linkIdSchema, links } from "@/lib/db/schema/links";
import { and, eq } from "drizzle-orm";

export const getLinks = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ link: links, folder: folders })
    .from(links).leftJoin(folders, eq(links.folderId, folders.id))
    .where(eq(links.userId, session?.user.id!));
  const l = rows.map((r) => ({ ...r.link, folder: r.folder }));
  return { links: l };
};

export const getLinksAndFolders = async () => {
  const { session } = await getUserAuth();
  if (!session) return { links: [], folders: [] };
  const linksPromise = db.select()
    .from(links)
    .where(eq(links.userId, session?.user.id!));
  const foldersPromise = db.select()
    .from(folders)
    .where(eq(folders.userId, session?.user.id!));
  const [linksrows, foldersRow] = await Promise.all([linksPromise, foldersPromise]);

  return { links: linksrows, folders: foldersRow };
};


export const getLinkById = async (id: LinkId) => {
  const { session } = await getUserAuth();
  const { id: linkId } = linkIdSchema.parse({ id });
  const [row] = await db.select({ link: links, folder: folders }).from(links).where(and(eq(links.id, linkId), eq(links.userId, session?.user.id!))).leftJoin(folders, eq(links.folderId, folders.id));
  if (row === undefined) return {};
  const l = { ...row.link, folder: row.folder };
  return { link: l };
};





