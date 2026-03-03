/**
 * Prepares the dist folder for GitHub Pages deployment.
 * - Copies index.html to 404.html (so SPA routes work on direct navigation)
 * - Creates .nojekyll (disables Jekyll processing)
 */

import { copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '..', 'dist');

// Copy index.html to 404.html for SPA routing on GitHub Pages
copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'));
console.log('Created 404.html for SPA routing');

// Add .nojekyll to prevent Jekyll from processing (ignores underscore files)
writeFileSync(join(distDir, '.nojekyll'), '');
console.log('Created .nojekyll');
