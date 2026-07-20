"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRelations = exports.like = exports.postRelations = exports.post = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const schema_1 = require("../../auth/schema");
const drizzle_orm_1 = require("drizzle-orm");
const schema_2 = require("src/comments/schema/schema");
exports.post = (0, pg_core_3.pgTable)('post', {
    id: (0, pg_core_2.serial)('id').primaryKey(),
    image: (0, pg_core_1.text)('image').notNull(),
    caption: (0, pg_core_1.text)('caption').notNull(),
    // comments:integer("comments").notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    userId: (0, pg_core_1.text)('user_id')
        .notNull()
        .references(() => schema_1.user.id),
});
exports.postRelations = (0, drizzle_orm_1.relations)(exports.post, ({ one, many }) => ({
    user: one(schema_1.user, {
        fields: [exports.post.userId],
        references: [schema_1.user.id],
    }),
    likes: many(exports.like),
    comments: many(schema_2.comment),
}));
exports.like = (0, pg_core_3.pgTable)('like', {
    id: (0, pg_core_2.serial)('id').primaryKey(),
    postId: (0, pg_core_1.integer)('post_id')
        .notNull()
        .references(() => exports.post.id),
    userId: (0, pg_core_1.text)('user_id')
        .notNull()
        .references(() => schema_1.user.id),
});
exports.likeRelations = (0, drizzle_orm_1.relations)(exports.like, ({ one }) => ({
    post: one(exports.post, {
        fields: [exports.like.postId],
        references: [exports.post.id],
    }),
    user: one(schema_1.user, {
        fields: [exports.like.userId],
        references: [schema_1.user.id],
    }),
}));
