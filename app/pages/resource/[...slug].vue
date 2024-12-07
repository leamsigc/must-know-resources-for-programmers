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
console.log(routeSlug);

const { data: page } = await useAsyncData(`resource-page-${routeSlug}`, () => {
    return queryCollection('resources')
        .where('stem', '=', `resources/${routeSlug}`).first()
})

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description
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
            <section class="my-10">
                <NuxtLink :href="page?.link" class="bg">
                    <UiButton>
                        <Icon name="lucide:external-link" /> Go to resource
                    </UiButton>
                </NuxtLink>
            </section>
        </div>
        <UiSeparator show-buckle class="pt-0" />
    </section>
    <NotFoundView v-else />
</template>
<style scoped></style>
