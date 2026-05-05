const fs = require('fs');
const { execSync } = require('child_process');

// Install marked if needed
try {
  require.resolve('marked');
} catch (e) {
  execSync('npm install marked', {stdio: 'inherit'});
}

const { marked } = require('marked');

const md = fs.readFileSync('Mega_Lab_CCNA_Consolidation.md', 'utf8');
const css = fs.readFileSync('pdf_style.css', 'utf8');

const html = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;

fs.writeFileSync('Mega_Lab_CCNA_Consolidation.html', fullHtml);
console.log("HTML generated successfully.");
