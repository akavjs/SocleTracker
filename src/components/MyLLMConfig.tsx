import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function MyLLMConfig() {
  const { currentUser, updateUserLLMConfig } = useUser();
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!currentUser) return null;

  const { llmConfig } = currentUser;

  const models = {
    openai: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    ollama: ['llama3', 'mistral', 'codellama'],
    custom: ['custom-model']
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = () => {
    if (!testMessage.trim()) return;
    setIsTesting(true);
    setTestResponse('');

    setTimeout(() => {
      const responses = [
        "D'après l'analyse de vos applications, la progression globale de votre migration est en bonne voie. Je recommande de prioriser les applications bloquées.",
        "J'ai analysé vos charts Helm. Tout semble correct pour les applications en cours de migration. Aucun problème détecté.",
        "Vos environnements sont stables. Les déploiements sur DEV et STAGING sont opérationnels.",
        "Je vous suggère de vérifier les NetworkPolicies avant de poursuivre la migration en production."
      ];
      setTestResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-brain" style={{ marginRight: '8px' }}></i>
          Mon Assistant IA
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configurez votre modèle de langage personnel
        </p>
      </div>

      {/* Status */}
      {saved && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: '#d1fae5',
          color: '#065f46',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-check-circle"></i>
          Configuration sauvegardée avec succès !
        </div>
      )}

      {/* Config Form */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
          Paramètres du modèle
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Provider Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Provider
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {(['openai', 'anthropic', 'ollama', 'custom'] as const).map(provider => (
                <button
                  key={provider}
                  onClick={() => updateUserLLMConfig({ provider, model: models[provider][0] })}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '8px',
                    border: llmConfig.provider === provider ? '2px solid #4f46e5' : '1px solid #d1d5db',
                    background: llmConfig.provider === provider ? '#eef2ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <i className={`fas fa-${
                    provider === 'openai' ? 'brain' :
                    provider === 'anthropic' ? 'robot' :
                    provider === 'ollama' ? 'server' : 'cog'
                  }`} style={{ fontSize: '20px', color: llmConfig.provider === provider ? '#4f46e5' : '#6b7280', marginBottom: '8px', display: 'block' }}></i>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: llmConfig.provider === provider ? '#4f46e5' : '#374151' }}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Modèle
            </label>
            <select
              value={llmConfig.model}
              onChange={(e) => updateUserLLMConfig({ model: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            >
              {models[llmConfig.provider].map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Clé API personnelle
            </label>
            <input
              type="password"
              value={llmConfig.apiKey}
              onChange={(e) => updateUserLLMConfig({ apiKey: e.target.value })}
              placeholder="sk-xxxxxxxxxxxx"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
            />
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              🔒 Votre clé est stockée localement et n'est pas partagée
            </p>
          </div>

          {/* Endpoint */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Endpoint API
            </label>
            <input
              type="url"
              value={llmConfig.endpoint}
              onChange={(e) => updateUserLLMConfig({ endpoint: e.target.value })}
              placeholder="https://api.openai.com/v1"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Temperature */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Température : {llmConfig.temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={llmConfig.temperature}
              onChange={(e) => updateUserLLMConfig({ temperature: parseFloat(e.target.value) })}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              <span>Précis (0)</span>
              <span>Créatif (1)</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Tokens maximum
            </label>
            <input
              type="number"
              value={llmConfig.maxTokens}
              onChange={(e) => updateUserLLMConfig({ maxTokens: parseInt(e.target.value) })}
              min="100"
              max="8000"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#4f46e5',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-save"></i>
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Test Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
          Tester mon assistant
        </h2>

        <textarea
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          placeholder="Posez une question sur vos applications..."
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit',
            marginBottom: '12px'
          }}
        />

        <button
          onClick={handleTest}
          disabled={!testMessage.trim() || isTesting}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: (!testMessage.trim() || isTesting) ? '#e5e7eb' : '#10b981',
            color: (!testMessage.trim() || isTesting) ? '#9ca3af' : 'white',
            cursor: (!testMessage.trim() || isTesting) ? 'not-allowed' : 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}
        >
          <i className={`fas ${isTesting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
          {isTesting ? 'Test en cours...' : 'Envoyer'}
        </button>

        {testResponse && (
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            background: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
              RÉPONSE
            </p>
            <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.6' }}>
              {testResponse}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
