export function init() {
  const root = document.querySelector('[data-filter-panel]');
  if (!root) return;

  const base = root.dataset.base;
  const select = root.querySelector('#conflict-select');
  const topImg = root.querySelector('img[alt="Top"]');
  const bottomImg = root.querySelector('img[alt="Bottom"]');

  function updateImages(file) {
    if (!file) return;
    const topPath = `${base}/fatalities_by_conflict/${file}`;
    const bottomPath = `${base}/headlines_by_conflict/${file}`;
    topImg.src = topPath;
    bottomImg.src = bottomPath;
  }

  // When selection changes
  select.addEventListener('change', (e) => updateImages(e.target.value));

  // --- Load first conflict automatically ---
  const first = select.options[0]?.value;
  if (first) {
    select.value = first;
    updateImages(first);
  }
}