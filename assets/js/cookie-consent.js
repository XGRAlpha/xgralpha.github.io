(function () {
  var header = document.querySelector('.top-header');

  if (header && !header.querySelector('.brand-link')) {
    var text = (header.textContent || '').trim() || 'XGreat';
    header.textContent = '';

    var link = document.createElement('a');
    link.className = 'brand-link';
    link.href = 'index.html';
    link.setAttribute('aria-label', 'Voltar para a página inicial da XGreat');
    link.textContent = text;

    header.appendChild(link);
  }
})();

(function () {
  var navbars = document.querySelectorAll('.navbar');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navbars.forEach(function (navbar) {
    if (navbar.querySelector('.nav-dropdown')) return;

    var links = Array.prototype.slice.call(navbar.querySelectorAll('a'));
    var frontLink = links.find(function (link) {
      return (link.textContent || '').trim().toLowerCase() === 'frentes';
    });

    if (!frontLink) return;

    var dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';

    var trigger = document.createElement('button');
    trigger.className = 'nav-dropdown__trigger';
    trigger.type = 'button';
    trigger.textContent = 'Frentes';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    var menu = document.createElement('div');
    menu.className = 'nav-dropdown__menu';

    var digital = document.createElement('a');
    digital.href = 'xgr-digital.html';
    digital.textContent = 'XGR Digital';

    var automacao = document.createElement('a');
    automacao.href = 'xgr-automacao-bi.html';
    automacao.textContent = 'XGR Automação & BI';

    if (currentPath === 'xgr-digital.html') digital.className = 'active';
    if (currentPath === 'xgr-automacao-bi.html') automacao.className = 'active';

    menu.appendChild(digital);
    menu.appendChild(automacao);
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);

    frontLink.replaceWith(dropdown);

    dropdown.addEventListener('mouseenter', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('mouseleave', function () {
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function () {
  var storageKey = 'xgr_cookie_choice';
  var banner = document.getElementById('xgrCookieBanner');
  var acceptBtn = document.getElementById('xgrCookieAccept');
  var rejectBtn = document.getElementById('xgrCookieReject');

  if (!banner || !acceptBtn || !rejectBtn) return;

  function hideBanner() {
    banner.classList.remove('show');
  }

  function showBanner() {
    banner.classList.add('show');
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
      console.warn('Não foi possível salvar a preferência de cookies.', e);
    }
  }

  function getChoice() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  var choice = getChoice();

  if (!choice) {
    showBanner();
  }

  acceptBtn.addEventListener('click', function () {
    saveChoice('accepted');
    hideBanner();
  });

  rejectBtn.addEventListener('click', function () {
    saveChoice('rejected');
    hideBanner();
  });
})();
