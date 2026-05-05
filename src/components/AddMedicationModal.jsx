import { useState } from 'react';

const AddMedicationModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    type: 'Tablet',
    times: ['08:00 AM'],
    startDate: '',
    endDate: '',
    reminders: true,
  });

  const [errors, setErrors] = useState({
    name: '',
    dosage: '',
  });

  const [showAddTime, setShowAddTime] = useState(false);
  const [newTime, setNewTime] = useState('');

  const medicationTypes = ['Tablet', 'Capsule', 'Liquid', 'Injection'];
  const defaultTimes = ['08:00 AM', '12:00 PM', '08:00 PM'];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'name' || field === 'dosage') {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleTime = (time) => {
    setForm(prev => {
      const exists = prev.times.includes(time);
      return {
        ...prev,
        times: exists 
          ? prev.times.filter(t => t !== time)
          : [...prev.times, time].sort((a, b) => {
              const timeA = a.match(/(\d+):(\d+)/);
              const timeB = b.match(/(\d+):(\d+)/);
              return parseInt(timeA[1]) - parseInt(timeB[1]);
            })
      };
    });
  };

  const handleAddTime = () => {
    if (newTime && !form.times.includes(newTime)) {
      setForm(prev => ({
        ...prev,
        times: [...prev.times, newTime].sort((a, b) => {
          const timeA = a.match(/(\d+):(\d+)/);
          const timeB = b.match(/(\d+):(\d+)/);
          return parseInt(timeA[1]) - parseInt(timeB[1]);
        })
      }));
      setNewTime('');
      setShowAddTime(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      dosage: '',
      type: 'Tablet',
      times: ['08:00 AM'],
      startDate: '',
      endDate: '',
      reminders: true,
    });
    setErrors({ name: '', dosage: '' });
    setShowAddTime(false);
    setNewTime('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    const newErrors = {
      name: form.name.trim() === '' ? 'El nombre es requerido' : '',
      dosage: form.dosage.trim() === '' ? 'La dosis es requerida' : '',
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.dosage) {
      console.log('Medication saved:', form);
      onSave(form);
      resetForm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-[380px] h-full bg-white shadow-2xl rounded-l-2xl modal-slide-in overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-2xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Agregar Medicamento
            </h2>
            <p className="text-gray-500">
              Registra una nueva receta en tu horario.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Medicamento
              </label>
              <input
                type="text"
                placeholder="ej. Ibuprofen"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                style={{ '--tw-ring-color': '#1A5C3A' }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosis
                </label>
                <input
                  type="text"
                  placeholder="ej. 500mg"
                  value={form.dosage}
                  onChange={(e) => handleChange('dosage', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                    errors.dosage ? 'border-red-500' : 'border-gray-200'
                  }`}
                  style={{ '--tw-ring-color': '#1A5C3A' }}
                />
                {errors.dosage && (
                  <p className="text-red-500 text-sm mt-1">{errors.dosage}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={form.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all bg-white"
                  style={{ '--tw-ring-color': '#1A5C3A' }}
                >
                  {medicationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Horario Diario
              </label>
              <div className="flex flex-wrap gap-2">
                {defaultTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => toggleTime(time)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      form.times.includes(time)
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={form.times.includes(time) ? { backgroundColor: '#1A5C3A' } : {}}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {showAddTime ? (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="ej. 02:00 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1"
                    style={{ '--tw-ring-color': '#1A5C3A' }}
                  />
                  <button
                    onClick={handleAddTime}
                    className="px-3 py-2 text-sm font-medium"
                    style={{ color: '#1A5C3A' }}
                  >
                    Agregar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddTime(true)}
                  className="text-sm mt-3 hover:opacity-80 transition-opacity"
                  style={{ color: '#1A5C3A' }}
                >
                  + Agregar Hora
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={form.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{ '--tw-ring-color': '#1A5C3A' }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={form.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{ '--tw-ring-color': '#1A5C3A' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="#1A5C3A" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">Activar Recordatorios</p>
                  <p className="text-xs text-gray-500">Notificarme 10 minutos antes</p>
                </div>
              </div>
              <button
                onClick={() => handleChange('reminders', !form.reminders)}
                className={`w-11 h-6 rounded-full transition-all duration-300 ${
                  form.reminders ? '' : 'bg-gray-200'
                }`}
                style={form.reminders ? { backgroundColor: '#1A5C3A' } : {}}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    form.reminders ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleClose}
              className="flex-1 py-4 px-6 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Descartar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-4 px-6 rounded-xl text-white font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#1A5C3A' }}
            >
              Guardar Medicamento
            </button>
          </div>

          <div 
            className="mt-6 p-4 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: '#D1F0E0' }}
          >
            <svg className="w-10 h-10 flex-shrink-0" fill="#1A5C3A" viewBox="0 0 24 24">
              <path d="M4.22 11.396l1.602 1.602a5.716 5.716 0 003.108 1.208c.88 0 1.73-.21 2.49-.57l.44.88a5.72 5.72 0 01-3.39.96 5.72 5.72 0 01-3.83-.76l-.358.358a5.716 5.716 0 000 8.084l1.414-1.414a3.738 3.738 0 010-5.278z"/>
              <path d="M19.78 12.604l-1.602-1.602a5.716 5.716 0 00-3.108-1.208c-.88 0-1.73.21-2.49.57l-.44-.88a5.72 5.72 0 013.39-.96c.96 0 1.87.32 2.66.84l.358-.358a5.716 5.716 0 000-8.084l-1.414 1.414a3.738 3.738 0 010 5.278z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <p className="text-sm text-gray-700">
              Asegúrate de que tus dosis estén bien registradas para recibir información óptima de salud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicationModal;