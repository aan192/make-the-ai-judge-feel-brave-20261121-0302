import fs from 'node:fs';
import path from 'node:path';

function main() {
  const sourcePath = path.resolve('entry-source.txt');
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: entry-source.txt not found at ${sourcePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(sourcePath, 'utf8');

  // Validate length and whitespace
  if (content.length === 0 || content.length > 280) {
    console.error(`Error: Entry text length must be between 1 and 280 characters. Got ${content.length}.`);
    process.exit(1);
  }

  if (content.trim().length === 0) {
    console.error('Error: Entry text cannot consist solely of whitespace.');
    process.exit(1);
  }

  const outputDir = '/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'entry.txt');
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`Successfully validated and wrote entry to ${outputPath}`);
}

main();
