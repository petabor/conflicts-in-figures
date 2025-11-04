export function init() {
  const root = document.querySelector('[data-country-filter-panel]');
  if (!root) return;

  const base = root.dataset.base;
  const select = root.querySelector('#conflict-select');
  const topImg = root.querySelector('img[alt="Top"]');

  function updateImages(file) {
    if (!file) return;
    topImg.src = `${base}/${file}`;
  }

  select.addEventListener('change', e => updateImages(e.target.value));

  const first = select.options[0]?.value;
  if (first) {
    select.value = first;
    updateImages(first);
  }
}