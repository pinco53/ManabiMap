(function () {
  'use strict';

  const status = document.getElementById('enCopyStatus');
  let statusTimer = 0;

  function promptFor(card) {
    const date = card.dataset.date || '';
    const title = card.dataset.title || '';
    const description = (card.querySelector('p') || {}).textContent || '';
    const lenses = Array.from(card.querySelectorAll('.en-lenses span')).map(function (item) { return item.textContent; }).join(', ');
    const source = card.querySelector('.en-source');
    const sourceLine = source ? '\nSuggested source: ' + source.href : '';

    return 'Help me build the background knowledge needed to understand a turning point in cosmic and human history.\n\n' +
      'Turning point: ' + title + '\n' +
      'Date: ' + date + '\n' +
      'Timeline summary: ' + description.trim() + '\n' +
      'Relevant lenses: ' + lenses + sourceLine + '\n\n' +
      'First explain in clear, everyday English: (1) what the situation was before this change, (2) what changed, and (3) what later developments it made possible. Build a foundation before asking for my opinion. Separate established evidence from interpretation, disputed dates, and speculation. Do not treat chronological proximity as proof of causation. Include at least one limitation, uncertainty, or alternative perspective. End by offering two or three directions I could explore next, and invite me to ask my own question.';
  }

  function showStatus(message) {
    window.clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = window.setTimeout(function () { status.textContent = ''; }, 5000);
  }

  async function copyPrompt(card) {
    const prompt = promptFor(card);
    try {
      await navigator.clipboard.writeText(prompt);
      showStatus('Inquiry prompt copied. Paste it into the AI you use.');
    } catch (_) {
      const fallback = document.createElement('textarea');
      fallback.value = prompt;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      const copied = document.execCommand('copy');
      fallback.remove();
      showStatus(copied ? 'Inquiry prompt copied. Paste it into the AI you use.' : 'Copy was unavailable in this browser.');
    }
  }

  document.querySelectorAll('.en-ai-button').forEach(function (button) {
    button.addEventListener('click', function () {
      copyPrompt(button.closest('.en-event'));
    });
  });
}());
