const API_BASE = '/api';

export async function submitLead(data) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function bookCall(data) {
  const res = await fetch(`${API_BASE}/book-call`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getPortfolio(type) {
  const res = await fetch(`${API_BASE}/portfolio/${type}`);
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials`);
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
}
