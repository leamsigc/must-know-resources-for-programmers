import { defineEventHandler } from 'h3'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
    const baseContentCollection = await queryCollection(e, "content").all();

    const updatedAt = new Date().toISOString()
    const sitemapBlogs = baseContentCollection
        .filter(c => c.path.startsWith('/blogs/'))
        .map((c) => {
            return asSitemapUrl({
                loc: `/blogs/${c.path.replace('/blogs/', '')}`,
                lastmod: updatedAt
            })
        })
    const siteMapBase = baseContentCollection.filter(c => !c.path.startsWith('/blogs/')).map((c) => {
        return asSitemapUrl({
            loc: c.path,
            lastmod: updatedAt
        })
    })

    const tagsContentCollection = await queryCollection(e, "tags").all();
    const sitemapTags = tagsContentCollection.map((c) => {
        return asSitemapUrl({
            loc: `/tags/${c.slug}`,
            lastmod: updatedAt
        })
    })

    const resourcesContentCollection = await queryCollection(e, "resources").all();
    const sitemapResources = resourcesContentCollection.map((c) => {
        return asSitemapUrl({
            loc: `/${c.stem.replace('resources', 'resource')}`,
            lastmod: updatedAt
        })
    })

    const saasTagsContentCollection = await queryCollection(e, "saas_tags").all();
    const sitemapSassTags = saasTagsContentCollection.map((c) => {
        return asSitemapUrl({
            loc: `/saas-tags/${c.slug}`,
            lastmod: updatedAt
        })
    })

    const saasTemplatesContentCollection = await queryCollection(e, "saas_templates").all();
    const sitemapSaasTemplates = saasTemplatesContentCollection.map((c) => {
        return asSitemapUrl({
            loc: `/${c.stem}`,
            lastmod: updatedAt
        })
    })
    return [
        ...sitemapBlogs,
        ...siteMapBase,
        ...sitemapTags,
        ...sitemapResources,
        ...sitemapSassTags,
        ...sitemapSaasTemplates
    ];
})
