import { useState } from 'react';
import { applications } from '../data/applications';

interface MigrationEvent {
  id: string;
  appName: string;
  phase: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed' | 'blocked';
  dependencies: string[];
}

export default function MigrationCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Janvier 2026
  const [view, setView] = useState<'month' | 'timeline'>('month');

  // Données simulées d'événements de migration
  const events: MigrationEvent[] = [
    {
      id: '1',
      appName: 'api-gateway',
      phase: 'DEV → STAGING',
      startDate: '2026-01-05',
      endDate: '2026-01-15',
      status: 'in_progress',
      dependencies: []
    },
    {
      id: '2',
      appName: 'user-service',
      phase: 'STAGING → PROD',
      startDate: '2026-01-10',
      endDate: '2026-01-20',
      status: 'completed',
      dependencies: []
    },
    {
      id: '3',
      appName: 'payment-processor',
      phase: 'Analyse',
      startDate: '2026-01-08',
      endDate: '2026-01-25',
      status: 'blocked',
      dependencies: ['1']
    },
    {
      id: '4',
      appName: 'notification-service',
      phase: 'DEV',
      startDate: '2026-01-12',
      endDate: '2026-01-22',
      status: 'in_progress',
      dependencies: []
    },
    {
      id: '5',
      appName: 'monitoring-agent',
      phase: 'PREPROD → PROD',
      startDate: '2026-01-18',
      endDate: '2026-01-30',
      status: 'planned',
      dependencies: ['4']
    }
  ];

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
    return events.filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#3b82f6';
      case 'blocked': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'blocked': return '🔴';
      default: return '📅';
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }}></i>
          Calendrier de Migration
        </h1>
        <p style={{ color: '#6b7280', fontSize: 'clamp(14px, 2vw, 16px)' }}>
          Planifiez et visualisez les migrations avec leurs dépendances
        </p>
      </div>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setView('month')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: view === 'month' ? '#4f46e5' : '#f3f4f6',
            color: view === 'month' ? 'white' : '#374151',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px'
          }}
        >
          <i className="fas fa-calendar" style={{ marginRight: '8px' }}></i>
          Vue Mensuelle
        </button>
        <button
          onClick={() => setView('timeline')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: view === 'timeline' ? '#4f46e5' : '#f3f4f6',
            color: view === 'timeline' ? 'white' : '#374151',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px'
          }}
        >
          <i className="fas fa-timeline" style={{ marginRight: '8px' }}></i>
          Timeline
        </button>
      </div>

      {view === 'month' ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          {/* Month Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <button
              onClick={previousMonth}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontWeight: 500
              }}
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
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase'
              }}>
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} style={{ minHeight: '100px' }}></div>
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              
              return (
                <div
                  key={day}
                  style={{
                    minHeight: '100px',
                    padding: '8px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: dayEvents.length > 0 ? '#f9fafb' : 'white'
                  }}
                >
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {day}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          background: getStatusColor(event.status) + '20',
                          color: getStatusColor(event.status),
                          borderLeft: `3px solid ${getStatusColor(event.status)}`,
                          cursor: 'pointer'
                        }}
                        title={`${event.appName} - ${event.phase}`}
                      >
                        {getStatusIcon(event.status)} {event.appName}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center' }}>
                        +{dayEvents.length - 3} autre(s)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Timeline des migrations
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {events.map(event => {
              const start = new Date(event.startDate);
              const end = new Date(event.endDate);
              const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={event.id} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                        {event.appName}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#6b7280' }}>{event.phase}</p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: getStatusColor(event.status) + '20',
                      color: getStatusColor(event.status)
                    }}>
                      {getStatusIcon(event.status)} {event.status === 'completed' ? 'Terminé' : event.status === 'in_progress' ? 'En cours' : event.status === 'blocked' ? 'Bloqué' : 'Planifié'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                    <span><i className="fas fa-calendar" style={{ marginRight: '4px' }}></i>{start.toLocaleDateString('fr-FR')} → {end.toLocaleDateString('fr-FR')}</span>
                    <span><i className="fas fa-clock" style={{ marginRight: '4px' }}></i>{duration} jours</span>
                  </div>

                  {event.dependencies.length > 0 && (
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      <i className="fas fa-link" style={{ marginRight: '4px' }}></i>
                      Dépend de : {event.dependencies.map(depId => {
                        const dep = events.find(e => e.id === depId);
                        return dep ? dep.appName : depId;
                      }).join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
          Légende
        </h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>✅</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>Terminé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔄</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>En cours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔴</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>Bloqué</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📅</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>Planifié</span>
          </div>
        </div>
      </div>
    </div>
  );
}
