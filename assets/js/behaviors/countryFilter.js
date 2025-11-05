export function init() {
  const root = document.querySelector('[data-country-filter-panel]');
  if (!root) {
    console.warn('⚠️ No [data-country-filter-panel] found');
    return;
  }

  const select = root.querySelector('#conflict-select');
  const topImg = root.querySelector('img[alt="Top"]');

  if (!select) {
    console.warn('⚠️ No <select id="conflict-select"> found');
    return;
  }

  const getBase = () => (root.dataset.base || '').replace(/\/+$/, ''); // trim trailing slash

  function updateImages(file) {
    if (!file) return;
    const base = getBase();
    if (!base) {
      console.warn('⏳ base not set yet, skipping update');
      return;
    }
    const path = `${base}/${file}`; // file is already encoded in your <option> value
    console.log('🖼️ Updating top image →', path);
    if (topImg) topImg.src = path;
  }

  // Change handler
  select.addEventListener('change', e => {
    console.log('🎚️ Changed to', e.target.value);
    updateImages(e.target.value);
  });

  // Ready check: base set AND options exist
  const isReady = () => !!getBase() && select.options.length > 0;

  // One-time initializer when ready
  function tryInitOnce() {
    if (!isReady()) return false;
    const first = select.options[0].value;
    console.log('🚀 Initial load with', first, 'base:', getBase());
    select.value = first;
    updateImages(first);
    return true;
  }

  // Fast path: already ready
  if (tryInitOnce()) return;

  console.warn('⏳ Waiting for base and options…');

  // Observe both: (1) options added to <select>, (2) data-base set on the root
  const selectObserver = new MutationObserver(() => {
    if (tryInitOnce()) {
      selectObserver.disconnect();
      rootObserver.disconnect();
    }
  });
  selectObserver.observe(select, { childList: true });

  const rootObserver = new MutationObserver(() => {
    if (tryInitOnce()) {
      selectObserver.disconnect();
      rootObserver.disconnect();
    }
  });
  rootObserver.observe(root, { attributes: true, attributeFilter: ['data-base'] });
}



// export function init() {
//   const root = document.querySelector('[data-country-filter-panel]');
//   if (!root) {
//     console.warn('⚠️ No [data-country-filter-panel] found');
//     return;
//   }

//   console.log('✅ Country filter found:', root);
//   console.log('🧭 data-base:', root.dataset.base);

//   const base = root.dataset.base;
//   const select = root.querySelector('#conflict-select');
//   const topImg = root.querySelector('img[alt="Top"]');

//   if (!select) {
//     console.warn('⚠️ No <select id="conflict-select"> found');
//     return;
//   }

//   function updateImages(file) {
//     if (!file) return;
//     const path = `${base}/${file}`;
//     console.log('🖼️ Updating top image →', path);
//     if (topImg) topImg.src = path;
//   }

//   // Handle manual selection
//   select.addEventListener('change', e => {
//     console.log('🎚️ Changed to', e.target.value);
//     updateImages(e.target.value);
//   });

//   // --- 🕓 Wait for options if not yet available ---
//   if (select.options.length === 0) {
//     console.warn('⏳ No options yet — waiting for them to appear...');
//     const observer = new MutationObserver((mutations, obs) => {
//       if (select.options.length > 0) {
//         console.log('🎯 Options now available, initializing image');
//         const first = select.options[0].value;
//         select.value = first;
//         updateImages(first);
//         obs.disconnect();
//       }
//     });
//     observer.observe(select, { childList: true });
//     return; // exit until options appear
//   }

//   // --- 🚀 Normal initialization path ---
//   console.log('📊 Number of options:', select.options.length);
//   if (select.options.length > 0) {
//     console.log('🔹 First option value:', select.options[0].value);
//     const first = select.options[0].value;
//     select.value = first;
//     updateImages(first);
//   } else {
//     console.warn('⚠️ No options available after observer');
//   }
// }



// export function init() {
//   const root = document.querySelector('[data-country-filter-panel]');
//   if (!root) {
//     console.warn('⚠️ No [data-country-filter-panel] found');
//     return;
//   }

//   console.log('✅ Country filter found:', root);
//   console.log('🧭 data-base:', root.dataset.base);

//   const base = root.dataset.base;
//   const select = root.querySelector('#conflict-select');
//   const topImg = root.querySelector('img[alt="Top"]');

//   if (!select) {
//     console.warn('⚠️ No <select id="conflict-select"> found');
//     return;
//   }

//   console.log('📊 Number of options:', select.options.length);
//   if (select.options.length > 0) {
//     console.log('🔹 First option value:', select.options[0].value);
//   }

//   function updateImages(file) {
//     if (!file) return;
//     const path = `${base}/${file}`;
//     console.log('🖼️ Updating top image →', path);
//     if (topImg) topImg.src = path;
//   }

//   select.addEventListener('change', e => {
//     console.log('🎚️ Changed to', e.target.value);
//     updateImages(e.target.value);
//   });

//   const first = select.options[0]?.value;
//   if (first) {
//     console.log('🚀 Initial load with', first);
//     select.value = first;
//     updateImages(first);
//   } else {
//     console.warn('⚠️ No options available');
//   }
// }


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