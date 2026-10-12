(() => {
  'use strict';
  const timelines = window.MANABI_PHILOSOPHY_HISTORY;
  const root = document.getElementById('ph-timelines');
  if (!root || !Array.isArray(timelines)) {
    if (root) root.textContent = '年表を読み込めませんでした。ページを再読み込みしてください。';
    return;
  }

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const appendEntry = (list, item, number) => {
    const article = make('article', 'ph-entry');
    article.id = `ph-${item.id}`;

    const time = make('div', 'ph-entry__time', item.date);
    time.setAttribute('aria-label', `年代：${item.date}`);
    const heading = make('div', 'ph-entry__heading');
    heading.append(
      make('span', 'ph-entry__number', String(number).padStart(2, '0')),
      make('span', 'ph-entry__place', item.region),
      make('h3', '', item.title),
      make('p', 'ph-entry__question', item.question)
    );

    const content = make('div', 'ph-entry__content');
    content.append(make('span', 'ph-entry__rubric', 'ESSENCE · 思想の核'), make('p', 'ph-entry__essay', item.essence));
    const source = make('a', 'ph-entry__source', '参考資料を読む ↗');
    source.href = item.source;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    content.append(source);
    article.append(time, heading, content);
    list.append(article);
  };

  const fragment = document.createDocumentFragment();
  timelines.forEach((timeline, index) => {
    const section = make('section', `ph-timeline ph-timeline--${timeline.id}`);
    section.id = timeline.id;
    section.setAttribute('aria-labelledby', `ph-${timeline.id}-title`);

    const header = make('header', 'ph-timeline__header');
    const marker = make('div', 'ph-timeline__marker');
    marker.append(make('span', '', String(index + 1).padStart(2, '0')), make('span', '', timeline.label));
    const copy = make('div', 'ph-timeline__copy');
    const title = make('h2', '', timeline.title);
    title.id = `ph-${timeline.id}-title`;
    copy.append(title, make('p', 'ph-timeline__lead', timeline.lead), make('p', 'ph-timeline__note', timeline.note));
    header.append(marker, copy);

    const list = make('div', 'ph-timeline__entries');
    timeline.entries.forEach((entry, entryIndex) => appendEntry(list, entry, entryIndex + 1));
    const ending = make('div', 'ph-timeline__ending');
    ending.append(make('span', '', `${timeline.entries.length}の転換点`));
    const top = make('a', '', '3つの年表に戻る ↑');
    top.href = '#ph-index-links';
    ending.append(top);
    section.append(header, list, ending);
    fragment.append(section);
  });

  root.replaceChildren(fragment);
})();
