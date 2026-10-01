const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const voidElements = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

const voidRegex = new RegExp(
  `<(${voidElements.join('|')})\\b([^>]*?)\\s*\\/>`,
  'gi'
);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else if (fullPath.endsWith('.html')) {
      out.push(fullPath);
    }
  }
  return out;
}

const htmlFiles = walk(ROOT);

let totalVoidFixed = 0;
let totalTrailingFixed = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix void element self-closing slashes
  let voidCount = 0;
  content = content.replace(voidRegex, (match, tag, attrs) => {
    voidCount++;
    return `<${tag}${attrs}>`;
  });

  // Remove trailing whitespace
  const lines = content.split(/\r?\n/);
  let trailingCount = 0;
  const cleanedLines = lines.map(line => {
    const trimmed = line.replace(/[ \t]+$/, '');
    if (trimmed !== line) trailingCount++;
    return trimmed;
  });

  const newContent = cleanedLines.join('\n');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${path.relative(ROOT, filePath)}: ${voidCount} void tags fixed, ${trailingCount} lines whitespace trimmed.`);
    totalVoidFixed += voidCount;
    totalTrailingFixed += trailingCount;
  }
}

console.log(`Done! Fixed total ${totalVoidFixed} void tags and ${totalTrailingFixed} lines with trailing whitespace across ${htmlFiles.length} files.`);
