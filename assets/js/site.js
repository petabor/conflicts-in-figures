document.addEventListener('DOMContentLoaded', async () => {
  const baseurl = '/conflicts-in-figures';

  const need = new Set([...document.querySelectorAll('[data-behavior]')]
    .map(el => el.dataset.behavior));

  const mods = {};
  const load = async (name, file) => (mods[name] ??= await import(file));

  await import('/conflicts-in-figures/assets/js/behaviors/yearPanel.js').then(m => m.init());
  await import('/conflicts-in-figures/assets/js/behaviors/comparePanel.js').then(m => m.init());
  await import('/conflicts-in-figures/assets/js/behaviors/conflictFilter.js').then(m => m.init());
  await import('/conflicts-in-figures/assets/js/behaviors/countryFilter.js').then(m => m.init());

  if (need.has('enlarge')) await load('enlarge', '/conflicts-in-figures/assets/js/behaviors/enlarge.js').then(m => m.init());
  if (need.has('zoom'))    await load('zoom',    '/conflicts-in-figures/assets/js/behaviors/zoom.js').then(m => m.init());
  if (need.has('link'))    await load('link',    '/conflicts-in-figures/assets/js/behaviors/link.js').then(m => m.init());
  if (need.has('bind'))    await load('bind',    '/conflicts-in-figures/assets/js/behaviors/bind.js').then(m => m.init());
  
});