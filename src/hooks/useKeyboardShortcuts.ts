import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorer si on est dans un input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;
        const altMatch = shortcut.alt ? e.altKey : true;

        if (e.key.toLowerCase() === shortcut.key.toLowerCase() && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Shortcuts par défaut pour Relivio
export const defaultShortcuts: KeyboardShortcut[] = [
  {
    key: 'k',
    ctrl: true,
    action: () => {
      // Sera défini dynamiquement
      const event = new CustomEvent('relivio:openSearch');
      window.dispatchEvent(event);
    },
    description: 'Ouvrir la recherche'
  },
  {
    key: 'd',
    ctrl: true,
    action: () => {
      const event = new CustomEvent('relivio:toggleDarkMode');
      window.dispatchEvent(event);
    },
    description: 'Basculer mode sombre'
  },
  {
    key: 'f',
    ctrl: true,
    action: () => {
      const event = new CustomEvent('relivio:toggleFocusMode');
      window.dispatchEvent(event);
    },
    description: 'Mode focus'
  },
  {
    key: '?',
    shift: true,
    action: () => {
      const event = new CustomEvent('relivio:showShortcuts');
      window.dispatchEvent(event);
    },
    description: 'Afficher les raccourcis'
  }
];
