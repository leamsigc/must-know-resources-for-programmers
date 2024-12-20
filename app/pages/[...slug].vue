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
useHead(page.value?.head || {})
defineOgImageComponent('BlogOgImage', {
  title: `${page.value?.title.slice(0, 20)}... 👋`,
  description: `${page.value?.description.slice(0, 100)}...`,
  headline: 'Resources',
})
</script>

<template>
  <article>
    <ContentRenderer v-if="page" :value="page" />
    <NotFoundView v-else />

    <LazyComments url="https://bsky.app/profile/leamsigc.bsky.social/post/3ldp3y3irus2k" />
  </article>
</template>
<style scoped></style>
