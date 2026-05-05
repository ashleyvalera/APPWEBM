import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedications } from '../context/MedicationsContext';
import AddMedicationModal from '../components/AddMedicationModal';

const History = ({ onLogout }) => {
  const navigate = useNavigate();
  const { 
    medications, 
    isModalOpen, 
    openModal, 
    closeModal, 
    addMedication,
  } = useMedications();

  const colors = {
    primary: '#1A5C3A',
    accent: '#2D8E6E',
    mint: '#D1F0E0',
    purple: '#6C63FF',
    background: '#F9FAFB',
  };

  const [viewMode, setViewMode] = useState('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsToast, setShowSettingsToast] = useState(false);
  const [resolvingLog, setResolvingLog] = useState(null);
  const [resolveTime, setResolveTime] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [filterRange, setFilterRange] = useState('Last 30 Days');
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);
  const filterRef = useRef(null);

  const notifications = [
    { id: 1, text: 'Recordatorio: Lisinopril a las 8:00 AM', time: 'Hoy' },
    { id: 2, text: 'Tu adherencia está al 75% esta semana', time: 'Ayer' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logs = [
    {
      date: 'Today, May 26',
      dateKey: 'today',
      doses: [
        { id: 1, name: 'Lisinopril', category: 'Presión Arterial', dosage: '10mg', status: 'taken', scheduledAt: '08:00 AM', loggedAt: '07:58 AM', iconColor: '#D1F0E0' },
        { id: 2, name: 'Vitamina D3', category: 'Suplemento', dosage: '2000 IU', status: 'taken', scheduledAt: '08:00 AM', loggedAt: '08:05 AM', iconColor: '#D1F0E0' },
      ]
    },
    {
      date: 'Yesterday, May 25',
      dateKey: 'yesterday',
      doses: [
        { id: 3, name: 'Atorvastatin', category: 'Colesterol', dosage: '40mg', status: 'missed', scheduledAt: '09:00 PM', loggedAt: null, iconColor: '#FEF3C7' },
        { id: 4, name: 'Metformina', category: 'Diabetes', dosage: '500mg', status: 'taken', scheduledAt: '07:00 PM', loggedAt: '07:12 PM', iconColor: '#D1F0E0' },
      ]
    },
  ];

  const filteredLogs = logs.map(group => ({
    ...group,
    doses: group.doses.filter(dose => 
      dose.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dose.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.doses.length > 0);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleResolveLog = (logId) => {
    if (resolveTime) {
      setResolvingLog(null);
      setResolveTime('');
      showToast('Dosis registrada correctamente');
    }
  };

  const handleDownloadPDF = () => {
    showToast('Generando PDF...');
  };

  const handleShare = () => {
    showToast('Enlace copiado al portapapeles');
  };

  const handleSettings = () => {
    setShowSettingsToast(true);
    setTimeout(() => setShowSettingsToast(false), 3000);
    setShowUserMenu(false);
  };

  const handleUserLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const getToday = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const Sidebar = () => (
    <aside className="w-[260px] bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.mint }}>
            <svg className="w-5 h-5" fill={colors.primary} viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/>
            </svg>
          </div>
          <span className="font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif', color: colors.primary }}>VitalityGuide</span>
        </div>
        <p className="text-sm text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>Vitalidad Guiada</p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Panel
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/medications')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Medicamentos
            </button>
          </li>
          <li>
            <button 
              onClick={() => {}}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative w-full"
              style={{ backgroundColor: `${colors.purple}15`, color: colors.primary, borderLeft: `3px solid ${colors.purple}` }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historial
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-4 space-y-3">
        <button 
          onClick={() => openModal()}
          className="w-full py-3 px-4 rounded-full text-white text-sm font-medium transition-all hover:opacity-90 shadow-md"
          style={{ backgroundColor: colors.primary }}
        >
          + Agregar Medicamento
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Centro de Ayuda
        </button>
        
        <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer w-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );

  const Header = () => (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
        Historial de Medicamentos
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors relative"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">Notificaciones</p>
              </div>
              {notifications.map(notif => (
                <div key={notif.id} className="p-3 hover:bg-gray-50 border-b border-gray-50">
                  <p className="text-sm text-gray-700">{notif.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="p-3 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.804 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.804 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.804-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.804-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
              <button onClick={() => setShowUserMenu(false)} className="w-full p-3 text-left hover:bg-gray-50 border-b">
                <p className="text-sm text-gray-700">Mi Perfil</p>
              </button>
              <button onClick={handleSettings} className="w-full p-3 text-left hover:bg-gray-50 border-b">
                <p className="text-sm text-gray-700">Configuración</p>
              </button>
              <button onClick={handleUserLogout} className="w-full p-3 text-left hover:bg-gray-50">
                <p className="text-sm text-red-600">Cerrar Sesión</p>
              </button>
            </div>
          )}
        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
          JD
        </div>
      </div>
    </header>
  );

  const StatsCards = () => (
    <div className="flex gap-6 mb-8">
      <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-2">Adherencia 30 Días</p>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke={colors.primary} strokeWidth="3" strokeDasharray="93 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">98.2%</p>
            <p className="text-sm text-green-600">+2.4% del mes pasado</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-2">Dosis Tomadas (Mayo)</p>
        <p className="text-3xl font-bold text-gray-900 mb-3">124 / 126</p>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: '98%', backgroundColor: colors.primary }}></div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl p-6 shadow-md" style={{ backgroundColor: colors.primary }}>
        <p className="text-sm mb-2" style={{ color: colors.mint }}>Racha Actual</p>
        <p className="text-3xl font-bold text-white">14 Días</p>
        <p className="text-sm" style={{ color: colors.mint }}>Cumplimiento perfecto desde May 12</p>
      </div>
    </div>
  );

  const ViewToggle = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('calendar')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === 'calendar' ? 'text-white' : 'bg-gray-100 text-gray-600'
          }`}
          style={viewMode === 'calendar' ? { backgroundColor: colors.primary } : {}}
        >
          Vista de Calendario
        </button>
        <button
          onClick={() => setViewMode('timeline')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === 'timeline' ? 'text-white' : 'bg-gray-100 text-gray-600'
          }`}
          style={viewMode === 'timeline' ? { backgroundColor: colors.primary } : {}}
        >
          Lista de Tiempo
        </button>
      </div>

      <div className="flex items-center gap-3 relative" ref={filterRef}>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 hover:bg-gray-200"
        >
          {filterRange}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m0 18h.01M5 7h.01M5 11h.01M5 15h.01M5 19h.01M19 7v.01M19 11v.01M19 15v.01M19 19v.01" />
          </svg>
        </button>
        {showFilter && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
            {['Últimos 7 Días', 'Últimos 30 Días', 'Últimos 3 Meses', 'Rango Personalizado'].map(opt => (
              <button 
                key={opt}
                onClick={() => { setFilterRange(opt); setShowFilter(false); }}
                className="w-full p-3 text-left text-sm hover:bg-gray-50 border-b last:border-0"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const LogEntry = ({ log, isTimeline }) => (
    <div className={isTimeline ? 'space-y-4' : ''}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-gray-900">{log.date}</p>
        <p className="text-xs text-gray-400 uppercase">{log.doses.length} DOSIS PROGRAMADAS</p>
      </div>
      
      <div className={`${isTimeline ? 'space-y-3' : 'grid grid-cols-2 gap-4'}`}>
        {log.doses.map(dose => (
          <div key={dose.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: dose.iconColor }}>
                  <svg className="w-5 h-5" fill={colors.primary} viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{dose.name}</p>
                  <p className="text-xs text-gray-500">{dose.category} • {dose.dosage}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                dose.status === 'taken' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {dose.status === 'taken' ? 'TOMADO' : 'PERDIDO'}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div>
                <span className="text-gray-400">PROGRAMADO A LAS</span>
                <p className="font-medium text-gray-700">{dose.scheduledAt}</p>
              </div>
              {dose.status === 'taken' ? (
                <div>
                  <span className="text-gray-400">REGISTRADO A LAS</span>
                  <p className="font-medium text-gray-700">{dose.loggedAt}</p>
                </div>
              ) : (
                <button 
                  onClick={() => setResolvingLog(dose.id)}
                  className="text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  Resolver Registro
                </button>
              )}
            </div>

            {resolvingLog === dose.id && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Hora (ej. 09:30 PM)"
                  value={resolveTime}
                  onChange={(e) => setResolveTime(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <button
                  onClick={() => handleResolveLog(dose.id)}
                  className="px-3 py-2 text-sm font-medium text-white rounded-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const SearchBar = () => (
    <div className="relative mb-6">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar registros..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': colors.primary }}
      />
    </div>
  );

  const DownloadBanner = () => (
    <div className="mt-10 rounded-2xl p-6 flex items-center gap-6" style={{ backgroundColor: colors.mint }}>
      <div className="w-20 h-20 rounded-xl flex-shrink-0" style={{ backgroundColor: colors.primary }}>
        <div className="w-full h-full grid grid-cols-2 gap-2 p-3">
          <div className="rounded-full bg-white/30"></div>
          <div className="rounded-full bg-white/20"></div>
          <div className="rounded-full bg-white/20"></div>
          <div className="rounded-full bg-white/10"></div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-900 mb-1">Descargar Reporte de Historial</p>
        <p className="text-sm text-gray-600 mb-4">Genera un PDF o CSV completo de tu adherencia para compartir con tu médico.</p>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ backgroundColor: colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3v1m10 0V4m0 0h5M9 20h6M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Descargar PDF
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a9 9 0 10-12.404 0 9 9 0 0012.404 0z" />
            </svg>
            Compartir con Médico
          </button>
        </div>
      </div>
    </div>
  );

  const Toast = () => toastMessage ? (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
      {toastMessage}
    </div>
  ) : null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background }}>
      <Sidebar />
      
      <main className="flex-1 ml-[260px] p-12 overflow-y-auto min-h-screen">
        <Header />
        <SearchBar />
        <StatsCards />
        <ViewToggle />
        
        {filteredLogs.map(group => (
          <LogEntry key={group.dateKey} log={group} isTimeline={viewMode === 'timeline'} />
        ))}
        
        <DownloadBanner />
      </main>
      
      <Toast />
      
      <AddMedicationModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onSave={addMedication}
      />
    </div>
  );
};

export default History;