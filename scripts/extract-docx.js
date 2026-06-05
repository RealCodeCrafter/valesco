const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const scriptsDir = __dirname;

const articles = [
  {
    src: 'Статья для Valesco Oil.docx',
    dst: 'article-1.docx',
    out: 'article-1.txt',
  },
  {
    src: 'Статья_минеральные,_полусинтетические_и_синтетические.docx',
    dst: 'article-2.docx',
    out: 'article-2.txt',
  },
  {
    src: 'Статья означает 5w - 30.docx',
    dst: 'article-3.docx',
    out: 'article-3.txt',
  },
];

function extractDocx(docxPath) {
  const ps = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead('${docxPath.replace(/'/g, "''")}')
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
  const dstPath = path.join(scriptsDir, article.dst);
  fs.copyFileSync(srcPath, dstPath);

  const xml = extractDocx(article.dst);
  const text = xmlToText(xml);
  fs.writeFileSync(path.join(scriptsDir, article.out), text, 'utf8');
  console.log('Extracted:', article.out, 'chars:', text.length);
  console.log('Title line:', text.split('\n')[0]);
}
