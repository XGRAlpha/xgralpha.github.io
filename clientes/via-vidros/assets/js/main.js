const logoFix=document.createElement('style');
logoFix.textContent=`
  .brand{width:72px!important;height:72px!important;padding:6px!important;border-radius:16px!important;background:#fff!important;box-shadow:0 8px 24px #02081740!important;}
  .brand img{width:58px!important;height:58px!important;max-width:58px!important;max-height:58px!important;object-fit:contain!important;}
  @media(max-width:560px){.brand{width:58px!important;height:58px!important;border-radius:14px!important;padding:5px!important}.brand img{width:48px!important;height:48px!important;max-width:48px!important;max-height:48px!important}}
`;
document.head.appendChild(logoFix);

const faviconHref='assets/img/Favicon_VV2.png?v=2';
document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]').forEach((link)=>{link.href=faviconHref;});
if(!document.querySelector('link[rel="icon"]')){const icon=document.createElement('link');icon.rel='icon';icon.type='image/png';icon.href=faviconHref;document.head.appendChild(icon);}

const year=document.querySelector('#year');if(year){year.textContent=new Date().getFullYear();}

const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelectorAll('.site-nav a');
if(menuToggle){menuToggle.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menuToggle.setAttribute('aria-expanded',String(open));});}
navLinks.forEach(link=>{link.addEventListener('click',()=>{document.body.classList.remove('menu-open');if(menuToggle){menuToggle.setAttribute('aria-expanded','false');}});});

const modal=document.querySelector('#imageModal');
const modalImg=modal?modal.querySelector('img'):null;
const modalCaption=modal?modal.querySelector('p'):null;
const modalClose=modal?modal.querySelector('.modal-close'):null;
const clickableImages=Array.from(document.querySelectorAll('.service-card img,.featured-item img,.gallery-grid img'));
let currentImageIndex=0;

if(modal){
  const prevButton=document.createElement('button');
  prevButton.className='modal-arrow modal-prev';
  prevButton.type='button';
  prevButton.setAttribute('aria-label','Imagem anterior');
  prevButton.textContent='‹';

  const nextButton=document.createElement('button');
  nextButton.className='modal-arrow modal-next';
  nextButton.type='button';
  nextButton.setAttribute('aria-label','Próxima imagem');
  nextButton.textContent='›';

  modal.appendChild(prevButton);
  modal.appendChild(nextButton);

  prevButton.addEventListener('click',(event)=>{event.stopPropagation();showImageByIndex(currentImageIndex-1);});
  nextButton.addEventListener('click',(event)=>{event.stopPropagation();showImageByIndex(currentImageIndex+1);});
}

function showImageByIndex(index){
  if(!modal||!modalImg||clickableImages.length===0)return;
  currentImageIndex=(index+clickableImages.length)%clickableImages.length;
  const img=clickableImages[currentImageIndex];
  modalImg.src=img.currentSrc||img.src;
  modalImg.alt=img.alt||'Imagem ampliada';
  if(modalCaption){modalCaption.textContent=img.alt||'';}
}

function openImageModal(img){
  if(!modal||!modalImg)return;
  currentImageIndex=clickableImages.indexOf(img);
  if(currentImageIndex<0){currentImageIndex=0;}
  showImageByIndex(currentImageIndex);
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
document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'){closeImageModal();}
  if(modal&&modal.classList.contains('open')&&event.key==='ArrowLeft'){showImageByIndex(currentImageIndex-1);}
  if(modal&&modal.classList.contains('open')&&event.key==='ArrowRight'){showImageByIndex(currentImageIndex+1);}
});