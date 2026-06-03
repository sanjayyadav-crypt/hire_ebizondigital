/* ── Sticky navbar ──────────────────────────────────────────────── */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  backTop.classList.toggle('visible',  window.scrollY > 400);
});

/* ── Burger menu ────────────────────────────────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── Back to top ────────────────────────────────────────────────── */
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── FAQ accordion ──────────────────────────────────────────────── */
function toggleFaq(btn) {
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    btn.nextElementSibling.classList.add('open');
  }
}



/* ── Scroll reveal ──────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.step-card, .creme-card, .testi-card, .faq-item, .feat-split, .chip, .logo-pill, .stat-item, .stack-group, .case-study, .vibe-card'
);
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 55);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => io.observe(el));

/* ── Stat counters ──────────────────────────────────────────────── */
function countUp(el, target) {
  const dur = 1800;
  const start = performance.now();
  const tick = now => {
    const p      = Math.min((now - start) / dur, 1);
    const eased  = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

let counted = false;
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.stat-n').forEach(el => {
      countUp(el, parseFloat(el.dataset.target));
    });
  }
}, { threshold: 0.5 }).observe(document.querySelector('.stats-band'));
