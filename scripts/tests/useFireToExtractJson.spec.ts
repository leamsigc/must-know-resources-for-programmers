
import { test } from '@playwright/test';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import { load } from 'js-yaml';
import { glob } from 'glob';

const URL = "https://www.firecrawl.dev/playground?mode=extract";

// Constants for directories
const currentDir = process.cwd();
const RESOURCES_DIR = join(currentDir, '../../content/saas-templates');
const DESCRIPTION_DIR = join(currentDir, '../../public/saas-templates-description');

// Ensure screenshots directory exists
if (!existsSync(DESCRIPTION_DIR)) {
    mkdirSync(DESCRIPTION_DIR, { recursive: true });
}

// Function to get all YAML files and their content
async function getResourceFiles(): Promise<Array<{ filename: string; link: string }>> {
    const files = await glob('**/*.yml', { cwd: RESOURCES_DIR });
    return files.map(file => {
        const content = readFileSync(join(RESOURCES_DIR, file), 'utf8');
        const data = load(content) as { link: string };
        return {
            filename: file.replace('.yml', ''),
            link: data.link
        };
    }).filter(item => item.link); // Only include items with valid links
}


test('Get each website sass description', async ({ page }) => {
    const resources = await getResourceFiles();
    console.log(`Found ${resources.length} resources to process`);

    for (const resource of resources) {
        //Check if the screenshot already exists
        const screenshotPath = join(DESCRIPTION_DIR, `${resource.filename}.json`);
        if (existsSync(screenshotPath)) {
            console.log(`Skipping ${resource.filename} as screenshot already exists`);
            continue;
        }

        try {
            console.log(`Processing ${resource.filename}...`);
            console.log(`Link: ${resource.link}...`);


            // Try to navigate to the page
            const waitTIme = 30000;
            try {
                //Go to the firecrawl.dev/playground?mode=extract
                await page.goto(URL, { waitUntil: 'load' });

                //Wait for the page to load
                await page.waitForTimeout(waitTIme);
                //Get button that have text "Enter manually"
                const button = await page.$('text=Enter manually');
                //Click the button
                await button?.click();
                //Get the input field

                console.log(` Description saved for ${resource.filename}`);

            } catch (navigationError) {
                // Handle navigation errors (timeout, connection refused, etc.)
                console.log(` Error page image saved for ${resource.filename}`);
            }
        } catch (error) {
            console.error(`Error processing ${resource.filename}:`, (error as Error)?.message);
            // Continue with next resource even if this one fails
            continue;
        }
    }
});