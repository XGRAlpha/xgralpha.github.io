const year=document.querySelector('#year');if(year){year.textContent=new Date().getFullYear();}

const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelectorAll('.site-nav a');
if(menuToggle){menuToggle.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menuToggle.setAttribute('aria-expanded',String(open));});}
navLinks.forEach(link=>{link.addEventListener('click',()=>{document.body.classList.remove('menu-open');if(menuToggle){menuToggle.setAttribute('aria-expanded','false');}});});

const modal=document.querySelector('#imageModal');
const modalImg=modal?modal.querySelector('img'):null;
const modalCaption=modal?modal.querySelector('p'):null;
const modalClose=modal?modal.querySelector('.modal-close'):null;
const clickableImages=document.querySelectorAll('.service-card img,.featured-item img,.gallery-grid img');

function openImageModal(img){
  if(!modal||!modalImg)return;
  modalImg.src=img.currentSrc||img.src;
  modalImg.alt=img.alt||'Imagem ampliada';
  if(modalCaption){modalCaption.textContent=img.alt||'';}
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}

function closeImageModal(){
  if(!modal)return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  if(modalImg){modalImg.src='';}
}

clickableImages.forEach(img=>{img.addEventListener('click',()=>openImageModal(img));});
if(modalClose){modalClose.addEventListener('click',closeImageModal);}
if(modal){modal.addEventListener('click',(event)=>{if(event.target===modal){closeImageModal();}});}
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'){closeImageModal();}});