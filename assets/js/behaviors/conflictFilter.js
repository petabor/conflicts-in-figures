export function init() {
  const root = document.querySelector('[data-filter-panel]');
  if (!root) {
    console.warn('⚠️ No [data-filter-panel] found');
    return;
  }

  console.log('✅ Filter panel found:', root);
  console.log('🧭 data-base:', root.dataset.base);

  const base = root.dataset.base;
  const select = root.querySelector('#conflict-select');
  const topImg = root.querySelector('img[alt="Top"]');
  const bottomImg = root.querySelector('img[alt="Bottom"]');

  if (!select) {
    console.warn('⚠️ No <select id="conflict-select"> found');
    return;
  }

  console.log('📊 Number of <option> items:', select.options.length);
  if (select.options.length > 0) {
    console.log('🔹 First option value:', select.options[0].value);
  }

  function updateImages(file) {
    if (!file) {
      console.warn('⚠️ updateImages called with empty file');
      return;
    }
    const topPath = `${base}/fatalities_by_conflict/${file}`;
    const bottomPath = `${base}/headlines_by_conflict/${file}`;
    console.log('🖼️ Updating images:', { topPath, bottomPath });

    if (topImg) topImg.src = topPath;
    if (bottomImg) bottomImg.src = bottomPath;
  }

  select.addEventListener('change', (e) => {
    console.log('🎚️ Selection changed to:', e.target.value);
    updateImages(e.target.value);
  });

  // --- Load first conflict automatically ---
  const first = select.options[0]?.value;
  if (first) {
    console.log('🚀 Initial image load:', first);
    select.value = first;
    updateImages(first);
  } else {
    console.warn('⚠️ No options available to initialize');
  }
}



// export function init() {
//   const root = document.querySelector('[data-filter-panel]');
//   if (!root) return;

//   const base = root.dataset.base;
//   const select = root.querySelector('#conflict-select');
//   const topImg = root.querySelector('img[alt="Top"]');
//   const bottomImg = root.querySelector('img[alt="Bottom"]');

//   function updateImages(file) {
//     if (!file) return;
//     const topPath = `${base}/fatalities_by_conflict/${file}`;
//     const bottomPath = `${base}/headlines_by_conflict/${file}`;
//     topImg.src = topPath;
//     bottomImg.src = bottomPath;
//   }

//   // When selection changes
//   select.addEventListener('change', (e) => updateImages(e.target.value));

//   // --- Load first conflict automatically ---
//   const first = select.options[0]?.value;
//   if (first) {
//     select.value = first;
//     updateImages(first);
//   }
// }