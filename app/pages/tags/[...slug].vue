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
const { data: page } = await useAsyncData(`tag-${route.params.slug}`, () =>
    queryCollection('tags').where('slug', '=', route.params.slug).first()
);

const { data: resources } = await useAsyncData(`resources-${route.params.slug}`, () =>
    queryCollection('resources').where('tag', '=', route.params.slug).all()
);


useSeoMeta({
    title: `Best resources to learn ${page.value?.label}`,
    description: `Best resources to learn ${page.value?.label} for developers.`
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
                        Best resources to learn {{ page.label }}
                    </span>
                </slot>
            </h2>

            <h3 class="text-3xl md:text-4xl text-center font-bold">
                <slot name="subtitle">
                    Here are the most popular resources for {{ page?.label || 'For developers' }}
                </slot>
            </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20">
            <ShinyCard v-for="{ link, title, slug, description, tag } in resources" :key="slug">
                <NuxtLink :to="`/resource/${convertTitleToSlug(title)}`">
                    <UiCard class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg">
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
    <TagsView />
</template>
<style scoped></style>