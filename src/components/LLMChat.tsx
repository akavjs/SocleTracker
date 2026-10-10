import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function LLMChat() {
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Bonjour ${currentUser?.name?.split(' ')[0] || ''} ! 👋\n\nJe suis votre assistant IA personnel, propulsé par **${currentUser?.llmConfig.model || 'GPT-4'}**.\n\nJe peux vous aider avec :\n• L'état de vos applications\n• Les environnements de déploiement\n• Les charts Helm\n• Les blocages de migration\n\nComment puis-je vous aider ?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    const appName = currentUser?.applications?.[0]?.name || 'votre application';
    
    if (lower.includes('migration') || lower.includes('progress') || lower.includes('état')) {
      return `## État de votre migration\n\nVous avez **${currentUser?.applications.length || 0}** application(s) personnelle(s).\n\n${currentUser?.applications.map(app => `- **${app.name}** : ${app.migrationProgress}% (${app.migrationStatus})`).join('\n') || 'Aucune application configurée. Ajoutez-en via "Mes applications".'}\n\n💡 Allez dans "Mes connexions Git" pour vérifier vos charts Helm.`;
    }
    if (lower.includes('bloqué') || lower.includes('block') || lower.includes('problème')) {
      const blocked = currentUser?.applications.filter(a => a.migrationStatus === 'blocked') || [];
      if (blocked.length === 0) {
        return "✅ Bonne nouvelle ! Aucune de vos applications n'est actuellement bloquée.";
      }
      return `## Applications bloquées\n\n${blocked.map(app => `- **${app.name}** : ${app.migrationProgress}% complété`).join('\n')}\n\nJe vous recommande de vérifier les charts Helm dans "Mes connexions Git".`;
    }
    if (lower.includes('environnement') || lower.includes('deploy') || lower.includes('pod')) {
      return `## Vos environnements\n\nVos applications sont déployées sur les environnements configurés. Consultez la section "Environnements" pour voir le statut en temps réel de chaque déploiement.`;
    }
    if (lower.includes('helm') || lower.includes('chart') || lower.includes('gitlab') || lower.includes('github')) {
      const gitConfigs = currentUser?.gitConfigs || [];
      if (gitConfigs.length === 0) {
        return "⚠️ Vous n'avez pas encore configuré de connexion Git.\n\nAllez dans **Mes connexions Git** pour ajouter vos repositories GitLab/GitHub et vérifier vos charts Helm.";
      }
      return `## Vos connexions Git\n\n${gitConfigs.map(c => `- **${c.provider}** : ${c.organization} (${c.status === 'connected' ? '✅ Connecté' : '○ Déconnecté'})`).join('\n')}\n\nDernière synchronisation : ${gitConfigs[0]?.lastSync || 'Jamais'}`;
    }
    if (lower.includes('config') || lower.includes('ia') || lower.includes('llm')) {
      return `## Configuration IA\n\nVous utilisez actuellement :\n- **Provider** : ${currentUser?.llmConfig.provider || 'Non configuré'}\n- **Modèle** : ${currentUser?.llmConfig.model || 'Non configuré'}\n- **Température** : ${currentUser?.llmConfig.temperature || 0.7}\n\nVous pouvez modifier ces paramètres dans "Mon assistant IA".`;
    }
    return `Je suis votre assistant personnel pour la migration. Voici ce que je peux faire :\n\n• **"migration"** - État de vos applications\n• **"bloqué"** - Applications en difficulté\n• **"environnement"** - État des déploiements\n• **"helm"** - Vos charts Helm\n• **"config"** - Configuration IA actuelle\n\nPosez-moi une question !`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const suggestions = [
    { label: 'État migration', icon: '📊' },
    { label: 'Apps bloquées', icon: '🚨' },
    { label: 'Charts Helm', icon: '📦' },
    { label: 'Configuration', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-robot" style={{ color: 'white', fontSize: '18px' }}></i>
          </div>
          <div>
            <h2 style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>Assistant IA Personnel</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
              {currentUser?.llmConfig.model || 'Modèle non configuré'} • Configuré pour {currentUser?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              borderRadius: '16px',
              padding: '12px 16px',
              background: msg.role === 'user' ? '#4f46e5' : '#f3f4f6',
              color: msg.role === 'user' ? 'white' : '#111827'
            }}>
              <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.content}</div>
              <div style={{ fontSize: '11px', marginTop: '8px', color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
                {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: '#f3f4f6', borderRadius: '16px', padding: '12px 16px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite 0.15s' }}></div>
                <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%', animation: 'bounce 1s infinite 0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {suggestions.map(s => (
            <button
              key={s.label}
              onClick={() => setInput(s.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#4b5563',
                cursor: 'pointer'
              }}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ borderTop: '1px solid #e5e7eb', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Posez une question..."
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            style={{
              padding: '10px 16px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
              opacity: (!input.trim() || isTyping) ? 0.5 : 1
            }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
