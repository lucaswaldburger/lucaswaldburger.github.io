/* Preview-only theme switcher.
   Lets three design directions be compared live; the chosen one is persisted
   in localStorage. Remove this script (and its markup in homepage.html) once a
   theme is finalized. */
(function () {
  var THEMES = [
    { key: 'signal', label: 'Modern' },
    { key: 'refined', label: 'Navy' },
    { key: 'editorial', label: 'Editorial' }
  ];
  var STORAGE_KEY = 'lw-theme';

  function current() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var valid = THEMES.some(function (t) { return t.key === saved; });
    return valid ? saved : 'signal';
  }

  function apply(key) {
    document.documentElement.setAttribute('data-theme', key);
    try { localStorage.setItem(STORAGE_KEY, key); } catch (e) {}
    var buttons = document.querySelectorAll('#theme-switcher button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('active', buttons[i].getAttribute('data-theme-key') === key);
    }
  }

  function build() {
    if (document.getElementById('theme-switcher')) return;
    var bar = document.createElement('div');
    bar.id = 'theme-switcher';

    var label = document.createElement('span');
    label.className = 'ts-label';
    label.textContent = 'Theme';
    bar.appendChild(label);

    THEMES.forEach(function (t) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t.label;
      btn.setAttribute('data-theme-key', t.key);
      btn.addEventListener('click', function () { apply(t.key); });
      bar.appendChild(btn);
    });

    document.body.appendChild(bar);
    apply(current());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
