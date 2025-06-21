import { useState } from 'react';
import { Button, Card } from '../../components/ui';
import FormCita from './FormCita';
import ServicioCita from '../../services/ServicioCita';

// Component to add a new patient
export const NuevaCita = () => {
  // useState hook to manage the patient data
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    paciente_id: "",
    doctor_id: "",
    fecha: "",
    hora: "",
    motivo: "",
    enfermedad: "",
    fuente: ""
  });

  const añadirNuevaCita = async () => {
    const citaData = { ...newData };
    try {
      await ServicioCita.create_cita(citaData);
      alert("Nueva cita creada con éxito");
      setNewData({
        paciente_id: "",
        doctor_id: "",
        fecha: "",
        hora: "",
        motivo: "",
        enfermedad: "",
        fuente: ""
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error al crear cita:", error);
      alert("Fallo al crear nueva cita. Por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 gap-6'>
      <FormCita
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevaCita}>Crear nueva Cita</Button>
    </div>
  );
};