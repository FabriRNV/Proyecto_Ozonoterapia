import { useState } from 'react';
import { Button, Card } from '../../components/ui';
import FormTratamiento from './FormTratamiento';
import ServicioTratamiento from '../../services/ServicioTratamiento';

// Component to add a new patient
export const NuevoTratamiento = () => {
  // useState hook to manage the patient data
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    paciente_id: "",
    doctor_id: "",
    cita_id: "",
    tipo_tratamiento: "",
    dosis: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas_tratamiento: "",
    resultados_observados: ""
  });

  const añadirNuevoTratamiento = async () => {
    const tratamientoData = { ...newData };
    try {
      await ServicioTratamiento.create_tratamiento(tratamientoData);
      alert("Nuevo tratamiento creado con éxito");
      setNewData({
        paciente_id: "",
        doctor_id: "",
        cita_id: "",
        tipo_tratamiento: "",
        dosis: "",
        fecha_inicio: "",
        fecha_fin: "",
        notas_tratamiento: "",
        resultados_observados: ""
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error al crear tratamiento:", error);
      alert("Fallo al crear nuevo tratamiento. Por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 gap-6'>
      <FormTratamiento
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevoTratamiento}>Crear nuevo Tratamiento</Button>
    </div>
  );
};