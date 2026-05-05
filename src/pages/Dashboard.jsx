import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedications } from '../context/MedicationsContext';
import AddMedicationModal from '../components/AddMedicationModal';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const { 
    medications, 
    isModalOpen, 
    openModal, 
    closeModal, 
    addMedication, 
    markAsTaken,
    toggleDose,
  } = useMedications();

  const colors = {
    primary: '#1A5C3A',
    accent: '#2D8E6E',
    mint: '#D1F0E0',
    purple: '#6C63FF',
    background: '#F9FAFB',
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsToast, setShowSettingsToast] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const notifications = [
    { id: 1, text: 'Recordatorio: Lisinopril a las 8:00 AM', time: 'Hoy' },
    { id: 2, text: 'Tu adherence está al 75% esta semana', time: 'Ayer' },
    { id: 3, text: 'Nuevo medicamento agregado', time: 'Ayer' },
  ];

  const upcomingReminders = medications.filter(m => m.status === 'Active' && !m.taken).slice(0, 3);
  const takenCount = medications.filter(m => m.taken).length;
  const totalCount = medications.length;
  const adherencePercent = Math.round((takenCount / totalCount) * 100);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewSchedule = () => {
    navigate('/medications');
  };

  const handleTakeNow = (id) => {
    markAsTaken(id);
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

  const progressRingStyle = {
    transform: 'rotate(-90deg)',
    filter: 'drop-shadow(0px 2px 4px rgba(26, 92, 58, 0.2))',
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative w-full"
              style={{ backgroundColor: `${colors.purple}15`, color: colors.primary, borderLeft: `3px solid ${colors.purple}` }}
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
            <button onClick={() => navigate('/history')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all w-full">
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
    <header className="flex items-center justify-between mb-12 relative">
      <div>
        <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Hola, Jordan</h1>
        <p className="text-gray-500 text-lg mt-2">Tu camino de salud se ve genial hoy.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors relative"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">Notificaciones</p>
              </div>
              {notifications.map(notif => (
                <div key={notif.id} className="p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-700">{notif.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.804 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.804 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.804-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.804-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <button onClick={() => setShowUserMenu(false)} className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100">
                <p className="text-sm text-gray-700">Mi Perfil</p>
              </button>
              <button onClick={handleSettings} className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100">
                <p className="text-sm text-gray-700">Configuración</p>
              </button>
              <button onClick={handleUserLogout} className="w-full p-3 text-left hover:bg-gray-50">
                <p className="text-sm text-red-600">Cerrar Sesión</p>
              </button>
            </div>
          )}
        </div>

        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium text-lg shadow-md cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );

  const ComplianceCard = () => (
    <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex flex-col items-center" style={{ minWidth: '400px', flex: '1' }}>
      <h2 className="text-2xl font-semibold text-gray-900 w-full mb-10" style={{ fontFamily: 'Manrope, sans-serif' }}>Cumplimiento Diario</h2>
      
      <div className="relative w-56 h-56 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke={colors.primary} 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={`${adherencePercent * 2.64} 264`}
            style={progressRingStyle}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{ color: colors.primary }}>{adherencePercent}%</span>
          <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">ADHERENCIA</span>
        </div>
      </div>
      
      <p className="text-lg text-gray-500 text-center mt-4">
        {takenCount} de {totalCount} medicamentos tomados hoy. ¡Vas muy bien!
      </p>
    </div>
  );

  const RemindersCard = () => (
    <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex-1">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Próximos Recordatorios</h2>
        <button onClick={handleViewSchedule} className="text-lg hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>
          Ver Todo el Horario
        </button>
      </div>
      
      <div className="space-y-6">
        {upcomingReminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center gap-6 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="text-left">
              <p className="text-2xl font-semibold text-gray-900">{reminder.schedule}</p>
              <p className="text-sm text-gray-400">HOY</p>
            </div>
            
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: reminder.iconColor }}></div>
            
            <div className="flex-1">
              <p className="text-xl font-medium text-gray-900">{reminder.name}</p>
              <p className="text-base text-gray-500">{reminder.dosage} • {reminder.frequency}</p>
            </div>
            
            <button 
              onClick={() => handleTakeNow(reminder.id)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                reminder.taken 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'text-white'
              }`}
              style={!reminder.taken ? { backgroundColor: colors.primary } : {}}
              disabled={reminder.taken}
            >
              {reminder.taken ? '✓ Tomado' : 'Tomar Ahora'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const TodaysLog = () => (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Registro de Hoy</h2>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {takenCount} Tomados
          </span>
          <span className="flex items-center gap-2 text-sm text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {totalCount - takenCount} Pendientes
          </span>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {medications.slice(0, 6).map((med) => (
          <div key={med.id} className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                med.taken 
                  ? 'text-emerald-700' 
                  : 'text-purple-700'
              }`}
                style={{ backgroundColor: med.taken ? colors.mint : '#E9D5FF' }}
              >
                {med.taken ? `Tomado a las ${med.takenAt}` : 'Pendiente'}
              </span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{med.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{med.dosage} • {med.category}</p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">{med.schedule}</span>
              <button 
                onClick={() => toggleDose(med.id)}
                className={`w-11 h-6 rounded-full transition-all duration-300 ${
                  med.taken ? '' : 'bg-gray-200'
                }`}
                style={med.taken ? { backgroundColor: colors.primary } : {}}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    med.taken ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>
            
            {!med.taken && (
              <p className="text-xs text-orange-600 mt-3">Próximo: {med.schedule}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const FAB = () => (
    <button 
      onClick={() => openModal()}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      style={{ backgroundColor: colors.primary }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );

  const Footer = () => (
    <footer className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© 2024 VitalityGuide Health. Gestión de Salud Accesible.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:opacity-80 transition-opacity">Política de Privacidad</a>
          <span>•</span>
          <a href="#" className="hover:opacity-80 transition-opacity">Términos de Servicio</a>
          <span>•</span>
          <a href="#" className="hover:opacity-80 transition-opacity">Accesibilidad</a>
        </div>
      </div>
    </footer>
  );

  const Toast = () => showSettingsToast ? (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
      <p>Próximamente</p>
    </div>
  ) : null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background }}>
      <Sidebar />
      
      <main className="flex-1 ml-[260px] p-12 overflow-y-auto min-h-screen">
        <div className="w-full">
          <Header />
          
          <div className="flex gap-6">
            <ComplianceCard />
            <RemindersCard />
          </div>
          
          <TodaysLog />
          <Footer />
        </div>
      </main>
      
      <FAB />
      <Toast />
      
      <AddMedicationModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onSave={addMedication}
      />
    </div>
  );
};

export default Dashboard;