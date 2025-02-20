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

const routeSlug = route.params.slug?.[0] || 'null'

const { data: page } = await useAsyncData(`saas-template-page-${routeSlug}`, () => {
    return queryCollection('saas_templates')
        .where('stem', '=', `saas-templates/${routeSlug}`).first()
})

const seo = {
    htmlAttrs: {
        lang: 'en',  
    },
    title: (page.value?.title + ' ' + page.value?.tag) || `The best saas starter kid for ${routeSlug}`,
    description: page.value?.description || `The best saas starter kid for ${routeSlug}`,
    meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: (page.value?.title + ' ' + page.value?.tag) || `The best saas starter kid for ${routeSlug}`,
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: page.value?.description || `The best saas starter kid for ${routeSlug}`,
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: '/logo.png',
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: `https://must-know-resources-for-programmers.com/saas-templates/${routeSlug}`,
        },
        {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: (page.value?.title + ' ' + page.value?.tag) || `The best saas starter kid for ${routeSlug}`,
        },
        {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: (page.value?.description + ' ' + page.value?.tag) || `The best saas starter kid for ${routeSlug}`,
        },
        {
            hid: 'twitter:url',
            name: 'twitter:url',
            content: `https://must-know-resources-for-programmers.com/saas-templates/${routeSlug}`,
        },
        {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            hid: 'twitter:site',
            name: 'twitter:site',
            content: '@leamsigc',
        },
    ],
}

useHead(seo)
useSeoMeta({
    robots: 'index, follow',
})
defineOgImageComponent('BlogOgImage', {
    ...seo,
    headline: page.value?.tag || 'Saas Templates',
})

</script>

<template>
    <section id="tag" class="container lg:w-[75%] " v-if="page">
        <div class="text-center my-8">
            <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
                <slot name="title">
                    <span v-if="page">
                        {{ page.tag }}
                    </span>
                </slot>
            </h2>

            <h3 class="text-3xl md:text-4xl text-center font-bold">
                <slot name="subtitle">
                    {{ page?.title }}
                </slot>
            </h3>
            <UiSeparator show-buckle class="pt-0" />
            <section>
                {{ page?.description }}
            </section>
            <section>
                <slot name="content">
                    {{ page?.content }}
                </slot>
            </section>
            <UiConfettiContainer>
                <section class="my-10">
                    <NuxtLink :href="page?.link" class="bg" target="_blank" :title="page?.title" :aria-label="page?.title">
                        <UiButton>
                            <Icon name="lucide:external-link" /> Go to resource
                        </UiButton>
                    </NuxtLink>
                </section>
                <section class="my-10">
                    <NuxtImg loading="lazy" :alt="page?.title" width="1400" height="800" :src="`/${page?.stem}.png`"
                        class="h-auto0 w-full object-cover rounded-sm" />
                </section>
            </UiConfettiContainer>
        </div>
        <UiSeparator show-buckle class="pt-0" />
    </section>
    <NotFoundView v-else />

    <LazyComments url="https://bsky.app/profile/leamsigc.bsky.social/post/3ldp4ljsads2d" />
</template>
<style scoped></style>
