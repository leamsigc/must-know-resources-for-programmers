
/**
 * This is currently a work around for the Nuxt SEO module for the sitemap and the robots.txt
 * just a temporary solution for Nuxt Content version 3 to get that juice SEO requirements
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://must-know-resources-for-programmers.giessen.dev';
const ALLOWED_FOLDERS = ['blogs', 'blog', 'resource', 'tags', 'saas-starter-kits','saas-tags','saas-templates'];

/**
 * Generate sitemap.xml based on the content of .output/public folder
 */
async function generateSitemap() {
    const outputDir = join(__dirname, '../.output/public');
    const sitemapPath = join(outputDir, 'sitemap.xml');
    
    try {
        const urls = [];
        
        // Add homepage
        urls.push({
            loc: BASE_URL,
            lastmod: new Date().toISOString(),
            priority: '1.0',
            changefreq: 'daily'
        });

        // Recursively scan allowed folders
        for (const folder of ALLOWED_FOLDERS) {
            const folderPath = join(outputDir, folder);
            try {
                await fs.access(folderPath);
                const files = await scanDirectory(folderPath, outputDir);
                urls.push(...files);
            } catch (error) {
                console.log(`Folder ${folder} not found, skipping...`);
            }
        }

        // Generate sitemap XML content
        const sitemapContent = generateSitemapXML(urls);
        await fs.writeFile(sitemapPath, sitemapContent);
        console.log('✅ sitemap.xml generated successfully');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
    }
}

/**
 * Recursively scan directory for HTML files
 */
async function scanDirectory(currentPath, baseDir) {
    const urls = [];
    const files = await fs.readdir(currentPath, { withFileTypes: true });

    for (const file of files) {
        const fullPath = join(currentPath, file.name);
        if (file.isDirectory()) {
            const subDirUrls = await scanDirectory(fullPath, baseDir);
            urls.push(...subDirUrls);
        } else if (file.isFile() && (file.name === 'index.html' || extname(file.name) === '.html')) {
            const relativePath = fullPath.replace(baseDir, '').replace(/\\/g, '/');
            const urlPath = relativePath
                .replace(/index\.html$/, '')
                .replace(/\.html$/, '')
                .replace(/^\//, '');
            
            urls.push({
                loc: `${BASE_URL}/${urlPath}`,
                lastmod: new Date().toISOString(),
                priority: urlPath === '' ? '1.0' : '0.8',
                changefreq: 'weekly'
            });
        }
    }
    return urls;
}

/**
 * Generate sitemap XML content
 */
function generateSitemapXML(urls) {
    const xmlUrls = urls.map(url => `
    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
}

/**
 * Copy robots.txt to the .output/public directory
 */
async function copyRobotsFile() {
    const sourceFile = join(__dirname, './robots.txt');
    const outputDir = join(__dirname, '../.output/public');
    const destFile = join(outputDir, 'robots.txt');

    try {
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });
        
        // Copy the file
        await fs.copyFile(sourceFile, destFile);
        console.log('✅ robots.txt copied successfully to .output/public directory');
    } catch (error) {
        console.error('❌ Error copying robots.txt:', error.message);
    }
}

// Execute both functions
async function main() {
    await copyRobotsFile();
    await generateSitemap();
}

main();