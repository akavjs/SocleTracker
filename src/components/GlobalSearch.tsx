import { useState, useEffect, useRef } from 'react';
import { releases } from '../data/releases';
import { applications } from '../data/applications';

interface SearchResult {
  id: string;
  type: 'release' | 'application' | 'service';
  title: string;
  subtitle: string;
  icon: string;
  view: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, id?: string) => void;
}

export default function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const newResults: SearchResult[] = [];

    // Rechercher dans les releases
    releases.forEach(release => {
      if (
        release.name.toLowerCase().includes(q) ||
        release.version.toLowerCase().includes(q) ||
        release.description.toLowerCase().includes(q)
      ) {
        newResults.push({
          id: release.id,
          type: 'release',
          title: release.name,
          subtitle: `${release.version} • ${release.status}`,
          icon: '🚀',
          view: 'releases'
        });
      }
    });

    // Rechercher dans les applications
    applications.forEach(app => {
      if (
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.team.toLowerCase().includes(q)
      ) {
        newResults.push({
          id: app.id,
          type: 'application',
          title: app.name,
          subtitle: `${app.team} • ${app.migrationStatus}`,
          icon: '📦',
          view: 'my-apps'
        });
      }
    });

    setResults(newResults.slice(0, 10)); // Limiter à 10 résultats
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      const result = results[selectedIndex];
      onNavigate(result.view, result.id);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fas fa-search" style={{ color: '#9ca3af', fontSize: '18px' }}></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher des releases, applications, services..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#111827'
              }}
            />
            <kbd style={{
              padding: '4px 8px',
              background: '#f3f4f6',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#6b7280'
            }}>
              ESC
            </kbd>
          </div>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
              {query ? (
                <>
                  <i className="fas fa-search" style={{ fontSize: '32px', marginBottom: '12px' }}></i>
                  <p>Aucun résultat pour "{query}"</p>
                </>
              ) : (
                <>
                  <i className="fas fa-keyboard" style={{ fontSize: '32px', marginBottom: '12px' }}></i>
                  <p>Commencez à taper pour rechercher</p>
                </>
              )}
            </div>
          ) : (
            results.map((result, index) => (
              <div
                key={`${result.type}-${result.id}`}
                onClick={() => {
                  onNavigate(result.view, result.id);
                  onClose();
                }}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  background: index === selectedIndex ? '#f3f4f6' : 'transparent',
                  transition: 'background 0.1s'
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span style={{ fontSize: '24px' }}>{result.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#111827', marginBottom: '2px' }}>
                    {result.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    {result.subtitle}
                  </div>
                </div>
                <i className="fas fa-arrow-right" style={{ color: '#9ca3af' }}></i>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '16px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <span>
            <kbd style={{ padding: '2px 6px', background: '#f3f4f6', borderRadius: '3px' }}>↑↓</kbd> Naviguer
          </span>
          <span>
            <kbd style={{ padding: '2px 6px', background: '#f3f4f6', borderRadius: '3px' }}>↵</kbd> Sélectionner
          </span>
          <span>
            <kbd style={{ padding: '2px 6px', background: '#f3f4f6', borderRadius: '3px' }}>esc</kbd> Fermer
          </span>
        </div>
      </div>
    </div>
  );
}
