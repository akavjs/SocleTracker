import { useState } from 'react';

interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'ollama' | 'custom';
  model: string;
  apiKey: string;
  endpoint: string;
  temperature: number;
  maxTokens: number;
  status: 'active' | 'inactive';
}

export default function LLMConfig() {
  const [config, setConfig] = useState<LLMConfig>({
    provider: 'openai',
    model: 'gpt-4-turbo',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxx',
    endpoint: 'https://api.openai.com/v1',
    temperature: 0.7,
    maxTokens: 2000,
    status: 'active'
  });

  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = () => {
    if (!testMessage.trim()) return;
    
    setIsTesting(true);
    setTestResponse('');
    
    // Simulate LLM response
    setTimeout(() => {
      const responses = [
        "D'après l'analyse des données, la progression globale de la migration est de 51%. L'application payment-processor est actuellement bloquée en raison de problèmes de NetworkPolicy.",
        "Je détecte 3 applications en cours de migration : api-gateway (72%), notification-service (55%), et monitoring-agent (88%). L'application user-service est terminée avec succès.",
        "Les charts Helm présentent des problèmes sur 2 applications : payment-processor (ressources manquantes) et notification-service (obsolète). Je recommande de prioriser la correction du payment-processor qui est bloqué.",
        "L'environnement DEV montre un pod en CrashLoopBackOff pour payment-processor. Les autres environnements (STAGING, PREPROD, PROD) sont opérationnels."
      ];
      
      setTestResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsTesting(false);
    }, 1500);
  };

  const handleSave = () => {
    alert('Configuration sauvegardée avec succès !');
  };

  const models = {
    openai: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    ollama: ['llama3', 'mistral', 'codellama'],
    custom: ['custom-model']
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Configuration Assistant IA
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configurez le modèle de langage pour l'assistant intelligent
        </p>
      </div>

      {/* Configuration Form */}
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
          {/* Provider */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Provider
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {(['openai', 'anthropic', 'ollama', 'custom'] as const).map(provider => (
                <button
                  key={provider}
                  onClick={() => setConfig({ ...config, provider, model: models[provider][0] })}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: config.provider === provider ? '2px solid #4f46e5' : '1px solid #d1d5db',
                    background: config.provider === provider ? '#eef2ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <i className={`fas fa-${
                    provider === 'openai' ? 'brain' :
                    provider === 'anthropic' ? 'robot' :
                    provider === 'ollama' ? 'server' : 'cog'
                  }`} style={{ fontSize: '24px', color: config.provider === provider ? '#4f46e5' : '#6b7280', marginBottom: '8px' }}></i>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: config.provider === provider ? '#4f46e5' : '#374151' }}>
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
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            >
              {models[config.provider].map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Clé API
            </label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
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
          </div>

          {/* Endpoint */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Endpoint API
            </label>
            <input
              type="url"
              value={config.endpoint}
              onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
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
              Température: {config.temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.temperature}
              onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
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
              value={config.maxTokens}
              onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
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
            Sauvegarder la configuration
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
          Tester l'assistant
        </h2>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
            Message de test
          </label>
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Posez une question sur la migration..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

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
          {isTesting ? 'Test en cours...' : 'Envoyer le test'}
        </button>

        {testResponse && (
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            background: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
              RÉPONSE DE L'ASSISTANT
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
