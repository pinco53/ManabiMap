(function () {
  'use strict';

  var theme = document.querySelector('[data-theme-filter]');
  var buttons = Array.from(document.querySelectorAll('[data-format-filters] [data-format]'));
  var items = Array.from(document.querySelectorAll('[data-library-item]'));
  var count = document.querySelector('[data-result-count]');
  var empty = document.querySelector('[data-library-empty]');
  var reset = document.querySelector('[data-library-reset]');
  var activeFormat = 'all';
  var params = new URLSearchParams(window.location.search);
  var requestedFormat = params.get('format');
  var availableFormats = buttons.map(function (button) { return button.dataset.format; });

  if (!theme || !items.length) return;

  if (requestedFormat && availableFormats.includes(requestedFormat)) {
    activeFormat = requestedFormat;
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.format === activeFormat));
    });
  }

  function update() {
    var activeTheme = theme.value;
    var visible = 0;

    items.forEach(function (item) {
      var formatMatches = activeFormat === 'all' || item.dataset.format === activeFormat;
      var itemThemes = (item.dataset.themes || '').split(' ');
      var themeMatches = activeTheme === 'all' || itemThemes.includes(activeTheme);
      var show = formatMatches && themeMatches;

      item.hidden = !show;
      if (show) visible += 1;
    });

    count.textContent = visible + '件';
    empty.hidden = visible !== 0;
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeFormat = button.dataset.format;
      buttons.forEach(function (candidate) {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      });
      update();
    });
  });

  theme.addEventListener('change', update);

  if (reset) {
    reset.addEventListener('click', function () {
      activeFormat = 'all';
      theme.value = 'all';
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.format === 'all'));
      });
      update();
      theme.focus();
    });
  }

  update();
})();
