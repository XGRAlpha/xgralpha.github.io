(function(){
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

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
