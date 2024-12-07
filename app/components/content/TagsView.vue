<script lang="ts" setup>
/**
 *
 * Tags
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const { data } = await useAsyncData('tags', () => queryCollection('tags').all());

</script>

<template>
    <section id="tags" class="container lg:w-[75%] ">
        <UiSeparator show-buckle class="pt-0" />

        <div class="text-center mb-8">
            <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
                <slot name="title">Tags </slot>
            </h2>

            <h3 class="text-3xl md:text-4xl text-center font-bold">
                <slot name="subtitle">
                    Our Most Popular Tags
                </slot>
            </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20">
            <ShinyCard v-for="{ icon, label, slug } in data" :key="slug">
                <NuxtLink :to="`/tags/${slug}`">
                    <UiCard class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg">
                        <UiCardContent class="text-center py-5">
                            <section>
                                <div class="h-full overflow-hidden text-5xl text-center">
                                    {{ icon }}
                                </div>
                                <section class="py-6 pb-4 px-6">
                                    {{ label }}
                                </section>
                            </section>
                        </UiCardContent>
                    </UiCard>
                </NuxtLink>
            </ShinyCard>
        </div>
    </section>
</template>
<style scoped></style>