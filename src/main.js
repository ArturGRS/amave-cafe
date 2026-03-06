import './style.css'

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .about-content p, .highlight-card, .info-block');

// Add base classes for initial state
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
});

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealOnScroll.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  // Hero Scroll Animation Logic
  const heroContainer = document.getElementById('hero-scroll-container');
  if (heroContainer) {
    let scrollProgress = 0;
    let mediaFullyExpanded = false;
    let touchStartY = 0;

    const heroBg = document.getElementById('hero-bg');
    const heroMediaBox = document.getElementById('hero-media-box');
    const heroMediaOverlay = document.getElementById('hero-media-overlay');
    const heroTitle1 = document.getElementById('hero-title-1');
    const heroTitle2 = document.getElementById('hero-title-2');
    const heroScrollText = document.getElementById('hero-scroll-text');

    const updateHeroAnimation = () => {
      const isMobileState = window.innerWidth < 768;
      const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
      const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
      const textTranslateX = scrollProgress * (isMobileState ? 100 : 150); // vw units

      if (heroBg) heroBg.style.opacity = 1 - scrollProgress;

      if (heroMediaBox) {
        heroMediaBox.style.width = `${mediaWidth}px`;
        heroMediaBox.style.height = `${mediaHeight}px`;
      }

      if (heroMediaOverlay) {
        heroMediaOverlay.style.opacity = 0.7 - (scrollProgress * 0.7);
      }

      if (heroTitle1) heroTitle1.style.transform = `translateX(-${textTranslateX}vw)`;
      if (heroTitle2) heroTitle2.style.transform = `translateX(${textTranslateX}vw)`;
      if (heroScrollText) heroScrollText.style.transform = `translateX(${textTranslateX}vw)`;
    };

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        mediaFullyExpanded = false;
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.001;
        scrollProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);

        if (scrollProgress >= 1) {
          mediaFullyExpanded = true;
        }
        updateHeroAnimation();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        mediaFullyExpanded = false;
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.006 : 0.004;
        const scrollDelta = deltaY * scrollFactor;
        scrollProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);

        if (scrollProgress >= 1) {
          mediaFullyExpanded = true;
        }
        updateHeroAnimation();
        touchStartY = touchY;
      }
    };

    const handleTouchEnd = () => { touchStartY = 0; };
    const handleScroll = () => {
      if (!mediaFullyExpanded && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', updateHeroAnimation);

    // Initial state
    updateHeroAnimation();
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
