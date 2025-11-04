// assets/js/behaviors/enlarge.js
export function init(){
  // Ensure a single shared modal exists
  let modal = document.getElementById('lb-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lb-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <img class="modal-content" id="lb-img" alt="">
      <div id="lb-caption"></div>
    `;
    document.body.appendChild(modal);
  }
  const modalImg = modal.querySelector('#lb-img');
  const caption  = modal.querySelector('#lb-caption');

  const open = (src, cap='') => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    modalImg.src = src;
    modalImg.alt = cap;
    caption.textContent = cap;
    // prevent background scroll
    document.documentElement.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    caption.textContent = '';
    document.documentElement.style.overflow = '';
  };

  // Backdrop click closes; clicking the image does not
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  modalImg.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // Target elements marked with data-behavior="enlarge" OR a legacy .enlarge class
  const els = document.querySelectorAll('[data-behavior~="enlarge"], .enlarge');
  els.forEach(el => {
    // Add styling hook for hover/focus highlight
    el.classList.add('is-enlargeable');

    // Make keyboard-focusable if not already
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;

    // Basic a11y hints
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.setAttribute('aria-haspopup', 'dialog');

    const getSrc = () => el.currentSrc || el.src || el.dataset.src || '';
    const getCap = () => el.dataset.caption || el.alt || el.getAttribute('aria-label') || '';

    const trigger = () => open(getSrc(), getCap());

    el.addEventListener('click', trigger);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });
}
