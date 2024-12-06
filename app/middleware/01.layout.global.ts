import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
    const isUserNavigatingToTheApp = to.path.startsWith('/app');
    if (isUserNavigatingToTheApp) {
        setPageLayout('dashboard-layout');
    }
});