import { defineCollection } from '@nuxt/content'
import { z } from 'zod'


import { asSeoCollection } from '@nuxtjs/seo/content'

const linkZodDefinition = z.object({
  name: z.string(),
  href: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  target: z.string().optional()
})
const BASE_TAG = (source = 'tags/**.yml') => defineCollection(asSeoCollection({
  source,
  type: 'data',
  schema: z.object({
    icon: z.string(),
    label: z.string(),
    slug: z.string()
  })
}));
const BASE_CONTENT = (source = 'resources/**.yml') => defineCollection(asSeoCollection({
  type: 'data',
  source,
  schema: z.object({
    title: z.string(),
    link: z.string(),
    slug: z.string(),
    description: z.string(),
    tag: z.string(),
    content: z.string().optional()
  })
}));

const CONTENT_SCHEMA = (source = 'resources/**.yml') => defineCollection(asSeoCollection({
  type: 'data',
  source,
  schema: z.object({
    title: z.string(),
    url: z.string(),
    demo_url: z.string(),
    og_image_url: z.string(),
    small_description: z.string(),
    main_features: z.array(z.string()),
    feature_breakdown: z.object({}), // Currently no defined properties
    emoji_with_features: z.string(),
    tech_stack_table: z.array(z.object({
      Description: z.string(),
      Technology: z.string(),
    })), // Objects without specific properties
    featured_images: z.array(z.string()),
    creator: z.string(),
  })
}));


const mainLink = linkZodDefinition.and(
  z.object({
    children: z.array(linkZodDefinition.and(
      z.object({ children: z.array(linkZodDefinition.optional()) })
    )).optional()
  })
);

export const collections = {
  content: defineCollection(asSeoCollection({
    type: 'page',
    source: {
      include: '**/**.md',
      exclude: ['nav/**.yml', 'tags/**.yml']
    },
    schema: z.object({
      layout: z.enum(['default', 'blog-layout']).default('default'),
      title: z.string(),
      description: z.string(),
      head: z.object({
        meta: z.array(z.object({
          name: z.string(),
          content: z.string()
        })),
        htmlAttrs: z.object({
          lang: z.string()
        }).optional(),
        bodyAttrs: z.object({
          class: z.string()
        }).optional(),
      })
    })
  })),
  navigation: defineCollection({
    type: 'data',
    source: 'nav/**.yml',
    schema: z.object({
      siteMeta: z.object({
        title: z.string(),
        logo: z.string(),
        logoAlt: z.string(),
      }),
      headerLinks: z.object({
        MenuLinks: z.array(
          mainLink
        ),
        ShortLinks: z.array(linkZodDefinition),
        SocialMedia: z.array(linkZodDefinition),
        Actions: z.array(linkZodDefinition.and(
          z.object({
            label: z.string().optional()
          })
        ))
      }),
      footerLinks: z.array(z.object({
        title: z.string(),
        links: z.array(z.object({
          name: z.string(),
          url: z.string(),
          icon: z.string().optional()
        }))
      }))
    })
  }),
  blog: defineCollection(asSeoCollection({
    type: 'page',
    source: 'blogs/**/**.md',
    schema: z.object({
      layout: z.enum(['default', 'blog-layout']).default('default'),
      title: z.string(),
      description: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      date: z.string(),
      publishedAt: z.string(),
      category: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      head: z.object({
        meta: z.array(z.object({
          name: z.string(),
          content: z.string()
        })),
        htmlAttrs: z.object({
          lang: z.string()
        }).optional(),
        bodyAttrs: z.object({
          class: z.string()
        }).optional(),
      }),
      author: z.object({
        name: z.string(),
        role: z.string(),
        avatar: z.string(),
        social: z.string()
      }),
      ogImage: z.object({
        component: z.enum(['BlogOgImage', 'Video']).default('BlogOgImage'),
        props: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string()
        })
      })
    })
  })),
  tags: BASE_TAG(),
  resources: BASE_CONTENT(),
  saas_tags: BASE_TAG('saas-tags/**.yml'),
  saas_templates: BASE_CONTENT('saas-templates/**.yml'),
  sass_templates_content: CONTENT_SCHEMA('saas-templates-content/**.json')
}
