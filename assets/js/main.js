// main.js - small interactive behaviors
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year-2, #year-3').forEach(el => { if (el) el.textContent = y; });

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }

  // Product modal: fill from product-card
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.querySelector('.modal-close');

  function openModal(content) {
    modalBody.innerHTML = content;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal() {
    modal.setAttribute('aria-hidden','true');
    modalBody.innerHTML = '';
  }

  document.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.currentTarget.closest('.product-card');
      const name = card?.dataset?.name || card.querySelector('h3')?.textContent || 'Product';
      const img = card.querySelector('img')?.src || '';
      const desc = card.querySelector('.prod-info p')?.textContent || '';
      const html = `
        <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
          <div style="flex:1;min-width:220px"><img src="${img}" alt="${name}" style="width:100%;border-radius:8px"></div>
          <div style="flex:2;min-width:260px">
            <h2>${name}</h2>
            <p>${desc}</p>
            <p><strong>Ordering & Enquiry</strong></p>
            <p><a href="mailto:sales@revoton.example?subject=Enquiry%20about%20${encodeURIComponent(name)}">Email Sales</a></p>
          </div>
        </div>`;
      openModal(html);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if (e.target === modal) closeModal();
  });

  // basic scroll reveal
  const reveals = document.querySelectorAll('.card, .testimonial, .product-card, .team-grid figure, .features-grid, .hero');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.opacity = '1';
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r=>{
    r.style.transition = 'transform 600ms ease, opacity 600ms ease';
    r.style.transform = 'translateY(10px)';
    r.style.opacity = '0';
    io.observe(r);
  });

});
