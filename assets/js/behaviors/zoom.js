// Panzoom-only zoom behavior with wrapper + bounds + reset hooks
export function init(){
  if (!window.Panzoom) { console.warn('Panzoom library not found.'); return; }

  const imgs = document.querySelectorAll('[data-behavior~="zoom"]');
  imgs.forEach(img => {
    // Ensure a clipping wrapper
    let wrapper = img.closest('.zoom-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'zoom-wrapper';
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }

    const maxScale = +(img.dataset.zoomMax || 8);
    const minScale = +(img.dataset.zoomMin || 1);
    const contain  = img.dataset.zoomContain || 'outside'; // 'outside' or 'inside'

    // Init Panzoom
    const pz = Panzoom(img, {
      maxScale,
      minScale,
      startScale: 1,
      contain,          // keeps the image bounded within wrapper
      canvas: false     // we are transforming the element itself
    });

    // Wheel zoom on wrapper (for better UX)
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      pz.zoomWithWheel(e);
    }, { passive: false });

    // Cursor feedback
    img.addEventListener('mousedown', () => img.style.cursor = 'grabbing');
    window.addEventListener('mouseup', () => img.style.cursor = 'grab');

    // Public helpers
    const reset = () => pz.reset({ animate: false });
    img.addEventListener('zoom:reset', reset);

    // Reset automatically when the img changes source (useful with sliders)
    if (img.dataset.zoomResetOnLoad === 'true') {
      img.addEventListener('load', reset);
    }

    // Store reference if you ever need direct access
    img._panzoom = pz;
  });
}
