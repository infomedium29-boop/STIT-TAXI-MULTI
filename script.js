const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const year = document.querySelector('[data-year]');
const phoneNational = '+385 95 904 6777';
const whatsappNumber = '385959046777';

if (year) year.textContent = new Date().getFullYear();

function updateHeader(){
  if(!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

if(menuBtn && navLinks){
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
    });
  });
}

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
revealEls.forEach(el => observer.observe(el));

function encodeForm(form){
  const data = new FormData(form);
  const lines = [];
  for (const [key, value] of data.entries()) {
    if(String(value).trim()) lines.push(`${key}: ${value}`);
  }
  const relacija = data.get('Relacija') || data.get('Odakle i dokle') || '';
  return `Pozdrav, zanima me taxi / transfer usluga STIT TAXI.${relacija ? `\nRelacija: ${relacija}` : ''}\n\n${lines.join('\n')}`;
}

document.querySelectorAll('form[data-whatsapp-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = encodeURIComponent(encodeForm(form));
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  });
});

const phoneEls = document.querySelectorAll('[data-phone]');
phoneEls.forEach(el => el.textContent = phoneNational);
