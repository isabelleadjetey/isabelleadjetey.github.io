const fs = require('fs');
const { execSync } = require('child_process');

// Install marked if needed
try {
  require.resolve('marked');
} catch (e) {
  execSync('npm install marked', {stdio: 'inherit'});
}

const { marked } = require('marked');

const md = fs.readFileSync('../01_Output_Allineamento/Mega_Lab_CCNA_Consolidation.md', 'utf8');
const css = fs.readFileSync('pdf_style.css', 'utf8');

const htmlContent = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mega Lab CCNA - Network Engineering Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
    ${css}
    </style>
</head>
<body>
    <div class="container">
        <aside class="sidebar" id="sidebar">
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-top: 0; color: var(--primary);">Mega Lab CCNA</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Network Engineering Lab</p>
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
        // Auto-generate Table of Contents
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
                link.style.fontSize = header.tagName === 'H2' ? '0.9rem' : '0.8rem';
                link.style.paddingLeft = header.tagName === 'H2' ? '0' : '15px';
                link.style.color = 'var(--text-muted)';
                link.style.fontWeight = header.tagName === 'H2' ? '600' : '400';
                
                link.addEventListener('click', (e) => {
                    // Smooth scroll
                    e.preventDefault();
                    header.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, null, '#' + id);
                });

                toc.appendChild(link);
            });
        }

        // Add Copy buttons to code blocks
        document.querySelectorAll('pre').forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.textContent = 'Copia';
            
            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.textContent = 'Copiato!';
                    setTimeout(() => { button.textContent = 'Copia'; }, 2000);
                });
            });
            
            block.appendChild(button);
        });

        // Simple Callout transformation (Optional, based on markdown content)
        // This looks for blockquotes and checks if they start with specific words
        document.querySelectorAll('blockquote').forEach(bq => {
            const text = bq.innerText.toUpperCase();
            if (text.includes('IMPORTANTE') || text.includes('ATTENZIONE')) {
                bq.className = 'callout callout-danger';
            } else if (text.includes('NOTA')) {
                bq.className = 'callout callout-info';
            } else if (text.includes('SUGGERIMENTO')) {
                bq.className = 'callout callout-warning';
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('../01_Output_Allineamento/Mega_Lab_CCNA_Consolidation.html', fullHtml);
console.log("HTML generated successfully with modern layout.");

