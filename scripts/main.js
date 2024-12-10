/***
* This file is used to go over the md file and extract the links from it and create the yaml files
***/

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

async function main() {
    // Create output directories
    const outputDir = join(__dirname, 'output');
    const tagsDir = join(outputDir, 'tags');
    
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }
    if (!existsSync(tagsDir)) {
        mkdirSync(tagsDir, { recursive: true });
    }

    // Read source markdown file
    const sourcePath = join(__dirname, 'source.md');
    const content = readFileSync(sourcePath, 'utf-8');

    // Split content into lines
    const lines = content.split('\n');
    let currentSection = '';
    let currentTag = '';
    const resources = [];

    // Regular expressions for matching
    const headingRegex = /^##\s+(.*)/;
    const emojiRegex = /([\p{Emoji}\u200d]+)\s*(.*)/u;
    const linkRegex = /^\s*-\s*\[([^\]]+)\]\(([^)]+)\)(.*)$/;

    for (const line of lines) {
        const headingMatch = line.match(headingRegex);
        if (headingMatch) {
            const headerContent = headingMatch[1].trim();
            const emojiMatch = headerContent.match(emojiRegex);
            
            if (emojiMatch) {
                const icon = emojiMatch[1].trim();
                const label = emojiMatch[2].trim();
                const slug = label.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');

                // Create tag YAML file
                const yamlContent = createTagYamlContent({
                    icon,
                    label,
                    slug
                });

                // Write to tags directory
                writeFileSync(
                    join(tagsDir, `${slug}.yml`),
                    yamlContent
                );
                currentTag = slug;
            }
            
            currentSection = headerContent;
            continue;
        }

        const linkMatch = line.match(linkRegex);
        if (linkMatch) {
            const title = linkMatch[1].trim();
            const link = linkMatch[2].trim();
            let description = linkMatch[3].trim();
            
            // Clean up description
            if (description.startsWith(':')) {
                description = description.slice(1).trim();
            }

            if (title && link) {
                const resource = {
                    title,
                    link,
                    description,
                    section: currentSection,
                    tag: currentTag
                };
                resources.push(resource);

                // Create filename from title
                const fileName = title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');

                // Create YAML content manually
                const yamlContent = createResourceYamlContent(resource);

                // Write to output directory
                writeFileSync(
                    join(outputDir, `${fileName}.yml`),
                    yamlContent
                );
            }
        }
    }

    console.log(`Processed ${resources.length} resources`);
}

function createTagYamlContent(tag) {
    const escapeYamlString = (str) => {
        if (str.includes('\n') || str.includes('"') || str.includes("'")) {
            return `>-\n  ${str.replace(/\n/g, '\n  ')}`;
        }
        if (str.includes(':') || str.includes('#') || str.match(/^\s+|\s+$/)) {
            return `"${str.replace(/"/g, '\\"')}"`;
        }
        return str;
    };

    return [
        `icon: ${escapeYamlString(tag.icon)}`,
        `label: ${escapeYamlString(tag.label)}`,
        `slug: ${escapeYamlString(tag.slug)}`
    ].join('\n');
}

function createResourceYamlContent(resource) {
    const escapeYamlString = (str) => {
        if (str.includes('\n') || str.includes('"') || str.includes("'")) {
            return `>-\n  ${str.replace(/\n/g, '\n  ')}`;
        }
        if (str.includes(':') || str.includes('#') || str.match(/^\s+|\s+$/)) {
            return `"${str.replace(/"/g, '\\"')}"`;
        }
        return str;
    };

    return [
        `title: ${escapeYamlString(resource.title)}`,
        `link: ${escapeYamlString(resource.link)}`,
        `description: ${escapeYamlString(resource.description)}`,
        `section: ${escapeYamlString(resource.section)}`,
        `tag: ${escapeYamlString(resource.tag)}`
    ].join('\n');
}

main().catch(console.error);
