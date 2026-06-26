(function(){
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  function injectTypography(){
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
      :root{
        --font-title:'Sora',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        --font-body:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      }
      body{font-family:var(--font-body);font-weight:500;letter-spacing:-.01em;}
      .hero-copy h1{
        font-family:var(--font-title);
        font-size:clamp(2.75rem,5.15vw,5.35rem);
        line-height:.98;
        letter-spacing:-.065em;
        font-weight:800;
        max-width:780px;
      }
      .section-head h2,.section-copy h2,.contact-card h2,.final-cta h2{
        font-family:var(--font-title);
        font-size:clamp(2rem,3.65vw,3.45rem);
        line-height:1.04;
        letter-spacing:-.055em;
        font-weight:800;
      }
      .brand-copy strong,.brand-mark,.trust-grid strong,.about-list strong,.feature-grid strong,.service-card h3,.problem-card h3,.step h3,.testimonial strong,.product-grid div,.hero-service-card strong,.floating-proof strong{
        font-family:var(--font-title);
        font-weight:700;
        letter-spacing:-.035em;
      }
      .eyebrow,.section-kicker,.media-slot span,.media-placeholder span,.hero-service-card span,.main-nav a,.btn{
        font-family:var(--font-title);
        font-weight:700;
        letter-spacing:.055em;
      }
      .main-nav a,.btn{letter-spacing:.015em;}
      .hero-copy p,.section-head p,.section-copy p,.final-cta p{font-weight:500;letter-spacing:-.015em;}
      @media (max-width:560px){
        .hero-copy h1{font-size:clamp(2.45rem,12vw,3.35rem);line-height:1;}
        .section-head h2,.section-copy h2,.contact-card h2,.final-cta h2{font-size:clamp(1.95rem,9vw,2.6rem);}
      }
    `;
    document.head.appendChild(style);
  }

  injectTypography();

  function setHeaderState(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  function mediaFallback(src){
    if(!src) return null;
    if(src.endsWith('.jpg')) return src.replace(/\.jpg$/, '.png');
    if(src.endsWith('.jpeg')) return src.replace(/\.jpeg$/, '.png');
    return null;
  }

  function preloadImage(src){
    return new Promise(function(resolve, reject){
      if(!src) return reject();
      const img = new Image();
      img.onload = function(){ resolve(src); };
      img.onerror = reject;
      img.src = src;
    });
  }

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if(menuToggle && nav){
    menuToggle.addEventListener('click', function(){
      const opened = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function loadBackground(slot){
    const src = slot.getAttribute('data-bg');
    const fallback = mediaFallback(src);
    if(!src) return;

    preloadImage(src)
      .catch(function(){
        return fallback ? preloadImage(fallback) : Promise.reject();
      })
      .then(function(loadedSrc){
        slot.style.backgroundImage = "url('" + loadedSrc + "')";
        slot.classList.add('is-loaded');
        slot.classList.remove('is-missing');
      })
      .catch(function(){
        slot.classList.add('is-missing');
      });
  }

  document.querySelectorAll('[data-bg]').forEach(loadBackground);

  function loadHeroVideo(hero){
    const videoSrc = hero.getAttribute('data-video');
    const posterSrc = hero.getAttribute('data-poster');
    const posterFallback = mediaFallback(posterSrc);
    if(!videoSrc) return;

    fetch(videoSrc, { method: 'HEAD' })
      .then(function(response){
        if(!response.ok) throw new Error('video missing');
        const video = document.createElement('video');
        video.src = videoSrc;
        if(posterSrc) video.poster = posterFallback || posterSrc;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('aria-hidden', 'true');
        hero.prepend(video);
        hero.classList.add('has-video');
      })
      .catch(function(){
        if(!posterSrc) return;

        preloadImage(posterSrc)
          .catch(function(){
            return posterFallback ? preloadImage(posterFallback) : Promise.reject();
          })
          .then(function(loadedSrc){
            hero.style.backgroundImage = "url('" + loadedSrc + "')";
            hero.classList.add('has-poster');
          })
          .catch(function(){
            hero.classList.add('is-missing');
          });
      });
  }

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
    }, { threshold: 0.13 });

    revealItems.forEach(function(item){ observer.observe(item); });
  } else {
    revealItems.forEach(function(item){ item.classList.add('is-visible'); });
  }
})();
