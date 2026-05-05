import { createContext, useContext, useState, useCallback } from 'react';

const MedicationsContext = createContext(null);

export const useMedications = () => {
  const context = useContext(MedicationsContext);
  if (!context) {
    throw new Error('useMedications must be used within a MedicationsProvider');
  }
  return context;
};

export const MedicationsProvider = ({ children }) => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      category: 'Gestión de Presión Arterial',
      dosage: '10mg',
      schedule: '08:00 AM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: false,
      takenAt: null,
    },
    {
      id: 2,
      name: 'Metformina',
      category: 'Gestión de Diabetes',
      dosage: '500mg',
      schedule: '08:00 AM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: true,
      takenAt: '08:05 AM',
    },
    {
      id: 3,
      name: 'Atorvastatina',
      category: 'Gestión de Colesterol',
      dosage: '20mg',
      schedule: '10:00 PM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: false,
      takenAt: null,
    },
    {
      id: 4,
      name: 'Vitamina D',
      category: 'Suplemento',
      dosage: '2000 UI',
      schedule: '12:00 PM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: true,
      takenAt: '12:10 PM',
    },
    {
      id: 5,
      name: 'Aspirina',
      category: 'Alivio de Dolor',
      dosage: '81mg',
      schedule: '06:00 PM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: false,
      takenAt: null,
    },
    {
      id: 6,
      name: 'Omeprazol',
      category: 'Reductor de Ácido',
      dosage: '20mg',
      schedule: '09:00 PM',
      frequency: 'Diario',
      status: 'Paused',
      iconColor: '#FEF3C7',
      taken: false,
      takenAt: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedMed, setPreselectedMed] = useState(null);

  const openModal = useCallback((medication = null) => {
    setPreselectedMed(medication);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setPreselectedMed(null);
  }, []);

  const addMedication = useCallback((newMed) => {
    const med = {
      id: Date.now(),
      name: newMed.name,
      category: newMed.type || 'Medicamento',
      dosage: newMed.dosage,
      schedule: newMed.times ? newMed.times.join(', ') : '08:00 AM',
      frequency: 'Diario',
      status: 'Active',
      iconColor: '#D1F0E0',
      taken: false,
      takenAt: null,
    };
    setMedications(prev => [...prev, med]);
  }, []);

  const markAsTaken = useCallback((id) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: true, takenAt: time } : med
    ));
  }, []);

  const toggleMedicationStatus = useCallback((id) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { 
        ...med, 
        status: med.status === 'Active' ? 'Paused' : 'Active',
        iconColor: med.status === 'Active' ? '#FEF3C7' : '#D1F0E0'
      } : med
    ));
  }, []);

  const toggleDose = useCallback((id) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMedications(prev => prev.map(med => 
      med.id === id ? { 
        ...med, 
        taken: !med.taken,
        takenAt: !med.taken ? time : null
      } : med
    ));
  }, []);

  const value = {
    medications,
    isModalOpen,
    preselectedMed,
    openModal,
    closeModal,
    addMedication,
    markAsTaken,
    toggleMedicationStatus,
    toggleDose,
  };

  return (
    <MedicationsContext.Provider value={value}>
      {children}
    </MedicationsContext.Provider>
  );
};

export default MedicationsContext;