// ===== NAVBAR =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.style.background = 'rgba(15,23,42,0.98)';
  } else {
    navbar.style.background = 'rgba(15,23,42,0.95)';
  }
});

// ===== QUICK TRACK (from hero) =====
function goTrack() {
  const val = document.getElementById('quickTrack')?.value?.trim();
  if (val) {
    window.location.href = `track.html?id=${encodeURIComponent(val)}`;
  } else {
    window.location.href = 'track.html';
  }
}

// Allow Enter key in quick track
const quickTrackInput = document.getElementById('quickTrack');
if (quickTrackInput) {
  quickTrackInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') goTrack();
  });
}

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.addEventListener('DOMContentLoaded', () => {
  const animatable = document.querySelectorAll(
    '.service-card, .step, .testi-card, .team-card, .office-card, .milestone, .service-detail-card, .contact-info-card'
  );
  animatable.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
});

// CSS for visible state
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
