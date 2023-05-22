import { z, defineCollection } from 'astro:content';
import { ISO_3166_ALPHA_2_CODES } from '~/util/iso3166';

const linkSchemaPart = {
  text: z.string(),
  link: z.string(),
};

/**
 * Navigation
 */

export const navigationSchema = z.object({
  items: z.array(
    z.object({
      ...linkSchemaPart,
      children: z.array(z.object(linkSchemaPart)).optional(),
    })
  ),
});

const navigationCollection = defineCollection({
  type: 'data',
  schema: navigationSchema,
});

/**
 * Blog (aka posts)
 */

export const blogSchema = z.object({
  title: z.string(),
  author: z.string(),
  publishDay: z.number().or(z.string()),
  publishMonth: z.number(),
  publishYear: z.number(),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

/**
 * Grants
 */

export const grantSchema = z.object({
  name: z.string(),
  day: z.number(),
  month: z.number(),
  year: z.number(),
  country: z.enum(ISO_3166_ALPHA_2_CODES),
  tags: z.array(z.string()).optional(),
});

const grantCollection = defineCollection({
  type: 'content',
  schema: grantSchema,
});

export const collections = {
  navigation: navigationCollection,
  blog: blogCollection,
  grant: grantCollection,
};
