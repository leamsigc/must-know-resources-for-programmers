<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import { signIn } from "~~/lib/auth-client";
/**
 *
 * Login view
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const loginForm = ref({
  email: "",
  password: "",
});

const loginFormSchema = [
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    validation: "required|email",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Password",
    validation: "required|length:5,16",
  },
];

const { toast } = useToast();

const HandleLoginUser = async () => {
  await signIn.email({
    email: loginForm.value.email,
    password: loginForm.value.password,
    callbackURL: "/app/",
    fetchOptions: {
      onError: (context) => {
        toast({
          title: "Please try again",
          description: context?.error?.message || "Please check your email and password",
          variant: "destructive",
        });
      },
    },
  });
};

const signInWithGoogle = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: "/app/",
    fetchOptions: {
      onError: (context) => {
        toast({
          title: "Please try again",
          description: context?.error?.message || "Please check your email and password",
          variant: "destructive",
        });
      },
    }
  })
}

</script>

<template>
  <div class="grid place-content-center min-h-screen">
    <UiToaster />
    <UiCard class="w-full max-w-sm">
      <UiCardHeader>
        <UiCardTitle class="text-2xl"> Login </UiCardTitle>
        <UiCardDescription>
          Enter your email below to login to your account.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="grid gap-4">
        <FormKit id="login-form" v-slot="{ state: { valid } }" v-model="loginForm" type="form" :actions="false"
          @submit="HandleLoginUser">
          <FormKitSchema :schema="loginFormSchema" />
          <UiButton class="w-full" type="submit" :disabled="!valid"> Sign in </UiButton>
          <UiSeparator label="OR" class="my-8" />
          <UiButton variant="outline" type="button" @click="signInWithGoogle" class="w-full">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Continue with Google</span>
          </UiButton>
        </FormKit>
        <UiSeparator />
        <UiButton variant="ghost" class="w-full">
          <NuxtLink to="/register">
            Don't have an account?
            <span class="underline">Register</span>
          </NuxtLink>
        </UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>
<style scoped></style>
