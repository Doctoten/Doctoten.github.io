(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.querySelector('span').textContent = dark ? 'Light mode' : 'Dark mode';
  };
  syncTheme();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('charlie-theme', root.dataset.theme); } catch (_) {}
    syncTheme();
  });
  const menu = document.querySelector('.mobile-menu');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    document.querySelector('#site-nav').classList.toggle('is-open', open);
  });
  const input = document.querySelector('#main-query');
  if (!input) return;
  const status = document.querySelector('#search-status');
  const results = document.querySelector('#search-results');
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const tag = params.get('tag');
  input.value = params.get('q') || '';
  let posts = null;
  const normalize = value => String(value || '').toLowerCase();
  const render = () => {
    if (!posts) return;
    results.replaceChildren();
    const query = normalize(input.value).trim();
    const terms = query.split(/\s+/).filter(Boolean);
    const found = posts.filter(post => {
      if (category && !post.categories.some(c => normalize(c) === normalize(category))) return false;
      if (tag && !post.tags.some(t => normalize(t) === normalize(tag))) return false;
      const text = normalize([post.title, post.content, ...post.tags, ...post.categories].join(' '));
      return terms.every(term => text.includes(term));
    });
    const scope = category ? ` in ${category}` : tag ? ` tagged ${tag}` : '';
    status.textContent = `${found.length} ${found.length === 1 ? 'note' : 'notes'} found${scope}${query ? ` for “${input.value.trim()}”` : ''}.`;
    found.forEach(post => {
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = post.url;
      const title = document.createElement('h2'); title.textContent = post.title;
      const date = document.createElement('small'); date.textContent = post.date;
      const excerpt = document.createElement('p'); excerpt.textContent = post.description;
      link.append(date, title, excerpt); results.append(link);
    });
    if (!found.length) { const empty = document.createElement('p'); empty.textContent = 'Try another keyword, or browse the archives.'; results.append(empty); }
  };
  input.addEventListener('input', render);
  document.querySelector('.main-search').addEventListener('submit', event => {
    event.preventDefault();
    const next = new URLSearchParams(location.search);
    input.value.trim() ? next.set('q', input.value.trim()) : next.delete('q');
    history.replaceState(null, '', `${location.pathname}${next.size ? '?' + next : ''}`);
    render();
  });
  const script = document.querySelector('script[data-search-url]');
  fetch(script.dataset.searchUrl).then(response => { if (!response.ok) throw new Error('Search unavailable'); return response.json(); }).then(data => { posts = data; render(); }).catch(() => { status.textContent = 'Search could not load. Please try again or browse the archives.'; });
})();
