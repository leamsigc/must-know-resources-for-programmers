<script lang="ts" setup>
/**
 *
 * Banner promo for other pages.
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const visible = ref(true);
const toggle = () => {
    visible.value = !visible.value;
}
</script>

<template>
    <div class="bg-slate-950 dark:bg-slate-100 p-5 max-w-sm w-full fixed bottom-5 left-5 rounded-lg shadow-lg z-10 dark:text-slate-950 text-primary corner-ribbon"
        v-if="visible">
        <!-- The container -->
        <div class="corner-ribbon__inner">
            <!-- The ribbon -->
            <div class="corner-ribbon__ribbon"></div>
        </div>
        <h3 class="text-xl md:text-2xl font-bold mb-4">
            <slot name="subtitle">
                Free tools 👀🔥🔥🔥
            </slot>
        </h3>
        <section class="text-sm dark:text-muted-foreground ">
            <slot name="description">
                <ul class="list-disc list-inside my-4">
                    <li>Background remover</li>
                    <li>Text behind image</li>
                    <li>Audio to text</li>
                </ul>

            </slot>
            <section class="flex justify-between">
                <NuxtLink to="https://human-ideas.giessen.dev/" as-child>
                    <Ui-button class="mt-4" variant="secondary">
                        View tools 🛠
                        <span class=" absolute inset-0"></span>
                    </Ui-button>
                </NuxtLink>
                <Ui-button @click="toggle" class="mt-4 ml-auto opacity-60 z-10" variant="destructive">
                    close
                </Ui-button>
            </section>
        </section>
    </div>
</template>
<style scoped lang="scss">
.corner-ribbon__inner {
    /* Displayed at the top left corner */
    right: 0px;
    position: absolute;
    top: 0px;

    /* Size */
    height: 4rem;
    width: 4rem;

    /* Hide the part of its children which is displayed outside */
    overflow: hidden;
}

.corner-ribbon__ribbon {
    /* Position */
    left: .5rem;
    position: absolute;
    top: 2rem;

    /* Size */
    height: 1.5rem;
    width: 10.656rem;

    /* Displayed diagonally */
    transform: translate(-38px, -8px) rotate(45deg);

    /* Background color */
    @apply bg-primary dark:bg-red-950;
    /* Centerize the text content */
    text-align: center;
}
</style>