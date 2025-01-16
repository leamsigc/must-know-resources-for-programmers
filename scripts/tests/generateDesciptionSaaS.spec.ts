import { test } from '@playwright/test';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import { load } from 'js-yaml';
import { glob } from 'glob';

import { openai } from '@ai-sdk/openai';
import LLMScraper from 'llm-scraper';
import { z } from 'zod';


// Constants for directories
const currentDir = process.cwd();
const RESOURCES_DIR = join(currentDir, '../../content/saas-templates-description');
const DESCRIPTION_DIR = join(currentDir, '../../public/saas-templates-description');
const llm = openai.chat('gpt-4o')
const scraper = new LLMScraper(llm)
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

async function createCustomImage(page: any, text: string, screenshotPath: string) {
    // Create a simple HTML page with centered text
    await page.setContent(`
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: #f0f0f0;
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        text-align: center;
                        padding: 2rem;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    h1 {
                        margin: 0;
                        color: rgb(0, 220, 130);
                        font-size: 8rem;
                    }
                    p {
                        color: #666;
                        margin-top: 1rem;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>${text}</h1>
                </div>
            </body>
        </html>
    `);

    // Set viewport size for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });

    //Create the md file
    await writeFileSync(screenshotPath, page.getContent(), 'utf8');
}

test('Get website description for saas templates', async ({ page }) => {
    const resources = await getResourceFiles();
    console.log(`Found ${resources.length} resources to process`);

    for (const resource of resources) {
        //Check if the screenshot already exists
        const screenshotPath = join(DESCRIPTION_DIR, `${resource.filename}.md`);
        if (existsSync(screenshotPath)) {
            console.log(`Skipping ${resource.filename} as screenshot already exists`);
            continue;
        }

        try {
            console.log(`Processing ${resource.filename}...`);
            console.log(`Link: ${resource.link}...`);


            // Try to navigate to the page
            const waitTIme =  30000;
            try {
                const response = await page.goto(resource.link, {
                    waitUntil: 'networkidle',
                    timeout: waitTIme
                });

                // Handle 404 or other error responses
                if (!response || !response.ok()) {
                    await createCustomImage(page, 'This starter kit is KAPUTT!!! ', screenshotPath);
                    console.log(` 404 image saved for ${resource.filename}`);
                    continue;
                }

                // Wait an additional second for any dynamic content
                await page.waitForTimeout(1000);

                // Get the page content
                // Define schema to extract contents into
                const schema = z.object({
                top: 
                    z.object({
                        title: z.string(),
                        description: z.string(),
                        features: z.string(),
                        price: z.string(),
                    })
                    .describe(`Saas template description for ${resource.filename}`),
                })

                // Run the scraper
                const { data } = await scraper.run(page, schema, {
                format: 'markdown',
                })

                // Show the result from LLM
                console.log(data)

                //Create the md file
                writeFileSync(screenshotPath, (data as unknown as string), 'utf8');
                console.log(` Description saved for ${resource.filename}`);

            } catch (navigationError) {
                // Handle navigation errors (timeout, connection refused, etc.)
                await createCustomImage(page, 'This starter kit is KAPUTT!!!', screenshotPath);
                console.log(` Error page image saved for ${resource.filename}`);
            }
        } catch (error) {
            console.error(`Error processing ${resource.filename}:`, (error as Error)?.message);
            // Continue with next resource even if this one fails
            continue;
        }
    }
});
