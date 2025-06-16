import type { LayoutKey } from "#build/types/layouts";

export default defineNuxtRouteMiddleware(async (to) => {
    const routeStart = to.path
    const isBlog = routeStart.startsWith('/blogs/');

    let layout: LayoutKey = 'default';
    if (isBlog) {
        layout = 'blog-layout';
    }

    setPageLayout(layout);
});