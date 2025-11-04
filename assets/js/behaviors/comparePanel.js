export function init(){
  document.querySelectorAll('[data-compare-panel]').forEach(root => {
    const base = root.getAttribute('data-base') || '';
    const map  = readMap(root.getAttribute('data-metric-map'));

    const selMetric = root.querySelector('select[name="metric"]');
    const selYearL  = root.querySelector('select[name="yearL"]');
    const selYearR  = root.querySelector('select[name="yearR"]');

    const imgLT = root.querySelector('img[data-role="left-top"]');
    const imgLB = root.querySelector('img[data-role="left-total"]');
    const imgRT = root.querySelector('img[data-role="right-top"]');
    const imgRB = root.querySelector('img[data-role="right-total"]');

    function dirForMetric(label){
      return map[label] || (label || '').toLowerCase().replace(/\s+/g,'_');
    }
    function srcFor(metricDir, subdir, year){
      return `${base}/${metricDir}/${subdir}/${year}.png`;
    }
    function setSrc(img, url){
      if (!img) return;
      if (img.src !== url) {
        img.src = url;
        img.dispatchEvent(new CustomEvent('zoom:reset'));
      }
    }
    function update(){
      const metricDir = dirForMetric(selMetric.value);
      const yL = selYearL.value;
      const yR = selYearR.value;
      setSrc(imgLT, srcFor(metricDir, 'total',   yL));
      setSrc(imgLB, srcFor(metricDir, 'top', yL));
      setSrc(imgRT, srcFor(metricDir, 'total',   yR));
      setSrc(imgRB, srcFor(metricDir, 'top', yR));
    }

    [selMetric, selYearL, selYearR].forEach(s => s && s.addEventListener('change', update));
    update();
  });

  function readMap(json){ try { return JSON.parse(json || '{}'); } catch { return {}; } }
}
