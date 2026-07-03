(function(){
  var nodes=document.querySelectorAll('[data-b64-src]');
  if(!nodes.length)return;
  nodes.forEach(function(node){
    fetch(node.getAttribute('data-b64-src'),{cache:'no-store'})
      .then(function(response){
        if(!response.ok){throw new Error('Imagem não encontrada');}
        return response.text();
      })
      .then(function(b64){
        var clean=b64.replace(/\s/g,'');
        if(!clean || clean.indexOf('UklG')!==0){throw new Error('Base64 inválido');}
        node.src='data:image/webp;base64,'+clean;
        node.removeAttribute('data-b64-src');
      })
      .catch(function(){
        node.classList.add('is-image-error');
        node.alt='Imagem oficial da Missão Rua indisponível no momento';
      });
  });
})();
