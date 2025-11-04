export function init(){
  const bus = new EventTarget();

  // Wire inputs/selects with [name]
  document.querySelectorAll('input[name], select[name]').forEach(ctrl => {
    const emit = () => bus.dispatchEvent(new CustomEvent(ctrl.name, { detail: ctrl.value }));
    ctrl.addEventListener('input', emit);
    ctrl.addEventListener('change', emit);
    // fire initial
    emit();
  });

  // Images that depend on a control
  document.querySelectorAll('[data-behavior="bind"]').forEach(img => {
    const key = img.dataset.bind;
    const tpl = img.dataset.srcTemplate; // e.g. "/img/foo_{year}.png"
    if (!key || !tpl) return;

    bus.addEventListener(key, e => {
      const v = e.detail;
      img.src = tpl.replaceAll('{'+key+'}', v);
      img.alt = img.dataset.caption ? img.dataset.caption.replaceAll('{'+key+'}', v) : img.alt;
    });
  });
}
