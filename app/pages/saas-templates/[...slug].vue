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

const { data: templateContent } = await useAsyncData(`saas-template-content-${route.params.slug}`, () => {
    return queryCollection('sass_templates_content')
        .where('stem', '=', `saas-templates-content/${routeSlug}`).first()
})
console.log('templateContent', templateContent);

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
                <section class="container py-24 sm:py-32" v-motion-fade-visible-once v-if="templateContent">
                    <h1 class="text-3xl md:text-4xl text-center font-bold"> {{ templateContent?.title }} {{ page.tag }}</h1>
                    <h2 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8"> {{ templateContent?.emoji_with_features }}</h2>
                    <p class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
                        {{ templateContent?.small_description }}
                    </p>
                    <section class="my-10">   
                        <UiBadge v-for="feature in templateContent?.main_features" :key="feature" class="mr-2">
                            {{ feature }}
                        </UiBadge>
                    </section>
                    
                    <NuxtImg loading="lazy" :alt="templateContent?.title" width="800" height="600" :src="templateContent?.og_image_url"
                        class="object-cover rounded-sm shadow-lg aspect-square mx-auto" />
                        
                    <section class="grid grid-cols-3 gap-10 my-10">
                        <NuxtImg loading="lazy" 
                        :alt="page.tag + templateContent?.title" width="1400" height="800" 
                        :src="img"    
                        class="h-auto w-full object-cover rounded-sm " 
                        v-for="img in templateContent?.featured_images"
                        :key="img"
                        />
                    </section>
                    <section class="grid lg:grid-cols-2 place-items-center lg:gap-24">
                        <div>
                            <h2 class="text-lg text-primary mb-2 tracking-wider">
                                {{ page.tag }} {{ templateContent?.emoji_with_features }}
                            </h2>

                            <h3 class="text-3xl md:text-4xl font-bold mb-4">
                                {{ templateContent?.title }}
                            </h3>
                            <p class="text-xl text-muted-foreground mb-8">
                                {{ templateContent?.small_description }}
                            </p>
                            <p> {{ templateContent?.creator }}</p>
                        </div>
                        <section class="grid lg:grid-cols-2 gap-4 w-full">
                            <ShinyCard v-for="(item, index) in templateContent?.tech_stack_table" :key="item.Technology" :show-bg="false">
                                <UiCard
                                class="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number h-full">
                                    <UiCardHeader>
                                        <div class="flex justify-between">
                                            <span
                                            class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                                            0{{ index + 1 }}
                                        </span>
                                    </div>
                                    
                                    <UiCardTitle>
                                        {{ item.Technology }}
                                    </UiCardTitle>
                                    </UiCardHeader>
                                    
                                    <UiCardContent class="text-muted-foreground">
                                        {{ item.Description }}
                                    </UiCardContent>
                                </UiCard>
                            </ShinyCard>
                        </section>  
                    </section>
                    <section class="my-10">
                        <NuxtLink :href="templateContent?.url" class="bg" target="_blank" :title="page?.title" :aria-label="page?.title">
                            <UiButton size="lg" class="text-xl px-10 py-5">
                                <Icon name="lucide:external-link" /> {{ templateContent?.title }}
                            </UiButton>
                        </NuxtLink>
                    </section>

                </section>
                <section v-else class="container py-24 sm:py-32">
                   
                    <h1 class="text-3xl md:text-4xl text-center font-bold"> {{ page.title }} {{ page.tag }}</h1>
                    <h2 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8"> {{ page.description }}</h2>

                    <section class="grid place-content-center">
                        <p>Details coming soon...</p>
                    </section>
                </section>
            </UiConfettiContainer>
        </div>
        <LazySaasTagsView />
    </section>
    <NotFoundView v-else />

    <LazyComments url="https://bsky.app/profile/leamsigc.bsky.social/post/3ldp4ljsads2d" />
</template>
<style scoped></style>
