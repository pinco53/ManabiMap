(function() {
  'use strict';

  function pageName() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    return file || 'index';
  }

  function sendEvent(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
  }

  function paramsFrom(element) {
    return {
      source_page: element.dataset.trackSource || pageName(),
      content_id: element.dataset.trackContentId || '',
      destination_type: element.dataset.trackDestinationType || '',
      destination_id: element.dataset.trackDestinationId || '',
      link_text: (element.textContent || '').trim().slice(0, 80)
    };
  }

  document.addEventListener('click', function(event) {
    const target = event.target.closest('[data-track-event]');
    if (!target) return;
    sendEvent(target.dataset.trackEvent, paramsFrom(target));
  });
})();
