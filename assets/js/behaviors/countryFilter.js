export function init() {
  const root = document.querySelector('[data-country-filter-panel]');
  if (!root) {
    console.warn('⚠️ No [data-country-filter-panel] found');
    return;
  }

  console.log('✅ Country filter found:', root);
  console.log('🧭 data-base:', root.dataset.base);

  const base = root.dataset.base;
  const select = root.querySelector('#conflict-select');
  const topImg = root.querySelector('img[alt="Top"]');

  if (!select) {
    console.warn('⚠️ No <select id="conflict-select"> found');
    return;
  }

  console.log('📊 Number of options:', select.options.length);
  if (select.options.length > 0) {
    console.log('🔹 First option value:', select.options[0].value);
  }

  function updateImages(file) {
    if (!file) return;
    const path = `${base}/${file}`;
    console.log('🖼️ Updating top image →', path);
    if (topImg) topImg.src = path;
  }

  select.addEventListener('change', e => {
    console.log('🎚️ Changed to', e.target.value);
    updateImages(e.target.value);
  });

  const first = select.options[0]?.value;
  if (first) {
    console.log('🚀 Initial load with', first);
    select.value = first;
    updateImages(first);
  } else {
    console.warn('⚠️ No options available');
  }
}


// export function init() {
//   const root = document.querySelector('[data-country-filter-panel]');
//   if (!root) return;

//   const base = root.dataset.base;
//   const select = root.querySelector('#conflict-select');
//   const topImg = root.querySelector('img[alt="Top"]');

//   function updateImages(file) {
//     if (!file) return;
//     topImg.src = `${base}/${file}`;
//   }

//   select.addEventListener('change', e => updateImages(e.target.value));

//   const first = select.options[0]?.value;
//   if (first) {
//     select.value = first;
//     updateImages(first);
//   }
// }