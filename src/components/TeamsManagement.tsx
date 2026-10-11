import { teamMembers, TeamMember } from '../data/releases';

export default function TeamsManagement() {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'release_manager': return { bg: '#fef3c7', text: '#92400e', icon: '👑' };
      case 'dev_lead': return { bg: '#dbeafe', text: '#1e40af', icon: '💻' };
      case 'qa_lead': return { bg: '#d1fae5', text: '#065f46', icon: '🧪' };
      case 'ops_lead': return { bg: '#ede9fe', text: '#6d28d9', icon: '⚙️' };
      case 'developer': return { bg: '#e0e7ff', text: '#3730a3', icon: '👨‍💻' };
      case 'qa': return { bg: '#ccfbf1', text: '#115e59', icon: '🔍' };
      case 'ops': return { bg: '#fce7f3', text: '#9d174d', icon: '🔧' };
      default: return { bg: '#f3f4f6', text: '#6b7280', icon: '👤' };
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'release_manager': return 'Release Manager';
      case 'dev_lead': return 'Tech Lead';
      case 'qa_lead': return 'QA Lead';
      case 'ops_lead': return 'Ops Lead';
      case 'developer': return 'Développeur';
      case 'qa': return 'QA Engineer';
      case 'ops': return 'Ops Engineer';
      default: return role;
    }
  };

  const teams = Array.from(new Set(teamMembers.map(m => m.team)));

  return (
    <div style={{ padding: '24px', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
          Gestion des Équipes
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Membres des équipes, rôles et responsabilités
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-users" style={{ color: '#3b82f6' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{teamMembers.length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Membres totaux</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-building" style={{ color: '#10b981' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{teams.length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Équipes</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-phone-alt" style={{ color: '#f59e0b' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{teamMembers.filter(m => m.onCall).length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>En on-call</p>
            </div>
          </div>
        </div>
      </div>

      {/* On-Call Team */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
          <i className="fas fa-phone-alt" style={{ color: '#10b981', marginRight: '8px' }}></i>
          Équipe On-Call (24/7)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {teamMembers.filter(m => m.onCall).map(member => {
            const roleColor = getRoleColor(member.role);
            return (
              <div key={member.id} style={{ padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '2px solid #bbf7d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '20px' }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{member.name}</h3>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>{member.team}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ padding: '4px 12px', background: '#10b981', color: 'white', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                      ● On-Call
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', background: roleColor.bg, color: roleColor.text }}>
                    {roleColor.icon} {getRoleLabel(member.role)}
                  </span>
                  <a href={`mailto:${member.email}`} style={{ fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}>
                    <i className="fas fa-envelope" style={{ marginRight: '4px' }}></i>
                    Contacter
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teams by Department */}
      {teams.map(team => {
        const teamMembersList = teamMembers.filter(m => m.team === team);
        return (
          <div key={team} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
              <i className="fas fa-users" style={{ color: '#8b5cf6', marginRight: '8px' }}></i>
              Équipe {team}
              <span style={{ marginLeft: '12px', padding: '4px 12px', background: '#ede9fe', color: '#6d28d9', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                {teamMembersList.length} membres
              </span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {teamMembersList.map(member => {
                const roleColor = getRoleColor(member.role);
                return (
                  <div key={member.id} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#374151' }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{member.name}</h3>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>{member.email}</p>
                      </div>
                      {member.onCall && (
                        <span style={{ padding: '2px 8px', background: '#10b981', color: 'white', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }}>
                          On-Call
                        </span>
                      )}
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', background: roleColor.bg, color: roleColor.text }}>
                      {roleColor.icon} {getRoleLabel(member.role)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
