interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Ouvrir la recherche globale' },
    { keys: ['Ctrl', 'D'], description: 'Basculer le mode sombre' },
    { keys: ['Ctrl', 'F'], description: 'Activer le mode focus' },
    { keys: ['Shift', '?'], description: 'Afficher les raccourcis' },
    { keys: ['Esc'], description: 'Fermer les modales' }
  ];

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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0 }}>
            <i className="fas fa-keyboard" style={{ marginRight: '8px' }}></i>
            Raccourcis clavier
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              color: '#6b7280'
            }}
          >
            <i className="fas fa-times" style={{ fontSize: '18px' }}></i>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px'
              }}
            >
              <span style={{ color: '#374151', fontSize: '14px' }}>
                {shortcut.description}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex}>
                    <kbd
                      style={{
                        padding: '4px 8px',
                        background: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#374151',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span style={{ color: '#9ca3af', margin: '0 2px' }}>+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '12px', background: '#eff6ff', borderRadius: '8px', fontSize: '13px', color: '#1e40af' }}>
          <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
          Les raccourcis sont désactivés lorsque vous tapez dans un champ de texte.
        </div>
      </div>
    </div>
  );
}
