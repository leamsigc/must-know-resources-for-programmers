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
const route = useRoute()
const { data: page } = await useAsyncData(`tag-saas-${route.params.slug}`, () =>
    queryCollection('saas_tags').where('slug', '=', route.params.slug).first()
);

const { data: saas } = await useAsyncData(`saas-${route.params.slug}`, () =>
    queryCollection('saas_templates').where('tag', '=', route.params.slug).all()
);
const seo = {
    title: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
    description: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
    meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: '/logo.png',
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: `https://must-know-resources-for-programmers.com/saas-tags/${route.params.slug}`,
        },
        {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
        },
        {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: page.value?.label || 'The best Saas Templates from Free and Open Source to Paid starter kits',
        },
        {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: '/logo.png',
        },
        {
            hid: 'twitter:url',
            name: 'twitter:url',
            content: `https://must-know-resources-for-programmers.com/saas-tags/${route.params.slug}`,
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
defineOgImageComponent('BlogOgImage', {
    ...seo,
    headline: 'Saas Templates',
})


const convertTitleToSlug = (title: string) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
const HandleNavigate = (link: string) => {
    window.open(link, '_blank')
}
</script>

<template>
    <section id="tag" class="container lg:w-[75%] ">
        <UiSeparator show-buckle class="pt-0" />

        <div class="text-center mb-8">
            <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
                <slot name="title">
                    <span v-if="page">
                        The best Saas Templates {{ page.label }}
                    </span>
                </slot>
            </h2>

            <h3 class="text-3xl md:text-4xl text-center font-bold">
                <slot name="subtitle">
                    From open source to paid starter kits {{ page?.label || 'to start your next project' }}
                </slot>
            </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20">
            <ShinyCard v-for="{ link, title, slug, description, tag, stem } in saas" :key="slug">
                <NuxtLink :to="`/saas-templates/${convertTitleToSlug(title)}`">
                    <UiCard class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg ">
                        <UiCardHeader class="p-1 rounded-sm">
                            <section>
                                <NuxtImg loading="lazy" :alt="title" width="300" height="300" :src="`/${stem}.png`"
                                    class="h-40 w-full object-cover rounded-sm" />
                            </section>
                        </UiCardHeader>
                        <UiCardContent class="text-center py-5 flex flex-col h-full">
                            <section>
                                <div class="font-semibold text-center">
                                    {{ title }}
                                </div>
                                <section class="py-4 px-6 font-light">
                                    {{ description && description != 'null' ? description : "No description" }}
                                </section>
                            </section>
                            <section class="text-left mt-auto flex justify-between">
                                <!-- Only show max 10 letters -->
                                <UiBadge variant="secondary" size="sm" :title="tag">{{ tag.slice(0, 10) }}...</UiBadge>
                                <UiButton class="z-10" @click.prevent="HandleNavigate(link)">
                                    <Icon name="lucide:external-link" /> View
                                </UiButton>
                            </section>
                        </UiCardContent>
                    </UiCard>
                </NuxtLink>
            </ShinyCard>
        </div>
    </section>
    <SaasTagsView />
</template>
<style scoped></style>