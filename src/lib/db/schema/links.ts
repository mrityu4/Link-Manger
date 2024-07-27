import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { type getLinks } from "@/lib/api/links/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const links = sqliteTable('links', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  title: text("title"),
  url: text("url").notNull(),
  folderId: text("folder_id").notNull(),
  userId: text("user_id").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for links - used to validate API requests
const baseSchema = createSelectSchema(links).omit(timestamps)

export const insertLinkSchema = createInsertSchema(links).omit(timestamps);
export const insertLinkParams = baseSchema.extend({
  folderId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateLinkSchema = baseSchema;
export const updateLinkParams = baseSchema.extend({
  folderId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const linkIdSchema = baseSchema.pick({ id: true });

// Types for links - used to type API request params and within Components
export type Link = typeof links.$inferSelect;
export type NewLink = z.infer<typeof insertLinkSchema>;
export type NewLinkParams = z.infer<typeof insertLinkParams>;
export type UpdateLinkParams = z.infer<typeof updateLinkParams>;
export type LinkId = z.infer<typeof linkIdSchema>["id"];
    
// this type infers the return from getLinks() - meaning it will include any joins
export type CompleteLink = Awaited<ReturnType<typeof getLinks>>["links"][number];

