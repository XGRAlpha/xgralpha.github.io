(function(){
  var nodes=document.querySelectorAll('[data-b64-src]');
  if(!nodes.length)return;
  nodes.forEach(function(node){
    fetch(node.getAttribute('data-b64-src'))
      .then(function(response){return response.text();})
      .then(function(b64){node.src='data:image/webp;base64,'+b64.trim();})
      .catch(function(){node.classList.add('is-image-error');});
  });
})();
