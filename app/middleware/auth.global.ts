import { authClient } from "~~/lib/auth-client";


export default defineNuxtRouteMiddleware(async (to) => { 

// Check if the user is navigating to the app route
    const isUserNavigatingToTheApp = to.path.startsWith('/app');
    const { data: loggedIn } = await authClient.useSession(useFetch);

    if (isUserNavigatingToTheApp && !loggedIn.value) {
        return navigateTo('/login');
    }

});