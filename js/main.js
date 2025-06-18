document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll per tutti i link che puntano a sezioni interne
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Aggiorna la URL senza ricaricare
        history.pushState(null, null, link.getAttribute('href'));
      }
    });
  });

  // 2. Evidenziazione del link di navigazione attivo on-scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(sec => {
      const offsetTop = sec.offsetTop;
      if (pageYOffset >= offsetTop - 80) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  // trigger iniziale nel caso la pagina parta già scrollata
  updateActiveLink();
});
