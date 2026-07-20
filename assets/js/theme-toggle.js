/* Light/dark mode toggle.
   The initial mode is set before paint by the inline script in the <head>
   (defaults to dark). This wires the button: it flips data-mode on <html>,
   persists the choice to localStorage, and keeps the icon + ARIA state in sync. */
(function () {
  var btn = document.getElementById('mode-toggle');
  if (!btn) return;

  function current() {
    return document.documentElement.getAttribute('data-mode') === 'light' ? 'light' : 'dark';
  }

  function render(mode) {
    var isDark = mode === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    // In dark mode we offer a sun (→ switch to light); in light mode, a moon (→ dark).
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    var icon = btn.querySelector('i');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }

  function apply(mode) {
    document.documentElement.setAttribute('data-mode', mode);
    try { localStorage.setItem('lw-mode', mode); } catch (e) {}
    render(mode);
  }

  render(current());
  btn.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark');
  });
})();
