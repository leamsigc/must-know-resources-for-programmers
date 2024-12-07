<script lang="ts" setup>
/**
 *
 * Render the content from nuxt content folder
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const route = useRoute()

const collectionType = route.path.startsWith('/blogs/') ? 'blog' : 'content'


const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection(collectionType).path(route.path).first()
})
const layout = computed(() => {
  return page.value?.layout || 'default'
})

setPageLayout(layout.value)

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
  ...page.value?.seo ? page.value.seo : {}
}
)
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<template>
  <article>
    <ContentRenderer v-if="page" :value="page" />
    <NotFoundView v-else />
  </article>
</template>
<style scoped></style>
