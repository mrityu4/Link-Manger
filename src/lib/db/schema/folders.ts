import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getFolders } from "@/lib/api/folders/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const folders = sqliteTable('folders', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for folders - used to validate API requests
const baseSchema = createSelectSchema(folders).omit(timestamps)

export const insertFolderSchema = createInsertSchema(folders).omit(timestamps);
export const insertFolderParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateFolderSchema = baseSchema;
export const updateFolderParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const folderIdSchema = baseSchema.pick({ id: true });

// Types for folders - used to type API request params and within Components
export type Folder = typeof folders.$inferSelect;
export type NewFolder = z.infer<typeof insertFolderSchema>;
export type NewFolderParams = z.infer<typeof insertFolderParams>;
export type UpdateFolderParams = z.infer<typeof updateFolderParams>;
export type FolderId = z.infer<typeof folderIdSchema>["id"];
    
// this type infers the return from getFolders() - meaning it will include any joins
export type CompleteFolder = Awaited<ReturnType<typeof getFolders>>["folders"][number];

