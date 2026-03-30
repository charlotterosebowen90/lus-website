// Contact Header Video — smooth fade-in and gentle loop crossfade
(function() {
  var video = document.getElementById('contact-hero-video');
  if (!video) return;

  var TARGET   = 0.4;
  var DIP      = 0.1;
  var DIP_LEAD = 2.2;
  var dipping  = false;

  video.play().catch(function() {});

  video.addEventListener('playing', function() {
    video.style.transition = 'opacity 3s ease';
    video.style.opacity = TARGET;
  }, { once: true });

  video.addEventListener('timeupdate', function() {
    if (!video.duration) return;
    var remaining = video.duration - video.currentTime;
    if (!dipping && remaining <= DIP_LEAD) {
      dipping = true;
      video.style.transition = 'opacity 1.8s ease-in-out';
      video.style.opacity = DIP;
    }
    if (dipping && video.currentTime < 0.4) {
      dipping = false;
      video.style.transition = 'opacity 2.5s ease-in-out';
      video.style.opacity = TARGET;
    }
  });
})();

// Hero Video — smooth fade-in and gentle loop crossfade
(function() {
  var video = document.getElementById('hero-video');
  if (!video) return;

  var TARGET   = 0.7;   // normal opacity
  var DIP      = 0.2;   // opacity during loop dip
  var DIP_LEAD = 2.2;   // seconds before end to start fade-down
  var dipping  = false;

  video.play().catch(function() {});

  // Initial fade-in once video starts playing
  video.addEventListener('playing', function() {
    video.style.transition = 'opacity 3.5s cubic-bezier(0.4,0,0.6,1)';
    video.style.opacity = TARGET;
  }, { once: true });

  // Smooth dip at loop boundary
  video.addEventListener('timeupdate', function() {
    if (!video.duration) return;
    var remaining = video.duration - video.currentTime;

    if (!dipping && remaining <= DIP_LEAD) {
      dipping = true;
      video.style.transition = 'opacity 1.8s ease-in-out';
      video.style.opacity = DIP;
    }
    // After loop restarts, fade back up
    if (dipping && video.currentTime < 0.4) {
      dipping = false;
      video.style.transition = 'opacity 2.5s ease-in-out';
      video.style.opacity = TARGET;
    }
  });
})();

// Patient Reviews Carousel
(function() {
  const slides = document.querySelectorAll('.review-slide');
  const dotsContainer = document.getElementById('review-dots');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');
  if (!slides.length) return;

  let current = 0;

  function buildDots() {
    dotsContainer.innerHTML = '';
    slides.forEach(function(_, i) {
      const dot = document.createElement('button');
      dot.style.cssText = 'width:8px;height:8px;border-radius:9999px;border:none;cursor:pointer;padding:0;transition:background-color 0.2s,width 0.2s;';
      dot.style.backgroundColor = i === current ? '#7bc7ef' : 'rgba(255,255,255,0.3)';
      if (i === current) dot.style.width = '24px';
      dot.addEventListener('click', function() { goTo(i); resetAutoPlay(); });
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    slides[current].style.display = 'none';
    current = (index + slides.length) % slides.length;
    slides[current].style.display = 'block';
    buildDots();
  }

  function goToNext() { goTo(current + 1); }

  let autoPlay = setInterval(goToNext, 5000);
  function resetAutoPlay() { clearInterval(autoPlay); autoPlay = setInterval(goToNext, 5000); }

  prevBtn.addEventListener('click', function() { goTo(current - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', function() { goTo(current + 1); resetAutoPlay(); });

  // Show first slide
  slides[0].style.display = 'block';
  buildDots();
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
    return 3;
  }

  function maxIndex() {
    return Math.max(0, slides.length - getSlidesPerView());
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const slideWidth = slides[0].getBoundingClientRect().width + 24; // gap-6 = 24px
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goToNext() {
    goTo(current + 1 > maxIndex() ? 0 : current + 1);
  }

  // Auto-advance every 4 seconds
  let autoPlay = setInterval(goToNext, 3000);

  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(goToNext, 3000);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => { autoPlay = setInterval(goToNext, 3000); });

  buildDots();

  // Equalise card heights so all slides align
  function equaliseHeights() {
    var slideEls = Array.prototype.slice.call(document.querySelectorAll('.carousel-slide'));
    slideEls.forEach(function(s) { s.style.height = 'auto'; });
    var maxH = slideEls.reduce(function(m, s) { return Math.max(m, s.offsetHeight); }, 0);
    slideEls.forEach(function(s) { s.style.height = maxH + 'px'; });
  }

  window.addEventListener('load', equaliseHeights);
  window.addEventListener('resize', function() { buildDots(); goTo(0); equaliseHeights(); });
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

// Stats — fade-in entrance + count-up on scroll into view
(function() {
  var items = document.querySelectorAll('.stat-item');
  if (!items.length) return;

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var item = entry.target;
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      var numEl = item.querySelector('.stat-number');
      if (numEl) countUp(numEl);
      observer.unobserve(item);
    });
  }, { threshold: 0.3 });

  items.forEach(function(item) { observer.observe(item); });
})();

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
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
        item.closest('.faq-item')?.classList.remove('faq-open');
      }
    });

    document.querySelectorAll('.faq-icon').forEach(i => {
      if (i !== icon) {
        i.classList.remove('rotate-180');
      }
    });

    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
    this.closest('.faq-item')?.classList.toggle('faq-open');
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

// Hide mobile call button when submit button is visible
(function() {
  var callBtn = document.getElementById('mobile-call-btn');
  var submitArea = document.getElementById('form-submit-area');
  if (!callBtn || !submitArea) return;
  var obs = new IntersectionObserver(function(entries) {
    callBtn.style.opacity = entries[0].isIntersecting ? '0' : '1';
    callBtn.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.5 });
  obs.observe(submitArea);
})();

// Contact form — Formspree submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitArea = document.getElementById('form-submit-area');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    const submitBtn = submitArea.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        submitArea.style.display = 'none';
        errorMsg.style.display = 'none';
        successMsg.style.display = 'block';
        contactForm.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Enquiry <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>';
      errorMsg.style.display = 'block';
    }
  });
}
