/* =============================================
   MAYUR PAWAR PORTFOLIO — JAVASCRIPT
   ============================================= */

// ---- THEME TOGGLE ----
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved theme
const savedTheme = localStorage.getItem('mp-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mp-theme', next);
});

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .skill-icon-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.opacity = '0.5';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.opacity = '1';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    nav.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// ---- INTERSECTION OBSERVER ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Reveal elements
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .timeline__card, .skills__category, .skill-icon-card, .contact__link, .about__highlights li, .edu-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// Skill bars
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') + '%';
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills__category').forEach(cat => skillBarObserver.observe(cat));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-count')));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) counterObserver.observe(heroStats);

// ---- PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card, i) => {
      const cats = card.getAttribute('data-category') || '';
      const show = filter === 'all' || cats.split(' ').includes(filter);

      if (show) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, i * 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ---- SCROLL SPY ----
const sections = document.querySelectorAll('section[id]');
const scrollSpyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => scrollSpyObserver.observe(s));

// ---- FORM SUBMIT ----
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✅ Message Sent!';
  btn.disabled = true;
  btn.style.background = 'linear-gradient(135deg,#10B981,#34D399)';
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ---- 3D TILT on project cards ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ---- ACTIVE NAV LINK CSS ----
const style = document.createElement('style');
style.textContent = `
  .nav__link.active { color: var(--white) !important; }
  [data-theme="light"] .nav__link.active { color: var(--text) !important; }
  .nav__link.active::after { right: 0; }

  /* Education cards */
  .edu-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 4rem;
  }
  .edu-card {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 2rem 2.4rem;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  .edu-card:hover {
    border-color: rgba(20,184,166,0.35);
    background: rgba(20,184,166,0.05);
    transform: translateY(-3px);
  }
  .edu-card__icon { font-size: 3rem; flex-shrink: 0; }
  .edu-card__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.4rem;
    font-family: 'Space Grotesk', sans-serif;
  }
  [data-theme="light"] .edu-card__title { color: var(--text); }
  .edu-card__sub { font-size: 1.3rem; color: var(--text-muted); }

  @media (max-width: 600px) {
    .edu-grid { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(style);

console.log('%c Mayur Pawar Portfolio 🚀 | Teal Edition', 'background:linear-gradient(135deg,#14B8A6,#F59E0B);color:#0A0F1E;padding:8px 16px;border-radius:6px;font-weight:bold;font-size:16px');
