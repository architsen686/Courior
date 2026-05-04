// ===== DEMO TRACKING DATA =====
const trackingData = {
  'SD-208475': {
    from: 'Jaipur, RJ',
    to: 'Delhi, DL',
    status: 'Out for Delivery',
    eta: 'Today, 4:30 PM',
    statusClass: 'orange',
    events: [
      { time: 'Today, 9:00 AM', label: 'Out for Delivery', detail: 'Package dispatched from Delhi Hub — Rider: Suresh K.', done: true, active: true },
      { time: 'Today, 5:30 AM', label: 'Arrived at Delivery Hub', detail: 'Package arrived at Delhi Distribution Centre', done: true, active: false },
      { time: 'Yesterday, 11:00 PM', label: 'In Transit', detail: 'Package departed Jaipur Hub — en route to Delhi', done: true, active: false },
      { time: 'Yesterday, 6:45 PM', label: 'Picked Up', detail: 'Package collected from sender in Malviya Nagar, Jaipur', done: true, active: false },
      { time: '—', label: 'Delivered', detail: 'Awaiting delivery', done: false, active: false },
    ]
  },
  'SD-319820': {
    from: 'Mumbai, MH',
    to: 'Bengaluru, KA',
    status: 'Delivered',
    eta: 'Yesterday, 2:00 PM ✓',
    statusClass: 'green',
    events: [
      { time: 'Yesterday, 1:48 PM', label: 'Delivered', detail: 'Signed by: Priya S. at Koramangala, Bengaluru', done: true, active: true },
      { time: 'Yesterday, 10:00 AM', label: 'Out for Delivery', detail: 'Package dispatched from Bengaluru Hub', done: true, active: false },
      { time: 'Yesterday, 6:00 AM', label: 'Arrived at Delivery Hub', detail: 'Package arrived at Bengaluru Distribution Centre', done: true, active: false },
      { time: '2 days ago, 8:00 PM', label: 'In Transit', detail: 'Package departed Mumbai Hub — en route to Bengaluru', done: true, active: false },
      { time: '2 days ago, 3:30 PM', label: 'Picked Up', detail: 'Package collected from sender in Andheri West, Mumbai', done: true, active: false },
    ]
  },
  'SD-447291': {
    from: 'Chennai, TN',
    to: 'Hyderabad, TS',
    status: 'In Transit',
    eta: 'Tomorrow, 6:00 PM',
    statusClass: 'blue',
    events: [
      { time: 'Today, 2:00 PM', label: 'In Transit', detail: 'Package is on the way — Chennai to Hyderabad', done: true, active: true },
      { time: 'Today, 8:00 AM', label: 'Arrived at Origin Hub', detail: 'Package processed at Chennai Central Hub', done: true, active: false },
      { time: 'Today, 7:00 AM', label: 'Picked Up', detail: 'Package collected from sender in T. Nagar, Chennai', done: true, active: false },
      { time: '—', label: 'Out for Delivery', detail: 'Pending', done: false, active: false },
      { time: '—', label: 'Delivered', detail: 'Pending', done: false, active: false },
    ]
  }
};

// ===== FILL DEMO ID =====
function fillDemo(id) {
  document.getElementById('trackInput').value = id;
}

