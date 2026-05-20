// ── Theme ──
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light' || (!saved && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  html.classList.add('light');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  html.classList.toggle('light');
  localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// ── Navbar ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav ──
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ── Region filter ──
document.querySelectorAll('.rtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const r = tab.dataset.region;
    document.querySelectorAll('.case-card').forEach(c => {
      c.classList.toggle('hidden', r !== 'all' && c.dataset.region !== r);
    });
  });
});

// ── Scroll reveal ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.case-card, .writing-item, .video-card, .pillar, .metric-chip, .ct-item').forEach(el => {
  el.classList.add('reveal');
  obs.observe(el);
});

// ── Contact form ──
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    success.style.display = 'block';
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => success.style.display = 'none', 5000);
  }, 900);
});
