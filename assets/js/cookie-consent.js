(function () {
  function normalizeHeader() {
    var header = document.querySelector('.top-header');
    if (!header || header.querySelector('.brand-link')) return;

    var text = (header.textContent || '').trim() || 'XGreat';
    header.textContent = '';

    var link = document.createElement('a');
    link.className = 'brand-link';
    link.href = 'index.html';
    link.setAttribute('aria-label', 'Voltar para a página inicial da XGreat');
    link.textContent = text;

    header.appendChild(link);
  }

  function createDropdown() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
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

    dropdown.addEventListener('mouseenter', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });
    dropdown.addEventListener('mouseleave', function () {
      trigger.setAttribute('aria-expanded', 'false');
    });

    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      dropdown.classList.toggle('is-open', !expanded);
    });

    return dropdown;
  }

  function normalizeNav() {
    var navbars = document.querySelectorAll('.navbar');

    navbars.forEach(function (navbar) {
      if (navbar.querySelector('.nav-dropdown')) return;

      var links = Array.prototype.slice.call(navbar.querySelectorAll('a'));
      var frontLink = links.find(function (link) {
        return (link.textContent || '').trim().toLowerCase() === 'frentes';
      });

      if (frontLink) {
        frontLink.replaceWith(createDropdown());
        return;
      }

      var inicioLink = links.find(function (link) {
        var text = (link.textContent || '').trim().toLowerCase();
        return text === 'início' || text === 'inicio';
      });

      var solucoesLink = links.find(function (link) {
        var text = (link.textContent || '').trim().toLowerCase();
        return text === 'soluções' || text === 'solucoes';
      });

      if (inicioLink && solucoesLink) {
        navbar.insertBefore(createDropdown(), solucoesLink);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      normalizeHeader();
      normalizeNav();
    });
  } else {
    normalizeHeader();
    normalizeNav();
  }
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

(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var landingPages = [
    'modelo-negocio-local.html',
    'modelo-comida-local.html',
    'modelo-estetica-saude.html',
    'modelo-moda-local.html',
    'modelo-petshop-local.html'
  ];

  if (landingPages.indexOf(path) === -1) return;

  function applyPremiumModelStyles() {
    var style = document.createElement('style');
    style.setAttribute('data-xgr-premium-models', 'true');
    style.textContent = `
      body[class*="page-modelo-"] .hero,
      body[class*="page-modelo-"] .section,
      body[class*="page-modelo-"] .promo-banner,
      body[class*="page-modelo-"] .lead-demo,
      body[class*="page-modelo-"] .care-strip {
        max-width: min(1500px, calc(100% - 96px)) !important;
      }

      body[class*="page-modelo-"] .hero-box {
        border-radius: 30px !important;
      }

      body[class*="page-modelo-"] .hero-photo,
      body[class*="page-modelo-"] .editorial-photo,
      body[class*="page-modelo-"] .care-photo {
        min-height: 500px !important;
      }

      body[class*="page-modelo-"] .hero-photo img,
      body[class*="page-modelo-"] .editorial-photo img,
      body[class*="page-modelo-"] .care-photo img {
        min-height: 500px !important;
      }

      body[class*="page-modelo-"] .cards,
      body[class*="page-modelo-"] .cards-3 {
        gap: 28px !important;
      }

      body[class*="page-modelo-"] .promo-banner img {
        min-height: 340px;
        object-fit: cover;
      }

      body.page-modelo-negocio-local .hero,
      body.page-modelo-negocio-local .section {
        max-width: min(1420px, calc(100% - 96px)) !important;
      }

      body.page-modelo-negocio-local .barber-editorial {
        max-width: min(1420px, calc(100% - 96px));
        margin: 0 auto 64px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 28px;
        align-items: stretch;
      }

      body.page-modelo-comida-local .food-editorial,
      body.page-modelo-estetica-saude .clinic-editorial {
        max-width: min(1500px, calc(100% - 96px));
        margin: 0 auto 64px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        gap: 28px;
        align-items: stretch;
        padding: 0 20px;
      }

      body.page-modelo-negocio-local .barber-editorial__text,
      body.page-modelo-comida-local .food-editorial__text,
      body.page-modelo-estetica-saude .clinic-editorial__text {
        border-radius: 28px;
        padding: 34px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 22px 55px rgba(0,0,0,.16);
      }

      body.page-modelo-negocio-local .barber-editorial__text { background: rgba(10,10,14,.82); color: #fff; border: 1px solid rgba(245,215,110,.16); }
      body.page-modelo-comida-local .food-editorial__text { background: #2d1b12; color: #fff8ef; }
      body.page-modelo-estetica-saude .clinic-editorial__text { background: #0d3b38; color: #fff; }

      body.page-modelo-negocio-local .barber-editorial__text h2,
      body.page-modelo-comida-local .food-editorial__text h2,
      body.page-modelo-estetica-saude .clinic-editorial__text h2 {
        margin: 0 0 12px;
        font-size: 1.85rem;
        color: inherit;
      }

      body.page-modelo-negocio-local .barber-editorial__text p,
      body.page-modelo-comida-local .food-editorial__text p,
      body.page-modelo-estetica-saude .clinic-editorial__text p {
        margin: 0;
        line-height: 1.75;
        color: inherit;
        opacity: .9;
      }

      body.page-modelo-negocio-local .barber-editorial__image,
      body.page-modelo-comida-local .food-editorial__image,
      body.page-modelo-estetica-saude .clinic-editorial__image {
        border-radius: 28px;
        overflow: hidden;
        min-height: 430px;
        box-shadow: 0 22px 55px rgba(0,0,0,.16);
      }

      body.page-modelo-negocio-local .barber-editorial__image img,
      body.page-modelo-comida-local .food-editorial__image img,
      body.page-modelo-estetica-saude .clinic-editorial__image img {
        width: 100%;
        height: 100%;
        min-height: 430px;
        display: block;
        object-fit: cover;
      }

      @media (max-width: 900px) {
        body[class*="page-modelo-"] .hero,
        body[class*="page-modelo-"] .section,
        body[class*="page-modelo-"] .promo-banner,
        body[class*="page-modelo-"] .lead-demo,
        body[class*="page-modelo-"] .care-strip,
        body.page-modelo-negocio-local .barber-editorial,
        body.page-modelo-comida-local .food-editorial,
        body.page-modelo-estetica-saude .clinic-editorial {
          max-width: calc(100% - 28px) !important;
        }

        body.page-modelo-negocio-local .barber-editorial,
        body.page-modelo-comida-local .food-editorial,
        body.page-modelo-estetica-saude .clinic-editorial {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function swapEditorialImages() {
    var swaps = {
      'modelo-moda-local.html': [
        ['.editorial-photo img', 'editorial-moda-xgr.png'],
        ['.promo-banner img', 'banner-moda-xgr.png']
      ],
      'modelo-petshop-local.html': [
        ['.care-photo img', 'editorial-petshop-xgr.png'],
        ['.promo-banner img', 'banner-petshop-xgr.png']
      ]
    };

    (swaps[path] || []).forEach(function (item) {
      var img = document.querySelector(item[0]);
      if (img) img.src = item[1];
    });
  }

  function insertEditorialSections() {
    var configs = {
      'modelo-negocio-local.html': {
        className: 'barber-editorial',
        image: 'editorial-barbearia-xgr.png',
        title: 'Ambiente, estilo e serviço no mesmo lugar',
        text: 'Esta seção pode mostrar fotos reais da barbearia, detalhes do atendimento, cadeira, ferramentas, espaço físico e diferenciais. É o tipo de bloco que transforma “faço corte” em presença profissional.'
      },
      'modelo-comida-local.html': {
        className: 'food-editorial',
        image: 'editorial-comida-xgr.png',
        title: 'Imagem que dá fome e organiza o pedido',
        text: 'Aqui entram fotos reais do cardápio, produtos de maior saída, combos, encomendas e campanha da semana. Comida precisa parecer boa antes do cliente pedir, uma descoberta que alguns cardápios ainda tratam como segredo militar.'
      },
      'modelo-estetica-saude.html': {
        className: 'clinic-editorial',
        image: 'editorial-estetica-saude-xgr.png',
        title: 'Confiança antes do agendamento',
        text: 'Esta área pode mostrar ambiente, equipamentos, cuidado visual, equipe, credenciais e diferenciais da clínica. Para saúde e estética, limpeza visual vende segurança antes da primeira mensagem.'
      }
    };

    var cfg = configs[path];
    if (!cfg || document.querySelector('.' + cfg.className)) return;

    var anchor = document.querySelector('.promo-banner') || document.querySelector('.lead-demo') || document.querySelector('.cta');
    if (!anchor || !anchor.parentNode) return;

    var section = document.createElement('section');
    section.className = cfg.className;
    section.innerHTML = '<article class="' + cfg.className + '__text"><h2>' + cfg.title + '</h2><p>' + cfg.text + '</p></article><figure class="' + cfg.className + '__image"><img src="' + cfg.image + '" alt="Imagem editorial do modelo de landing page"></figure>';

    anchor.parentNode.insertBefore(section, anchor);
  }

  function run() {
    applyPremiumModelStyles();
    swapEditorialImages();
    insertEditorialSections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