// ===== TRACK PARCEL =====
function trackParcel() {
  const input = document.getElementById('trackInput').value.trim().toUpperCase();
  const resultSection = document.getElementById('trackResult');

  if (!input) {
    alert('Please enter a tracking ID.');
    return;
  }

  const data = trackingData[input];

  if (!data) {
    resultSection.style.display = 'block';
    resultSection.innerHTML = `
      <div class="container">
        <div class="tracking-card" style="text-align:center; padding: 60px;">
          <i class="fas fa-search" style="font-size:3rem; color: var(--gray); margin-bottom: 20px; display:block;"></i>
          <h2 style="color: var(--white); margin-bottom: 10px;">Tracking ID Not Found</h2>
          <p style="color: var(--gray);">We couldn't find a shipment with ID <strong style="color:var(--orange);">${input}</strong>.<br>Please check your ID and try again, or <a href="contact.html" style="color:var(--orange);">contact support</a>.</p>
        </div>
      </div>
    `;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  // Populate result
  document.getElementById('resultId').textContent = input;
  document.getElementById('resultFrom').textContent = data.from;
  document.getElementById('resultTo').textContent = data.to;
  document.getElementById('resultEta').textContent = data.eta;

  const badge = document.getElementById('resultBadge');
  badge.textContent = data.status;

  // Status badge color
  if (data.statusClass === 'green') {
    badge.style.background = 'rgba(34,197,94,0.15)';
    badge.style.color = '#22c55e';
  } else if (data.statusClass === 'blue') {
    badge.style.background = 'rgba(99,102,241,0.15)';
    badge.style.color = '#818cf8';
  } else {
    badge.style.background = 'rgba(249,115,22,0.15)';
    badge.style.color = 'var(--orange)';
  }

  // Build timeline
  const timelineTrack = document.getElementById('timelineTrack');
  timelineTrack.innerHTML = '';

  data.events.forEach((event, i) => {
    const isLast = i === data.events.length - 1;
    const div = document.createElement('div');
    div.className = 'timeline-event';
    div.innerHTML = `
      <div class="tl-dot-wrap">
        <div class="tl-dot ${event.done ? 'done' : ''} ${event.active ? 'active' : ''}"></div>
        ${!isLast ? `<div class="tl-line ${event.done ? 'done' : ''}"></div>` : ''}
      </div>
      <div class="tl-info">
        <div class="tl-time">${event.time}</div>
        <div class="tl-label">${event.label}</div>
        <div class="tl-detail">${event.detail}</div>
      </div>
    `;
    timelineTrack.appendChild(div);
  });

  // Show result
  resultSection.style.display = 'block';
  resultSection.innerHTML = document.getElementById('trackResult').innerHTML; // refresh
  // Re-show the section (full repopulation approach)
  showTrackResult(input, data);
}

function showTrackResult(id, data) {
  const section = document.getElementById('trackResult');
  section.style.display = 'block';

  // Repopulate after display
  document.getElementById('resultId').textContent = id;
  document.getElementById('resultFrom').textContent = data.from;
  document.getElementById('resultTo').textContent = data.to;
  document.getElementById('resultEta').textContent = data.eta;

  const badge = document.getElementById('resultBadge');
  badge.textContent = data.status;
  badge.style.background = data.statusClass === 'green' ? 'rgba(34,197,94,0.15)' : data.statusClass === 'blue' ? 'rgba(99,102,241,0.15)' : 'rgba(249,115,22,0.15)';
  badge.style.color = data.statusClass === 'green' ? '#22c55e' : data.statusClass === 'blue' ? '#818cf8' : 'var(--orange)';

  const tl = document.getElementById('timelineTrack');
  tl.innerHTML = '';
  data.events.forEach((event, i) => {
    const isLast = i === data.events.length - 1;
    const div = document.createElement('div');
    div.className = 'timeline-event';
    div.innerHTML = `
      <div class="tl-dot-wrap">
        <div class="tl-dot ${event.done ? 'done' : ''} ${event.active ? 'active' : ''}"></div>
        ${!isLast ? `<div class="tl-line ${event.done ? 'done' : ''}"></div>` : ''}
      </div>
      <div class="tl-info">
        <div class="tl-time">${event.time}</div>
        <div class="tl-label">${event.label}</div>
        <div class="tl-detail">${event.detail}</div>
      </div>`;
    tl.appendChild(div);
  });

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Allow Enter key
document.getElementById('trackInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') trackParcel();
});

// FAQ toggle
function toggleFaq(el) {
  el.classList.toggle('open');
  const ans = el.nextElementSibling;
  ans.classList.toggle('open');
}

// Auto-track from URL param
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    document.getElementById('trackInput').value = id;
    trackParcel();
  }
});
