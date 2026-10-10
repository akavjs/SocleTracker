import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  team: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  { id: '1', name: 'Jean Dupont', email: 'jean.dupont@company.com', role: 'admin', team: 'Platform', lastLogin: '2026-01-15 14:30', status: 'active' },
  { id: '2', name: 'Marie Martin', email: 'marie.martin@company.com', role: 'user', team: 'Identity', lastLogin: '2026-01-15 10:15', status: 'active' },
  { id: '3', name: 'Pierre Bernard', email: 'pierre.bernard@company.com', role: 'user', team: 'Payments', lastLogin: '2026-01-14 16:45', status: 'active' },
  { id: '4', name: 'Sophie Dubois', email: 'sophie.dubois@company.com', role: 'user', team: 'Communication', lastLogin: '2026-01-13 09:20', status: 'inactive' },
  { id: '5', name: 'Luc Moreau', email: 'luc.moreau@company.com', role: 'admin', team: 'Platform', lastLogin: '2026-01-15 11:00', status: 'active' },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDeleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const adminCount = users.filter(u => u.role === 'admin').length;
  const activeCount = users.filter(u => u.status === 'active').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Dashboard Administrateur
        </h1>
        <p style={{ color: '#6b7280' }}>
          Gérez les utilisateurs et les permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#eef2ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-users" style={{ color: '#4f46e5', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{users.length}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Utilisateurs totaux</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-user-shield" style={{ color: '#f59e0b', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{adminCount}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Administrateurs</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-user-check" style={{ color: '#10b981', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{activeCount}</p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Actifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
            Liste des utilisateurs
          </h2>
          <button
            onClick={() => setShowAddUser(true)}
            style={{
              padding: '10px 20px',
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
            <i className="fas fa-plus"></i>
            Ajouter un utilisateur
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Utilisateur</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Rôle</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Équipe</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Statut</th>
              <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Dernière connexion</th>
              <th style={{ padding: '12px 24px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-user" style={{ color: '#4f46e5' }}></i>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, color: '#111827' }}>{user.name}</p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                    color: user.role === 'admin' ? '#92400e' : '#1e40af'
                  }}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: '#374151' }}>{user.team}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: user.status === 'active' ? '#d1fae5' : '#fee2e2',
                    color: user.status === 'active' ? '#065f46' : '#991b1b'
                  }}>
                    {user.status === 'active' ? '● Actif' : '○ Inactif'}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', color: '#6b7280', fontSize: '14px' }}>{user.lastLogin}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setEditingUser(user)}
                      style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#4f46e5' }}
                      title="Modifier"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: user.status === 'active' ? '#f59e0b' : '#10b981' }}
                      title={user.status === 'active' ? 'Désactiver' : 'Activer'}
                    >
                      <i className={`fas ${user.status === 'active' ? 'fa-user-slash' : 'fa-user-check'}`}></i>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                      title="Supprimer"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
