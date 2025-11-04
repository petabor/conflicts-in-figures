// Wire any [data-year-panel] block: slider -> map/bar src + text, with Panzoom cooperation
export function init(){
  document.querySelectorAll('[data-year-panel]').forEach(panel => {
    const slider = panel.querySelector('[data-role="year-slider"]');
    const mapImg = panel.querySelector('[data-role="map-image"]');
    const barImg = panel.querySelector('[data-role="bar-image"]');
    const yearLbl = panel.querySelector('[data-role="year-label"]');
    const descEl = panel.querySelector('[data-role="description"]');
    const ctxEl  = panel.querySelector('[data-role="context"]');

    // Templates and sources from data-attrs
    const mapTpl = panel.getAttribute('data-map-template');
    const barTpl = panel.getAttribute('data-bar-template');
    const descSrc = document.querySelector(panel.getAttribute('data-desc-src'));
    const ctxSrc  = document.querySelector(panel.getAttribute('data-ctx-src'));

    // Build dictionaries from hidden HTML once
    const descriptions = {};
    if (descSrc) descSrc.querySelectorAll('[data-year]').forEach(div => { descriptions[div.dataset.year] = div.innerHTML; });
    const contexts = {};
    if (ctxSrc) ctxSrc.querySelectorAll('[data-year]').forEach(div => { contexts[div.dataset.year] = div.innerHTML; });

    // Optional: Panzoom (if loaded) for the map
    let pz = null;
    if (window.Panzoom && mapImg && mapImg.closest('.map-wrapper')) {
      pz = Panzoom(mapImg, {
        maxScale: +(mapImg.dataset.zoomMax || 10),
        minScale: +(mapImg.dataset.zoomMin || 1),
        contain:   mapImg.dataset.zoomContain || 'outside',
        startScale: 1
      });
      // wheel on wrapper for better UX
      mapImg.closest('.map-wrapper').addEventListener('wheel', e => { e.preventDefault(); pz.zoomWithWheel(e); }, { passive: false });
      mapImg.addEventListener('mousedown', () => mapImg.style.cursor='grabbing');
      window.addEventListener('mouseup', () => mapImg.style.cursor='grab');

      // reset on load if requested
      if (mapImg.dataset.zoomResetOnLoad === 'true') {
        mapImg.addEventListener('load', () => pz.reset({ animate: false }));
      }
      // also listen for manual reset triggers
      mapImg.addEventListener('zoom:reset', () => pz.reset({ animate: false }));
    }

    const interpolate = (tpl, year) => tpl ? tpl.replace('{year}', year) : '';

    function updateYear(year){
      if (yearLbl) yearLbl.textContent = `Year: ${year}`;
      if (mapImg && mapTpl) {
        const next = interpolate(mapTpl, year);
        if (mapImg.src !== next) {
          mapImg.src = next;
          // in case Panzoom is not listening to load
          mapImg.dispatchEvent(new CustomEvent('zoom:reset'));
        }
      }
      if (barImg && barTpl) barImg.src = interpolate(barTpl, year);
      if (descEl) descEl.innerHTML = (descriptions[year] || 'No description available.');
      if (ctxEl)  ctxEl.innerHTML  = (contexts[year]     || 'No description available.');
    }

    // Wire slider
    if (slider) {
      slider.addEventListener('input', () => updateYear(slider.value));
      // initial paint
      updateYear(slider.value);
    }
  });
}
