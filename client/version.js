import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the lerna.json file
const lernaFile = join(__dirname, '..', 'lerna.json');

try {
    // Check if lerna.json exists
    if (!existsSync(lernaFile)) {
        console.error(`Error: ${lernaFile} does not exist.`);
        process.exit(1);
    }

    // Read and parse lerna.json
    const lernaContent = readFileSync(lernaFile, 'utf8');
    const { version } = JSON.parse(lernaContent);

    // Check if version was successfully extracted
    if (!version) {
        console.error('Error: Unable to extract version from lerna.json');
        process.exit(1);
    }

    // Create the info.json content
    const infoContent = JSON.stringify({ version }, null, 2);

    // Write to src/lib/info.json
    const infoFile = join(__dirname, 'src', 'lib', 'info.json');
    writeFileSync(infoFile, infoContent);

    // Confirm success
    console.log(`info.json created with version: ${version}`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}