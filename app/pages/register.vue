<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import { signUp } from "~~/lib/auth-client";
/**
 *
 * Register view
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirm: "",
});

const registerForm = computed(() => [
  {
    $cmp: "FormKit",
    props: {
      type: "text",
      name: "firstName",
      label: "First name",
      validation: "required",
    },
  },
  {
    $formkit: "text",
    name: "lastName",
    label: "Last name",
    validation: "required|length:3,30",
  },
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
  {
    $formkit: "password",
    name: "password_confirm",
    label: "Confirm password",
    validation: "required|confirm",
    validationLabel: "password confirmation",
  },
]);
const { toast } = useToast();
const HandleRegisterUser = async () => {
  await signUp.email({
    email: userInformation.value.email,
    password: userInformation.value.password,
    name: `${userInformation.value.firstName} ${userInformation.value.lastName}`
      .toUpperCase()
      .replaceAll(" ", "-"),
    firstName: userInformation.value.firstName,
    lastName: userInformation.value.lastName,
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
</script>

<template>
  <div class="container py-24">
    <UiToaster />
    <UiCard class="w-full max-w-md mx-auto">
      <UiCardHeader>
        <UiCardTitle class="text-2xl"> Register </UiCardTitle>
        <UiCardDescription>
          Enter your details to create your account.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="grid gap-4">
        <FormKit id="register-form" v-slot="{ state: { valid } }" v-model="userInformation" type="form" :actions="false"
          @submit="HandleRegisterUser">
          <FormKitSchema :schema="registerForm" />

          <UiButton class="w-full" type="submit" :disabled="!valid"> Register </UiButton>
        </FormKit>
        <Separator />
        <UiButton variant="ghost" class="w-full">
          <NuxtLink to="/login">
            Already have an account?
            <span class="underline">Login</span>
          </NuxtLink>
        </UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>
<style scoped></style>
