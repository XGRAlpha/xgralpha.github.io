(function(){
  var brand=document.querySelector('.brand__mark');
  if(brand){
    brand.textContent='';
    brand.style.backgroundImage="url('assets/img/logo-missao.svg')";
    brand.style.backgroundSize='cover';
    brand.style.backgroundPosition='center';
    brand.style.backgroundRepeat='no-repeat';
  }

  var style=document.createElement('style');
  style.textContent=".instagram-float{display:none!important}.nav a[href='index.html']{order:1}.nav a[href='como-ajudar.html']{order:2}.nav a[href='transparencia.html']{order:3}.nav a[href='contato.html']{order:4}.nav a[href='sobre.html']{order:5}";
  document.head.appendChild(style);

  var banner=document.getElementById('cookieBanner');
  if(!banner)return;
  var key='missaoRuaCookieConsent';
  if(localStorage.getItem(key)){banner.classList.add('is-hidden');return;}
  var accept=document.getElementById('cookieAccept');
  var reject=document.getElementById('cookieReject');
  function close(value){localStorage.setItem(key,value);banner.classList.add('is-hidden');}
  if(accept)accept.addEventListener('click',function(){close('accepted');});
  if(reject)reject.addEventListener('click',function(){close('rejected');});
})();
