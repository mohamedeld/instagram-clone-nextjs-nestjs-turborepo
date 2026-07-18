import { integer, text, timestamp } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { user } from '../../auth/schema';
import { relations } from 'drizzle-orm';
import { id } from 'zod/v4/locales';

export const post = pgTable('post', {
  id: serial('id').primaryKey(),
  image: text('image').notNull(),
  caption: text('caption').notNull(),
  // comments:integer("comments").notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  likes: many(like),
}));

export const like = pgTable('like', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => post.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
});

export const likeRelations = relations(like, ({ one }) => ({
  post: one(post, {
    fields: [like.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [like.userId],
    references: [user.id],
  }),
}));
