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
interface Props {
  icon?: string;
  url?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "lucide:discord",
  url: "https://discord.com/",
  label: "Join our Discord",
});

const { icon, url, label } = toRefs(props);
</script>
<template>
  <section id="community" class="py-12">
    <UiSeparator />
    <div class="container py-20 sm:py-20">
      <div class="lg:w-[60%] mx-auto">
        <UiCard
          class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0"
        >
          <UiCardHeader>
            <UiCardTitle class="text-4xl md:text-5xl font-bold">
              <Icon class="w-20 h-20 m-auto mb-4" :name="icon" />
              <ContentSlot :use="$slots.title" unwrap="p">
                Ready to join this
                <span class="gradient-text"> Community? </span>
              </ContentSlot>
            </UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="lg:w-[80%] text-xl text-muted-foreground">
            <ContentSlot :use="$slots.content" unwrap="p">
              Join our vibrant Discord community! Connect, share, and grow with
              like-minded enthusiasts. Click to dive in! 🚀
            </ContentSlot>
          </UiCardContent>

          <UiCardFooter>
            <UiButton as-child>
              <NuxtLink :href="url" target="_blank">
                {{ label }}
              </NuxtLink>
            </UiButton>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
    <UiSeparator />
  </section>
</template>
