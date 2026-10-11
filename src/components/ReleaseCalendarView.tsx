import { useState } from 'react';
import { releaseCalendar, ReleaseCalendar } from '../data/releases';

export default function ReleaseCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Janvier 2026
  const [selectedEvent, setSelectedEvent] = useState<ReleaseCalendar | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return releaseCalendar.filter(event => event.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'release': return { bg: '#dbeafe', text: '#1e40af', icon: '🚀' };
      case 'hotfix': return { bg: '#fee2e2', text: '#991b1b', icon: '🔥' };
      case 'maintenance': return { bg: '#fef3c7', text: '#92400e', icon: '🔧' };
      case 'rollback': return { bg: '#f3f4f6', text: '#6b7280', icon: '↩️' };
      default: return { bg: '#f3f4f6', text: '#6b7280', icon: '📅' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#3b82f6';
      case 'scheduled': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ padding: '24px', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }}></i>
          Calendrier des Releases
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Planification et suivi de tous les déploiements
        </p>
      </div>

      {/* Calendar */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
        {/* Month Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button
            onClick={previousMonth}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {/* Day Headers */}
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} style={{
              padding: '12px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              {day}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} style={{ minHeight: '120px' }}></div>
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            
            return (
              <div
                key={day}
                style={{
                  minHeight: '120px',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: dayEvents.length > 0 ? '#f9fafb' : 'white'
                }}
              >
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {day}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {dayEvents.map(event => {
                    const typeColor = getTypeColor(event.type);
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          background: typeColor.bg,
                          color: typeColor.text,
                          cursor: 'pointer',
                          borderLeft: `3px solid ${getStatusColor(event.status)}`
                        }}
                        title={event.title}
                      >
                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                          {typeColor.icon} {event.title}
                        </div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>
                          {event.environment.toUpperCase()} • {event.duration}min
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                  {selectedEvent.title}
                </h2>
                <p style={{ color: '#6b7280' }}>{selectedEvent.date}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{ padding: '8px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Environnement</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{selectedEvent.environment.toUpperCase()}</p>
              </div>
              <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Type</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                  {getTypeColor(selectedEvent.type).icon} {selectedEvent.type}
                </p>
              </div>
              <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Durée estimée</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{selectedEvent.duration} minutes</p>
              </div>
              <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Statut</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: getStatusColor(selectedEvent.status) }}>
                  {selectedEvent.status}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
                Équipes impliquées
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedEvent.teams.map(team => (
                  <span key={team} style={{ padding: '6px 12px', background: '#ede9fe', color: '#6d28d9', borderRadius: '8px', fontSize: '13px', fontWeight: '500' }}>
                    {team}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', cursor: 'pointer', fontWeight: '500' }}>
                <i className="fas fa-edit" style={{ marginRight: '8px' }}></i>
                Modifier
              </button>
              <button style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500' }}>
                <i className="fas fa-bell" style={{ marginRight: '8px' }}></i>
                Notifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events List */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
          <i className="fas fa-list" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
          Événements à venir
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {releaseCalendar
            .filter(e => e.status === 'scheduled')
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(event => {
              const typeColor = getTypeColor(event.type);
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{typeColor.icon}</span>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{event.title}</h3>
                        <p style={{ fontSize: '13px', color: '#6b7280' }}>{event.date}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: event.environment === 'prod' ? '#fee2e2' : event.environment === 'preprod' ? '#fef3c7' : '#dbeafe',
                        color: event.environment === 'prod' ? '#991b1b' : event.environment === 'preprod' ? '#92400e' : '#1e40af'
                      }}>
                        {event.environment.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                    <span><i className="fas fa-clock" style={{ marginRight: '4px' }}></i>{event.duration} min</span>
                    <span><i className="fas fa-users" style={{ marginRight: '4px' }}></i>{event.teams.length} équipes</span>
                    <span><i className="fas fa-tag" style={{ marginRight: '4px' }}></i>{event.type}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
