<script lang="ts" setup>
/**
 *
 * Component Description:Desc
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
// Get the articles that have the flag of featured to true from nuxt content
const { data: featuredArticles } = await useAsyncData("featured_posts", () =>
  queryCollection("blog")
    .where('featured', '=', 1)
    .select('path', 'title', 'tags', 'publishedAt', 'image', 'author')
    .order('publishedAt', 'DESC')
    .all()
);

</script>

<template>
  <section class="grid gap-6 md:grid-cols-2 md:gap-12 mb-6 md:mb-12">
    <div v-for="article in featuredArticles" :key="article.path"
      class="group flex flex-col space-y-3 md:space-y-6  transition-transform">
      <NuxtLink
        class="object-contain aspect-video rounded-xl overflow-hidden flex items-center justify-center transition-all dark:group-hover:opacity-80 hover:hue-rotate-90"
        :href="article.path" :title="article.title">
        <NuxtPicture loading="lazy" class="w-full h-full" :src="article.image.src" :alt="article.image.alt" width="600"
          height="300" />
      </NuxtLink>
      <div class="space-y-3 md:space-y-5 pr-3 flex-1">
        <NuxtLink :href="article.path" :title="article.title">
          <h3 class="group-hover:text-primary transition-colors text-2xl font-semibold leading-tight">
            {{ article.title }}
          </h3>
        </NuxtLink>
        <div class="flex justify-between mt-auto">
          <div class="flex flex-col md:flex-row gap-3 md:gap-5">
            <div class="flex items-center space-x-2.5">
              <UiAvatar>
                <UiAvatarImage :src="article.author.avatar" alt="@radix-vue" />
                <UiAvatarFallback>{{ article.author.name.slice(0, 1) }}</UiAvatarFallback>
              </UiAvatar>
              <NuxtLink :href="article.author.social" class="flex flex-col" target="_blank"
                :title="article.author.name">

                <span class="text-sm font-semibold dark:text-white/80">
                  {{ article.author.name }}
                </span>
                <span class="text-xs dark:text-white/60">
                  {{ article.author.social }}
                </span>
              </NuxtLink>
            </div>
          </div>
          <p class="text-sm dark:text-white/60">
            <span class="text-xs dark:text-white/60">
              <time :datetime="article.publishedAt">
                {{ new Date(article.publishedAt).toLocaleDateString() }}
              </time>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
