// ===== CONTACT FORM SUBMISSION =====
function submitForm() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const type = document.getElementById('cType').value;
  const msg = document.getElementById('cMsg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate submission (replace with real backend API)
  console.log('Form Submitted:', { name, email, phone, type, msg });

  // Show success state
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
