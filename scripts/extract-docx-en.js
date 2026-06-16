const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const scriptsDir = __dirname;

const articles = [
  {
    src: 'Article for Valesco Oil.docx',
    out: 'article-en-1.txt',
  },
  {
    src: 'Article_mineral,_semi-synthetic_and_synthetic.docx',
    out: 'article-en-2.txt',
  },
  {
    src: 'The Meaning Behind 5W-30.docx',
    out: 'article-en-3.txt',
  },
];

function extractDocx(docxPath) {
  const fullPath = path.join(scriptsDir, docxPath);
  const ps = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead('${fullPath.replace(/'/g, "''")}')
$e = $z.GetEntry('word/document.xml')
$r = New-Object System.IO.StreamReader($e.Open(), [System.Text.Encoding]::UTF8)
$x = $r.ReadToEnd()
$r.Close()
$z.Dispose()
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Write-Output $x
`;
  return execSync(`powershell -NoProfile -Command "${ps.replace(/\r?\n/g, '; ')}"`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    cwd: scriptsDir,
  });
}

function xmlToText(xml) {
  return xml
    .replace(/<w:tab[^/]*\/>/g, '\t')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

for (const article of articles) {
  const srcPath = path.join(root, article.src);
  const dstPath = path.join(scriptsDir, path.basename(article.src));
  fs.copyFileSync(srcPath, dstPath);

  const xml = extractDocx(path.basename(article.src));
  const text = xmlToText(xml);
  fs.writeFileSync(path.join(scriptsDir, article.out), text, 'utf8');
  console.log('Extracted:', article.out, 'chars:', text.length);
  console.log('Title:', text.split('\n')[0]);
}
