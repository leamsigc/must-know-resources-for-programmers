<script setup lang="ts">
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
const colorMode = useColorMode();

const HandleThemeChange = () => {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
};
</script>

<template>
  <UiButton size="sm" variant="ghost" class="w-full justify-start" @click="HandleThemeChange">
    <div class="flex gap-2">
      <ClientOnly>
        <Icon :name="colorMode.value === 'light' ? 'lucide:moon' : 'lucide:sun'" class="size-5" />
        <span class="block lg:hidden"> {{ colorMode.value === 'light' ? 'Dark' : 'Light' }}</span>
      </ClientOnly>
    </div>


    <span class="sr-only">Toggle theme</span>
  </UiButton>
</template>
