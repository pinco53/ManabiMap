(function () {
  'use strict';
  const providers = {
    chatgpt: { name: 'ChatGPT', url: 'https://chatgpt.com/' },
    claude: { name: 'Claude', url: 'https://claude.ai/' },
    gemini: { name: 'Gemini', url: 'https://gemini.google.com/' },
    copilot: { name: 'Copilot', url: 'https://copilot.microsoft.com/' }
  };
  const key = 'manabimap-preferred-ai';
  const panels = [];
  let preference = '';
  try { preference = localStorage.getItem(key) || ''; } catch (_) {}
  if (!providers[preference]) preference = '';

  window.ManabiAI = {
    mount: function (container, getPrompt) {
      const panel = document.createElement('section');
      panel.className = 'ai-handoff';
      panel.innerHTML = '<label>いつものAIで話す<select aria-label="使うAI"><option value="">AIを選ぶ</option></select></label>' +
        '<button type="button" class="ai-handoff__launch" disabled>対話文をコピーしてAIを開く ↗</button>' +
        '<p class="ai-handoff__hint">別タブで開いたAIに貼り付けると、対話を始められます。選んだAIをこの端末に記憶します。</p>' +
        '<p class="ai-handoff__status" role="status"></p>' +
        '<textarea hidden readonly aria-label="AIに渡す対話文"></textarea>' +
        '<a hidden target="_blank" rel="noopener noreferrer">AIを開く ↗</a>';
      const select = panel.querySelector('select');
      Object.entries(providers).forEach(function ([id, provider]) {
        const option = document.createElement('option');
        option.value = id; option.textContent = provider.name; select.appendChild(option);
      });
      const button = panel.querySelector('button');
      const status = panel.querySelector('[role="status"]');
      const fallback = panel.querySelector('textarea');
      const link = panel.querySelector('a');
      function sync() {
        select.value = preference;
        button.disabled = !providers[preference];
        fallback.hidden = true; link.hidden = true; status.textContent = '';
      }
      panels.push(sync); sync();
      const dialog = container.closest('dialog');
      if (dialog) dialog.addEventListener('close', sync);
      select.addEventListener('change', function () {
        preference = select.value;
        try { localStorage.setItem(key, preference); } catch (_) {}
        panels.forEach(fn => fn());
      });
      button.addEventListener('click', async function () {
        const provider = providers[select.value];
        const prompt = getPrompt();
        if (!provider || !prompt) { status.textContent = 'テーマや質問を選んでください。'; return; }
        window.dispatchEvent(new Event('manabimap:ai-handoff'));
        // Reserve the tab during the user's click; clipboard work is asynchronous.
        const tab = window.open('about:blank', '_blank');
        if (tab) tab.opener = null;
        button.disabled = true;
        link.href = provider.url; link.textContent = provider.name + 'を開く ↗';
        try {
          await navigator.clipboard.writeText(prompt);
          if (tab) { tab.location.replace(provider.url); }
          else { link.hidden = false; }
          status.textContent = tab ? 'コピーしました。AIに貼り付けてください。年表はこのタブに残っています。' : 'コピーしました。下のリンクからAIを開いて貼り付けてください。';
        } catch (_) {
          if (tab) tab.close();
          fallback.value = prompt; fallback.hidden = false; link.hidden = false;
          status.textContent = '自動コピーできませんでした。下の文章をコピーしてからAIを開いてください。';
          fallback.focus(); fallback.select();
        } finally { button.disabled = false; }
      });
      container.appendChild(panel);
    }
  };
}());
