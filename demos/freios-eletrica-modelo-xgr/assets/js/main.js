(function(){
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const whatsapp = document.querySelector('.whatsapp-float');
  let backToTop = null;

  function addStyles(){
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = 'assets/img/Favicom_FE.png?v=1';
    document.head.appendChild(favicon);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = 'assets/img/Favicom_FE.png?v=1';
    document.head.appendChild(appleIcon);

    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap';
    document.head.appendChild(fonts);

    const css = document.createElement('style');
    css.textContent = `
      :root{--font-title:'Sora',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--font-body:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
      body{font-family:var(--font-body);font-weight:500;letter-spacing:-.01em;}
      .hero-copy h1{font-family:var(--font-title);font-size:clamp(2.75rem,5.15vw,5.35rem);line-height:.98;letter-spacing:-.065em;font-weight:800;max-width:780px;}
      .section-head h2,.section-copy h2,.contact-card h2,.final-cta h2{font-family:var(--font-title);font-size:clamp(2rem,3.65vw,3.45rem);line-height:1.04;letter-spacing:-.055em;font-weight:800;}
      .brand-copy strong,.brand-mark,.trust-grid strong,.about-list strong,.feature-grid strong,.service-card h3,.problem-card h3,.step h3,.testimonial strong,.product-grid div,.hero-service-card strong,.floating-proof strong{font-family:var(--font-title);font-weight:700;letter-spacing:-.035em;}
      .eyebrow,.section-kicker,.media-slot span,.media-placeholder span,.hero-service-card span,.main-nav a,.btn{font-family:var(--font-title);font-weight:700;letter-spacing:.055em;}
      .main-nav a,.btn{letter-spacing:.015em;}
      .hero-copy p,.section-head p,.section-copy p,.final-cta p{font-weight:500;letter-spacing:-.015em;}
      .hero-media.has-video .media-placeholder,.hero-media.has-poster .media-placeholder{display:none;}
      .hero-media.has-poster{background-size:cover;background-position:center;}
      .hero-media video{z-index:0;}.hero-media .hero-service-card{z-index:3;}
      .whatsapp-float{position:fixed!important;right:22px!important;bottom:22px!important;width:64px!important;height:64px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;line-height:0!important;overflow:visible!important;font-size:0!important;z-index:10000!important;}
      .whatsapp-float::before,.whatsapp-float::after{content:none!important;display:none!important;}
      .whatsapp-float img{width:52px!important;height:52px!important;display:block!important;object-fit:contain!important;filter:drop-shadow(0 0 6px rgba(37,211,102,.35)) drop-shadow(0 6px 14px rgba(0,0,0,.35));}
      .whatsapp-float:hover{transform:translateY(-3px) scale(1.06)!important;filter:brightness(1.08)!important;}
      .back-to-top{position:fixed;left:50%;bottom:24px;transform:translate(-50%,10px);z-index:88;height:44px;padding:0 15px 0 12px;border-radius:999px;display:flex;align-items:center;justify-content:center;gap:7px;background:rgba(12,13,16,.82);color:#fff;border:1px solid rgba(255,255,255,.16);box-shadow:0 16px 34px rgba(0,0,0,.24);backdrop-filter:blur(12px);font-family:var(--font-title);font-size:.76rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;opacity:0;pointer-events:none;transition:opacity .25s ease,transform .25s ease,background .25s ease;}
      .back-to-top.is-visible{opacity:.92;pointer-events:auto;transform:translate(-50%,0);}
      .back-to-top:hover{background:rgba(25,28,34,.96);opacity:1;}
      .back-to-top .arrow{font-size:1.05rem;line-height:1;transform:translateY(-1px);}
      @media(max-width:560px){.hero-copy h1{font-size:clamp(2.45rem,12vw,3.35rem);line-height:1;}.section-head h2,.section-copy h2,.contact-card h2,.final-cta h2{font-size:clamp(1.95rem,9vw,2.6rem);}.whatsapp-float{right:14px!important;bottom:14px!important;width:58px!important;height:58px!important;}.whatsapp-float img{width:46px!important;height:46px!important;}.back-to-top{bottom:18px;height:42px;padding:0 13px 0 11px;font-size:.72rem;}}
    `;
    document.head.appendChild(css);
  }

  function setupFloating(){
    if(whatsapp){
      whatsapp.setAttribute('aria-label','Falar no WhatsApp');
      whatsapp.setAttribute('title','Falar no WhatsApp');
      whatsapp.innerHTML = '<img src="assets/img/whatsapp-xgr.svg" alt="" aria-hidden="true">';
    }

    backToTop = document.querySelector('.back-to-top');
    if(!backToTop){
      backToTop = document.createElement('a');
      backToTop.className = 'back-to-top';
      backToTop.href = '#inicio';
      backToTop.setAttribute('aria-label','Voltar ao topo');
      backToTop.setAttribute('title','Voltar ao topo');
      backToTop.innerHTML = '<span class="arrow" aria-hidden="true">↑</span><span>Topo</span>';
      document.body.appendChild(backToTop);
    }
  }

  function updateFixedItems(){
    if(header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if(backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 480);
  }

  function fallbackImage(src){
    if(!src) return null;
    if(src.endsWith('.jpg')) return src.replace(/\.jpg$/, '.png');
    if(src.endsWith('.jpeg')) return src.replace(/\.jpeg$/, '.png');
    return null;
  }

  function imageReady(src){
    return new Promise(function(resolve, reject){
      if(!src) return reject();
      const img = new Image();
      img.onload = function(){ resolve(src); };
      img.onerror = reject;
      img.src = src;
    });
  }

  function loadBackground(slot){
    const src = slot.getAttribute('data-bg');
    const fallback = fallbackImage(src);
    if(!src) return;

    imageReady(src)
      .catch(function(){ return fallback ? imageReady(fallback) : Promise.reject(); })
      .then(function(loaded){
        slot.style.backgroundImage = "url('" + loaded + "')";
        slot.classList.add('is-loaded');
        slot.classList.remove('is-missing');
      })
      .catch(function(){ slot.classList.add('is-missing'); });
  }

  function showPoster(hero, poster, fallback){
    if(!poster) return;
    imageReady(poster)
      .catch(function(){ return fallback ? imageReady(fallback) : Promise.reject(); })
      .then(function(loaded){
        hero.style.backgroundImage = "url('" + loaded + "')";
        hero.classList.add('has-poster');
      })
      .catch(function(){ hero.classList.add('is-missing'); });
  }

  function loadHeroVideo(hero){
    const videoSrc = hero.getAttribute('data-video');
    const poster = hero.getAttribute('data-poster');
    const fallback = fallbackImage(poster);
    if(!videoSrc) return showPoster(hero, poster, fallback);

    const video = document.createElement('video');
    video.src = videoSrc;
    if(poster) video.poster = fallback || poster;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('aria-hidden','true');
    video.addEventListener('canplay', function(){
      hero.prepend(video);
      hero.classList.add('has-video');
      video.play().catch(function(){});
    }, { once:true });
    video.addEventListener('error', function(){ showPoster(hero, poster, fallback); }, { once:true });
    video.load();
  }

  addStyles();
  setupFloating();
  updateFixedItems();
  window.addEventListener('scroll', updateFixedItems, { passive:true });

  if(menuToggle && nav){
    menuToggle.addEventListener('click', function(){
      const opened = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  document.querySelectorAll('[data-bg]').forEach(loadBackground);
  document.querySelectorAll('[data-video]').forEach(loadHeroVideo);

  const revealItems = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.13 });
    revealItems.forEach(function(item){ observer.observe(item); });
  }else{
    revealItems.forEach(function(item){ item.classList.add('is-visible'); });
  }
})();
