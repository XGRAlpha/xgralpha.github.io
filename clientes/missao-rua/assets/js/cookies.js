(function(){
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
