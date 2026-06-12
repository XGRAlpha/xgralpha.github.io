const year=document.querySelector('#year');if(year){year.textContent=new Date().getFullYear();}
const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelectorAll('.site-nav a');
if(menuToggle){menuToggle.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menuToggle.setAttribute('aria-expanded',String(open));});}
navLinks.forEach(link=>{link.addEventListener('click',()=>{document.body.classList.remove('menu-open');if(menuToggle){menuToggle.setAttribute('aria-expanded','false');}});});