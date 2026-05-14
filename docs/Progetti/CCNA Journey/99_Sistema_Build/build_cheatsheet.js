const fs = require('fs');
const { execSync } = require('child_process');

try {
  require.resolve('marked');
} catch (e) {
  execSync('npm install marked', {stdio: 'inherit'});
}

const { marked } = require('marked');

const md = fs.readFileSync('../01_Output_Allineamento/CCNA_IOS_Commands_CheatSheet.md', 'utf8');
const css = fs.readFileSync('pdf_style.css', 'utf8');

let htmlContent = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cisco IOS Cheat Sheet - CCNA</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
    ${css}
    h2 { background: var(--primary); color: white; padding: 10px; border-radius: 4px; border-bottom: none; }
    </style>
</head>
<body>
    <div class="container">
        <aside class="sidebar" id="sidebar">
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-top: 0; color: var(--primary);">Cheat Sheet</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Cisco IOS Commands</p>
            </div>
            <nav id="toc"></nav>
        </aside>
        <main>
            <article id="content">
                ${htmlContent}
            </article>
        </main>
    </div>

    <script>
        const toc = document.getElementById('toc');
        const content = document.getElementById('content');
        const headers = content.querySelectorAll('h2, h3');
        const sidebar = document.getElementById('sidebar');

        if (headers.length > 0) {
            sidebar.style.display = 'block';
            headers.forEach((header, index) => {
                const id = 'header-' + index;
                header.id = id;
                const link = document.createElement('a');
                link.href = '#' + id;
                link.textContent = header.textContent;
                link.style.display = 'block';
                link.style.padding = '5px 0';
                link.style.fontSize = '0.8rem';
                link.style.color = 'var(--text-muted)';
                toc.appendChild(link);
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync('../01_Output_Allineamento/CCNA_IOS_Commands_CheatSheet.html', fullHtml);
console.log("Cheat Sheet HTML generated successfully.");
