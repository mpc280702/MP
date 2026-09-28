const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const ignoredPrefixes = [
  '#',
  'mailto:',
  'tel:',
  'javascript:',
  'data:',
  'http://',
  'https://',
  '//'
];

function isIgnored(value) {
  return ignoredPrefixes.some((prefix) =>
    value.startsWith(prefix)
  );
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true
  })) {
    if (
      entry.name === '.git' ||
      entry.name === 'node_modules'
    ) continue;

    const fullPath =
      path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else {
      out.push(fullPath);
    }
  }

  return out;
}

function extractRefs(html) {
  const refs = [];
  const regex =
    /(?:href|src)=["']([^"']+)["']/gi;

  let match;

  while ((match = regex.exec(html))) {
    refs.push(match[1]);
  }

  return refs;
}

const htmlFiles =
  walk(ROOT).filter((file) =>
    file.endsWith('.html')
  );

const missing = [];
const checked = new Set();

for (const htmlFile of htmlFiles) {
  const html =
    fs.readFileSync(
      htmlFile,
      'utf8'
    );

  const refs =
    extractRefs(html);

  for (const ref of refs) {
    const clean =
      ref.split('#')[0]
        .split('?')[0];

    if (
      !clean ||
      isIgnored(clean)
    ) continue;

    const target =
      path.resolve(
        path.dirname(htmlFile),
        clean
      );

    const key =
      `${htmlFile} -> ${target}`;

    if (checked.has(key)) continue;
    checked.add(key);

    if (!fs.existsSync(target)) {
      missing.push({
        source: path.relative(
          ROOT,
          htmlFile
        ),
        reference: clean
      });
    }
  }
}

console.log(
  `Checked ${htmlFiles.length} HTML file(s).`
);

if (missing.length) {
  console.error(
    `Found ${missing.length} missing local reference(s):`
  );

  for (const item of missing) {
    console.error(
      `- ${item.source} -> ${item.reference}`
    );
  }

  process.exit(1);
}

console.log(
  'No missing local HTML asset/link references found.'
);
