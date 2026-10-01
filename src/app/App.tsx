import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { searchTools, tools } from '../tools/registry';
import type { ToolCategory } from '../tools/types';

type Theme = 'dark' | 'light' | 'system';

function resolvedTheme(theme: Theme) {
  return theme === 'system'
    ? matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme;
}

export function App() {
  const [activeId, setActiveId] = useLocalStorage('active-tool', tools[0].id);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [recent, setRecent] = useLocalStorage<string[]>('recent-tools', []);
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const [query, setQuery] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const active = tools.find((tool) => tool.id === activeId) ?? tools[0];
  const matches = useMemo(() => searchTools(query), [query]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === 'Escape') setPaletteOpen(false);
    };
    addEventListener('keydown', handleKey);
    return () => removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (paletteOpen) setTimeout(() => searchRef.current?.focus(), 0);
  }, [paletteOpen]);

  const openTool = (id: string) => {
    setActiveId(id);
    setRecent((items) =>
      [id, ...items.filter((item) => item !== id)].slice(0, 5),
    );
    setPaletteOpen(false);
    setQuery('');
  };

  const grouped = useMemo(() => {
    const categories: ToolCategory[] = ['Data', 'Encode', 'Generate', 'Text'];
    return categories.map((category) => ({
      category,
      items: tools.filter((tool) => tool.category === category),
    }));
  }, []);
  const ActiveTool = active.component;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">&gt;_</div>
          <div>
            <strong>Dev Toolbox</strong>
            <span>Local developer utilities</span>
          </div>
        </div>
        <button className="search-trigger" onClick={() => setPaletteOpen(true)}>
          <span>⌕ Search tools</span>
          <kbd>⌘ K</kbd>
        </button>
        <nav>
          {favorites.length > 0 && (
            <ToolGroup
              title="Favorites"
              ids={favorites}
              activeId={active.id}
              onOpen={openTool}
            />
          )}
          {recent.length > 0 && (
            <ToolGroup
              title="Recent"
              ids={recent}
              activeId={active.id}
              onOpen={openTool}
            />
          )}
          {grouped.map(({ category, items }) => (
            <ToolGroup
              key={category}
              title={category}
              ids={items.map((item) => item.id)}
              activeId={active.id}
              onOpen={openTool}
            />
          ))}
        </nav>
        <div className="sidebar-footer">
          <select
            aria-label="Color theme"
            value={theme}
            onChange={(event) => setTheme(event.target.value as Theme)}
          >
            <option value="system">System theme</option>
            <option value="dark">Dark theme</option>
            <option value="light">Light theme</option>
          </select>
          <span>Offline · v0.1.0</span>
        </div>
      </aside>
      <main className="workspace">
        <div className="workspace-topbar">
          <span>{active.category}</span>
          <button
            className={
              favorites.includes(active.id) ? 'favorite active' : 'favorite'
            }
            onClick={() =>
              setFavorites((items) =>
                items.includes(active.id)
                  ? items.filter((id) => id !== active.id)
                  : [...items, active.id],
              )
            }
            aria-label="Toggle favorite"
          >
            ★
          </button>
        </div>
        <div className="tool-content">
          <Suspense
            fallback={<div className="tool-loading">Loading tool…</div>}
          >
            <ActiveTool />
          </Suspense>
        </div>
      </main>
      {paletteOpen && (
        <div
          className="palette-backdrop"
          onMouseDown={() => setPaletteOpen(false)}
        >
          <section
            className="palette"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search JSON, JWT, UUID…"
            />
            <div>
              {matches.length ? (
                matches.map((tool) => (
                  <button key={tool.id} onClick={() => openTool(tool.id)}>
                    <i>{tool.icon}</i>
                    <span>
                      <strong>{tool.name}</strong>
                      <small>{tool.description}</small>
                    </span>
                    <em>{tool.category}</em>
                  </button>
                ))
              ) : (
                <p className="empty">No tools found</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ToolGroup({
  title,
  ids,
  activeId,
  onOpen,
}: {
  title: string;
  ids: string[];
  activeId: string;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="nav-group">
      <h2>{title}</h2>
      {ids.map((id) => {
        const tool = tools.find((item) => item.id === id);
        return tool ? (
          <button
            key={id}
            className={activeId === id ? 'active' : ''}
            onClick={() => onOpen(id)}
          >
            <i>{tool.icon}</i>
            <span>{tool.name}</span>
          </button>
        ) : null;
      })}
    </section>
  );
}
