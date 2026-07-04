(function(){
  const pages = {
    'index.html': 'inicio',
    '': 'inicio',
    'como-ajudar.html': 'como-ajudar',
    'transparencia.html': 'transparencia',
    'contato.html': 'contato',
    'sobre.html': 'sobre',
    'privacidade.html': 'privacidade',
    'cookies.html': 'cookies',
    'termos.html': 'termos'
  };

  const file = (location.pathname.split('/').pop() || 'index.html');
  const active = document.body.dataset.page || pages[file] || 'inicio';

  const nav = [
    ['inicio', 'index.html', 'Início'],
    ['como-ajudar', 'como-ajudar.html', 'Como ajudar'],
    ['transparencia', 'transparencia.html', 'Transparência'],
    ['contato', 'contato.html', 'Contato'],
    ['sobre', 'sobre.html', 'Sobre']
  ];

  const headerTarget = document.getElementById('site-header');
  if(headerTarget){
    headerTarget.innerHTML = `
      <header class="topbar">
        <div class="topbar__inner">
          <a class="brand" href="index.html" aria-label="Página inicial da Missão Rua">
            <img src="assets/img/logo-missao.svg" alt="" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:3px solid #7c3511;box-shadow:0 8px 22px rgba(126,62,16,.22);background:#ffe4a8;">
            <span class="brand__text"><strong>Missão Rua</strong><span>Juntos somos mais fortes</span></span>
          </a>
          <div class="topbar__right">
            <nav class="nav" aria-label="Menu principal">
              ${nav.map(([key,href,label]) => `<a class="${active===key?'active':''}" href="${href}">${label}</a>`).join('')}
            </nav>
            <a class="header-social" href="https://www.instagram.com/missao.rua/" target="_blank" rel="noopener noreferrer" aria-label="Instagram oficial da Missão Rua">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle></svg>
              <span class="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </header>`;
  }

  const footerTarget = document.getElementById('site-footer');
  if(footerTarget){
    footerTarget.innerHTML = `
      <footer class="footer" style="min-height:160px;padding:70px 0 18px;display:flex;align-items:flex-end;">
        <div class="footer__inner" style="align-items:end;">
          <div>
            <strong class="footer__title">Missão Rua</strong>
            <p>Juntos somos mais fortes.</p>
            <a class="footer-social" href="https://www.instagram.com/missao.rua/" target="_blank" rel="noopener noreferrer">@missao.rua</a>
          </div>
          <nav class="footer__links footer__links--policies" aria-label="Políticas">
            <a href="privacidade.html">Privacidade</a>
            <a href="cookies.html">Cookies</a>
            <a href="termos.html">Termos</a>
          </nav>
          <div>
            <strong class="footer__title">Projeto solidário</strong>
            <p class="credit">Site solidário desenvolvido por <a href="https://xgreat.com.br" target="_blank" rel="noopener noreferrer">XGR Digital</a>.</p>
          </div>
        </div>
      </footer>`;
  }
})();
