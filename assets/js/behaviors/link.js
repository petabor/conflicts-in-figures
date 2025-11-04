export function init(){
  document.querySelectorAll('[data-behavior="link"]').forEach(img => {
    const href = img.dataset.link;
    if (!href) return;
    img.style.cursor = 'pointer';
    img.tabIndex = 0;
    const go = () => location.assign(href);
    img.addEventListener('click', go);
    img.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); go(); }});
  });
}
