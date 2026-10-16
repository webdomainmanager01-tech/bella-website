document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('header nav');

  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menu.classList.remove('active');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
    };

    menu.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      menu.classList.toggle('active', isOpen);
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('bookingForm');
  if (form) form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = (id) => document.getElementById(id)?.value.trim() || '';
    let preferredTime = 'Not specified';
    if (value('datetime')) preferredTime = new Date(value('datetime')).toLocaleString('en-GB', {
      weekday:'long', day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'
    });
    const text = [
      'Hello Rosa, I would like to request an appointment.','',
      `Name: ${value('name')}`, `Mobile: ${value('phone')}`,
      `Email: ${value('email') || 'Not provided'}`, `Postcode: ${value('postcode')}`,
      `Service: ${value('service')}`, `Preferred day and time: ${preferredTime}`,
      `Additional details: ${value('message') || 'None'}`
    ].join('\n');
    window.open('https://wa.me/447904550018?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
});
