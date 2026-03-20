// Hero Background Slideshow
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let current = 0;
  slides[0].style.opacity = '0.45';
  setInterval(function() {
    slides[current].style.opacity = '0';
    current = (current + 1) % slides.length;
    slides[current].style.opacity = '0.45';
  }, 5000);
})();

// Specialists Carousel
(function() {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0;

  function getSlidesPerView() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  function totalPages() {
    return Math.ceil(slides.length / getSlidesPerView());
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(page) {
    current = Math.max(0, Math.min(page, totalPages() - 1));
    const slideWidth = slides[0].getBoundingClientRect().width + 24; // gap-6 = 24px
    track.style.transform = `translateX(-${current * getSlidesPerView() * slideWidth}px)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
})();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMobileMenu() {
  mobileMenu.classList.remove('translate-x-full');
  mobileMenuOverlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeMobileMenu() {
  mobileMenu.classList.add('translate-x-full');
  mobileMenuOverlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Mobile Submenu Toggles
document.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const submenu = this.nextElementSibling;
    const icon = this.querySelector('.submenu-icon');

    submenu.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  });
});

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
  } else {
    header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
  }

  lastScroll = currentScroll;
});

// FAQ Accordion
document.querySelectorAll('.faq-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('.faq-icon');

    // Close all other FAQ items
    document.querySelectorAll('.faq-content').forEach(item => {
      if (item !== content) {
        item.classList.add('hidden');
      }
    });

    document.querySelectorAll('.faq-icon').forEach(i => {
      if (i !== icon) {
        i.classList.remove('rotate-180');
      }
    });

    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form validation (placeholder)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Placeholder - form submission logic would go here
    alert('Thank you for your message. We will be in touch shortly.');
    this.reset();
  });
}
