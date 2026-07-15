import { integer, text, timestamp } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { user } from '../../auth/schema';
import { relations } from 'drizzle-orm';

export const post = pgTable('post', {
  id: serial('id').primaryKey(),
  image: text('image').notNull(),
  caption: text('caption').notNull(),
  likes: integer('likes').notNull().default(0),
  // comments:integer("comments").notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
});

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}));
