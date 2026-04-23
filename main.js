/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== MOBILE NAV TOGGLE ===== */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: `-${navbar.offsetHeight}px 0px -60% 0px`,
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ===== SCROLL ANIMATIONS ===== */
const animatedElements = document.querySelectorAll(
  '.skill-category, .project-card, .about-grid, .contact-grid, .info-item'
);

animatedElements.forEach(el => el.classList.add('animate-in'));

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedElements.forEach(el => animationObserver.observe(el));

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    setFormStatus('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    setFormStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with actual API call)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    setFormStatus('Thanks for your message! I\'ll get back to you soon. 🎉', 'success');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1200);
});

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
