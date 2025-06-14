import { checkEnv } from "./config/env.config"
import { env } from "node:process";

checkEnv(env);

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@formkit/nuxt",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "radix-vue/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    '@unlighthouse/nuxt',
    "@nuxt/fonts",
    '@vueuse/motion/nuxt',
    "@nuxtjs/seo",
    "@nuxt/content",
    'nuxt-umami'
  ],
  umami: {
    id: '1fe4398a-2c75-437c-887e-22a11e5cde39',
    host: 'https://umami.giessen.dev',
    autoTrack: true,
    ignoreLocalhost: true
  },
  formkit: {
    // autoImport: true,
    configFile: './config/formkit.config.ts',
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    configPath: "./config/tailwind.config.ts"
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  site: {
    trailingSlash: true,
    url: 'https://must-know-resources-for-programmers.giessen.dev',
    name: 'Must Know Resources for Developers by Giessen Dev',
    description: 'A comprehensive collection of essential resources, tools, and guides for programmers and developers at all skill levels.',
  },
  seo: {
    meta: {
      description: 'Must Know Resources for Developers by Giessen Dev- A comprehensive collection of essential resources, tools, and guides for programmers and developers at all skill levels.',
      themeColor: [
        { content: '#18181b', media: '(prefers-color-scheme: dark)' },
        { content: 'white', media: '(prefers-color-scheme: light)' },
      ],
    },
  },
  sitemap: {
    enabled: true
  },
  image: {
    quality: 75,
    format: ['webp'],
  },
  ogImage: {
    componentOptions: {
      global: true
    }
  },
  linkChecker: {
    report: {
      // generate both a html and markdown report
      html: false,
      markdown: false,
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    },
    build: {
      pathMeta: {
        forceLeadingSlash: true
      },
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          // theme: 'github-light',
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  },
  icon: {
    serverBundle: {
      externalizeIconsJson: true,
    },
  }
})