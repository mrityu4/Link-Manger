import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  LinkId, 
  NewLinkParams,
  UpdateLinkParams, 
  updateLinkSchema,
  insertLinkSchema, 
  links,
  linkIdSchema 
} from "@/lib/db/schema/links";
import { getUserAuth } from "@/lib/auth/utils";

export const createLink = async (link: NewLinkParams) => {
  const { session } = await getUserAuth();
  const newLink = insertLinkSchema.parse({ ...link, userId: session?.user.id! });
  try {
    const [l] =  await db.insert(links).values(newLink).returning();
    return { link: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLink = async (id: LinkId, link: UpdateLinkParams) => {
  const { session } = await getUserAuth();
  const { id: linkId } = linkIdSchema.parse({ id });
  const newLink = updateLinkSchema.parse({ ...link, userId: session?.user.id! });
  try {
    const [l] =  await db
     .update(links)
     .set({...newLink, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(links.id, linkId!), eq(links.userId, session?.user.id!)))
     .returning();
    return { link: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLink = async (id: LinkId) => {
  const { session } = await getUserAuth();
  const { id: linkId } = linkIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(links).where(and(eq(links.id, linkId!), eq(links.userId, session?.user.id!)))
    .returning();
    return { link: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

