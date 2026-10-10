import { useState } from 'react';
import { applications, Application } from '../data/applications';

export default function ImportExport() {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [importFormat, setImportFormat] = useState<'json' | 'csv'>('json');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleExport = () => {
    let data: string;
    let filename: string;
    let mimeType: string;

    if (exportFormat === 'json') {
      data = JSON.stringify(applications, null, 2);
      filename = `socletracker-applications-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    } else {
      // CSV export
      const headers = ['ID', 'Nom', 'Description', 'Équipe', 'Source', 'Cible', 'Statut', 'Progression', 'Criticité', 'Échéance'];
      const rows = applications.map(app => [
        app.id,
        app.name,
        app.description,
        app.team,
        app.sourceSocle,
        app.targetSocle,
        app.migrationStatus,
        app.migrationProgress,
        app.criticality,
        app.estimatedCompletion
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      data = csvContent;
      filename = `socletracker-applications-${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv';
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setImportStatus({ type: 'success', message: `Export ${exportFormat.toUpperCase()} réussi !` });
    setTimeout(() => setImportStatus({ type: null, message: '' }), 3000);
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    // Map CSV headers to field names
    const headerMap: Record<string, string> = {
      'id': 'id',
      'nom': 'name',
      'name': 'name',
      'description': 'description',
      'équipe': 'team',
      'team': 'team',
      'source': 'sourceSocle',
      'sourcesocle': 'sourceSocle',
      'cible': 'targetSocle',
      'targetsocle': 'targetSocle',
      'statut': 'migrationStatus',
      'migrationstatus': 'migrationStatus',
      'progression': 'migrationProgress',
      'migrationprogress': 'migrationProgress',
      'criticité': 'criticality',
      'criticality': 'criticality',
      'échéance': 'estimatedCompletion',
      'estimatedcompletion': 'estimatedCompletion'
    };

    // Parse data rows
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const obj: any = {};
      
      headers.forEach((header, index) => {
        const fieldName = headerMap[header.toLowerCase()];
        if (fieldName && values[index] !== undefined) {
          // Convert numeric fields
          if (fieldName === 'migrationProgress') {
            obj[fieldName] = parseInt(values[index]) || 0;
          } else {
            obj[fieldName] = values[index];
          }
        }
      });
      
      result.push(obj);
    }
    
    return result;
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let imported: any[];
        
        if (importFormat === 'json') {
          imported = JSON.parse(content);
          if (!Array.isArray(imported)) {
            throw new Error('Format JSON invalide : attendu un tableau d\'applications');
          }
        } else {
          // CSV format
          imported = parseCSV(content);
          if (imported.length === 0) {
            throw new Error('Fichier CSV vide ou format invalide');
          }
        }

        // Validate structure
        const requiredFields = ['id', 'name', 'migrationStatus', 'migrationProgress'];
        const validApps = imported.filter((app: any) => 
          requiredFields.every(field => field in app)
        );

        if (validApps.length === 0) {
          throw new Error('Aucune application valide trouvée dans le fichier');
        }

        setImportStatus({ 
          type: 'success', 
          message: `${validApps.length} application(s) importée(s) avec succès depuis ${importFormat.toUpperCase()} !` 
        });
        
        // In a real app, you would update the state/database here
        console.log('Imported applications:', validApps);
        
      } catch (error) {
        setImportStatus({ 
          type: 'error', 
          message: `Erreur d'import : ${error instanceof Error ? error.message : 'Format invalide'}` 
        });
      }
    };

    reader.readAsText(file);
    setTimeout(() => setImportStatus({ type: null, message: '' }), 5000);
    
    // Reset input
    event.target.value = '';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
        Import / Export des applications
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>
        Gérez vos applications en important ou exportant des données
      </p>

      {/* Status Message */}
      {importStatus.type && (
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          background: importStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: importStatus.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${importStatus.type === 'success' ? '#a7f3d0' : '#fecaca'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className={`fas ${importStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span>{importStatus.message}</span>
          </div>
        </div>
      )}

      {/* Export Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-download" style={{ color: '#4f46e5' }}></i>
          Exporter les applications
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
          Exportez toutes vos applications au format JSON ou CSV
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setExportFormat('json')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: exportFormat === 'json' ? '#4f46e5' : '#f3f4f6',
              color: exportFormat === 'json' ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            JSON
          </button>
          <button
            onClick={() => setExportFormat('csv')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: exportFormat === 'csv' ? '#4f46e5' : '#f3f4f6',
              color: exportFormat === 'csv' ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            CSV
          </button>
        </div>

        <button
          onClick={handleExport}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#4f46e5',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-file-export"></i>
          Exporter {applications.length} applications
        </button>
      </div>

      {/* Import Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-upload" style={{ color: '#10b981' }}></i>
          Importer des applications
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
          Importez des applications depuis un fichier JSON ou CSV
        </p>

        {/* Format Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
            Format du fichier
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setImportFormat('json')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: importFormat === 'json' ? '#10b981' : '#f3f4f6',
                color: importFormat === 'json' ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              JSON
            </button>
            <button
              onClick={() => setImportFormat('csv')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: importFormat === 'csv' ? '#10b981' : '#f3f4f6',
                color: importFormat === 'csv' ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              CSV
            </button>
          </div>
        </div>

        {/* CSV Format Info */}
        {importFormat === 'csv' && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#1e40af'
          }}>
            <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
            <strong>Format CSV attendu :</strong> Le fichier doit contenir les colonnes suivantes :
            <br />
            <code style={{ fontSize: '12px', background: '#dbeafe', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>
              ID, Nom, Description, Équipe, Source, Cible, Statut, Progression, Criticité, Échéance
            </code>
          </div>
        )}

        <div style={{
          border: '2px dashed #d1d5db',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          background: '#f9fafb'
        }}>
          <i className="fas fa-cloud-upload-alt" style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }}></i>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Glissez-déposez un fichier {importFormat.toUpperCase()} ici ou
          </p>
          <label style={{
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '8px',
            background: '#10b981',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px'
          }}>
            <i className="fas fa-file-import" style={{ marginRight: '8px' }}></i>
            Choisir un fichier
            <input
              type="file"
              accept={importFormat === 'json' ? '.json' : '.csv'}
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '12px' }}>
            Format accepté : {importFormat.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
