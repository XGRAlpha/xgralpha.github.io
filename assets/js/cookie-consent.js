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
    dropdown.addEventListener('mouseenter', function () { trigger.setAttribute('aria-expanded', 'true'); });
    dropdown.addEventListener('mouseleave', function () { trigger.setAttribute('aria-expanded', 'false'); });
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      dropdown.classList.toggle('is-open', !expanded);
    });
    return dropdown;
  }

  function normalizeNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar').forEach(function (navbar) {
      if (!navbar.querySelector('.nav-dropdown')) {
        var links = Array.prototype.slice.call(navbar.querySelectorAll('a'));
        var frontLink = links.find(function (link) { return (link.textContent || '').trim().toLowerCase() === 'frentes'; });
        var solucoesLink = links.find(function (link) {
          var text = (link.textContent || '').trim().toLowerCase();
          return text === 'soluções' || text === 'solucoes';
        });
        if (frontLink) frontLink.replaceWith(createDropdown());
        else if (solucoesLink) navbar.insertBefore(createDropdown(), solucoesLink);
      }

      var hasDiag = Array.prototype.slice.call(navbar.querySelectorAll('a')).some(function (link) {
        return (link.getAttribute('href') || '').indexOf('diagnostico-xgreat.html') !== -1;
      });
      if (!hasDiag) {
        var diag = document.createElement('a');
        diag.href = 'diagnostico-xgreat.html';
        diag.textContent = 'Diagnóstico';
        if (currentPath === 'diagnostico-xgreat.html') diag.className = 'active';
        var projetos = Array.prototype.slice.call(navbar.querySelectorAll('a')).find(function (link) { return (link.getAttribute('href') || '') === 'projetos.html'; });
        if (projetos) navbar.insertBefore(diag, projetos);
        else navbar.appendChild(diag);
      }
    });
  }

  function normalizeFooter() {
    document.querySelectorAll('.xgr-site-footer__links').forEach(function (footerLinks) {
      var hasDiag = Array.prototype.slice.call(footerLinks.querySelectorAll('a')).some(function (link) {
        return (link.getAttribute('href') || '').indexOf('diagnostico-xgreat.html') !== -1;
      });
      if (hasDiag) return;
      var diag = document.createElement('a');
      diag.href = 'diagnostico-xgreat.html';
      diag.textContent = 'Diagnóstico Digital';
      footerLinks.insertBefore(diag, footerLinks.firstChild);
    });
  }

  function addViaVidrosCase() {
    if (!document.body.classList.contains('page-projetos')) return;
    var cases = document.querySelector('#cases-publicados .cards');
    if (!cases || document.querySelector('[data-xgr-case="via-vidros"]')) return;
    var article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('data-xgr-case', 'via-vidros');
    article.innerHTML = '<button class="case-thumb" type="button" data-image="clientes/via-vidros/assets/img/ViaVidros_Portfolio.png" data-title="Via Vidros Ricardo Silva | Landing page local" aria-label="Ampliar imagem do case Via Vidros"><img src="clientes/via-vidros/assets/img/ViaVidros_Portfolio.png" alt="Prévia da landing page Via Vidros" loading="lazy"><span class="case-thumb-badge">Clique para ampliar</span></button><div class="case-topline"><span class="case-status">Landing page publicada</span><span class="case-brand">XGR Digital</span></div><h3>Via Vidros Ricardo Silva</h3><p class="case-summary">Landing page para negócio local de vidros, box, espelhos e instalações sob medida, criada para transformar presença básica em apresentação profissional com chamada direta para orçamento.</p><ul><li>Landing page responsiva para captação pelo WhatsApp</li><li>Galeria organizada por tipo de serviço e imagens ampliáveis</li><li>SEO básico, canonical, sitemap e dados estruturados</li><li>Base pronta para vincular ao Perfil da Empresa no Google</li></ul><div class="case-links"><a class="case-link is-primary" href="clientes/via-vidros/" target="_blank" rel="noopener noreferrer"><span>Ver landing page</span></a></div>';
    cases.appendChild(article);
  }

  function runNavigationFixes() { normalizeHeader(); normalizeNav(); normalizeFooter(); addViaVidrosCase(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runNavigationFixes);
  else runNavigationFixes();
})();

(function () {
  var storageKey = 'xgr_cookie_choice';
  var banner = document.getElementById('xgrCookieBanner');
  var acceptBtn = document.getElementById('xgrCookieAccept');
  var rejectBtn = document.getElementById('xgrCookieReject');
  if (!banner || !acceptBtn || !rejectBtn) return;
  function hideBanner() { banner.classList.remove('show'); }
  function showBanner() { banner.classList.add('show'); }
  function saveChoice(value) { try { localStorage.setItem(storageKey, value); } catch (e) { console.warn('Não foi possível salvar a preferência de cookies.', e); } }
  function getChoice() { try { return localStorage.getItem(storageKey); } catch (e) { return null; } }
  if (!getChoice()) showBanner();
  acceptBtn.addEventListener('click', function () { saveChoice('accepted'); hideBanner(); });
  rejectBtn.addEventListener('click', function () { saveChoice('rejected'); hideBanner(); });
})();

(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var swaps = {
    'modelo-moda-local.html': [['.editorial-photo img', 'editorial-moda-xgr.png'], ['.promo-banner img', 'banner-moda-xgr.png']],
    'modelo-petshop-local.html': [['.care-photo img', 'editorial-petshop-xgr.png'], ['.promo-banner img', 'banner-petshop-xgr.png']]
  };
  (swaps[path] || []).forEach(function (item) {
    var img = document.querySelector(item[0]);
    if (img) img.src = item[1];
  });
})();