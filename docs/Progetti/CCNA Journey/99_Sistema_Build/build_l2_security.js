const fs = require('fs');
const { marked } = require('marked');

const md = fs.readFileSync('../02_Knowledge_Base/L2_Security_Advanced_DAI_IPSG.md', 'utf8');
const css = fs.readFileSync('pdf_style.css', 'utf8');

let htmlContent = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced L2 Security - CCNA Journey</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
    ${css}
    </style>
</head>
<body>
    <div class="container">
        <main style="max-width: 900px; margin: 0 auto;">
            <article id="content">
                ${htmlContent}
            </article>
        </main>
    </div>
</body>
</html>`;

fs.writeFileSync('../02_Knowledge_Base/L2_Security_Advanced_DAI_IPSG.html', fullHtml);
console.log("Advanced L2 Security HTML generated successfully.");
