import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedications } from '../context/MedicationsContext';
import AddMedicationModal from '../components/AddMedicationModal';

const Medications = ({ onLogout }) => {
  const navigate = useNavigate();
  const { 
    medications, 
    isModalOpen, 
    openModal, 
    closeModal, 
    addMedication,
    toggleMedicationStatus,
  } = useMedications();

  const colors = {
    primary: '#1A5C3A',
    accent: '#2D8E6E',
    mint: '#D1F0E0',
    purple: '#6C63FF',
    background: '#F9FAFB',
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsToast, setShowSettingsToast] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.dosage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRecipe = (med) => {
    openModal(med);
  };

  const handleToggleStatus = (id) => {
    toggleMedicationStatus(id);
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
              onClick={() => {}}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative w-full"
              style={{ backgroundColor: `${colors.purple}15`, color: colors.primary, borderLeft: `3px solid ${colors.purple}` }}
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
    <header className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Gestión de Medicamentos
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          Vista general y detalles de todas las recetas activas.
        </p>
      </div>
      <div className="flex items-center gap-4">
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

  const SearchBar = () => (
    <div className="relative mb-8">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar medicamentos, dosis o condición..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
        style={{ '--tw-ring-color': colors.primary }}
      />
    </div>
  );

  const MedicationCard = ({ med }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: med.iconColor }}
        >
          <svg className="w-6 h-6" fill={colors.primary} viewBox="0 0 24 24">
            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{med.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{med.category}</p>
            </div>
            <button 
              onClick={() => handleToggleStatus(med.id)}
              className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-all ${
                med.status === 'Active' 
                  ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                  : 'text-orange-700 bg-orange-50 hover:bg-orange-100'
              }`}
            >
              {med.status === 'Active' ? 'Activo' : 'Pausado'}
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600">
              <strong>{med.dosage}</strong>
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">{med.schedule}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">{med.frequency}</span>
          </div>
          
          <button 
            onClick={() => handleAddRecipe(med)}
            className="text-sm mt-4 hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: colors.primary }}
          >
            + Agregar Receta
          </button>
        </div>
      </div>
    </div>
  );

  const FAB = () => (
    <button 
      onClick={() => openModal()}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
      style={{ backgroundColor: colors.primary }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
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
        <Header />
        <SearchBar />
        
        <div className="space-y-4">
          {filteredMeds.map(med => (
            <MedicationCard key={med.id} med={med} />
          ))}
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

export default Medications;