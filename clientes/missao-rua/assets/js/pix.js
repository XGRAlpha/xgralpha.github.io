(function(){
  var buttons=document.querySelectorAll('[data-copy-pix]');
  if(!buttons.length)return;
  buttons.forEach(function(button){
    button.addEventListener('click',function(){
      var value=button.getAttribute('data-copy-pix');
      var status=document.querySelector(button.getAttribute('data-copy-target')||'');
      function done(){if(status)status.textContent='Chave Pix copiada.';}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(value).then(done).catch(done);}else{var input=document.createElement('input');input.value=value;document.body.appendChild(input);input.select();document.execCommand('copy');document.body.removeChild(input);done();}
    });
  });
})();
