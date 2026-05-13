const fs = require('fs');
const { execSync } = require('child_process');

// Install marked if needed
try {
  require.resolve('marked');
} catch (e) {
  execSync('npm install marked', {stdio: 'inherit'});
}

const { marked } = require('marked');

const md = fs.readFileSync('../Riepilogo_Allineamento/Report_Progressi_CCNA_SNOC.md', 'utf8');
const css = fs.readFileSync('pdf_style.css', 'utf8');

let htmlContent = marked.parse(md);

const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Progressi CCNA - Isabelle</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
    ${css}
    /* Custom report adjustments */
    h1 { border-bottom: 6px solid var(--primary); }
    .progress-card {
        background: var(--primary-light);
        padding: 20px;
        border-radius: 12px;
        margin: 20px 0;
        border-left: 6px solid var(--primary);
    }
    </style>
</head>
<body>
    <div class="container">
        <aside class="sidebar" id="sidebar">
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-top: 0; color: var(--primary);">CCNA Progress</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Training Report 2026</p>
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
                    e.preventDefault();
                    header.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, null, '#' + id);
                });

                toc.appendChild(link);
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync('../Riepilogo_Allineamento/Report_Progressi_CCNA_SNOC.html', fullHtml);
console.log("Progress Report HTML generated successfully.");
