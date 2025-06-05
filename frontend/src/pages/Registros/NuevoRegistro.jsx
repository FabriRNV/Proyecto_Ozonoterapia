import { useEffect, useState } from 'react';
import { Button, Card } from '../../components/ui';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FormRegistro from './FormRegistro';
import ServicioRegistro from '../../services/ServicioRegistro';

// Component to add a new patient
export const NuevoRegistro = () => {
  // useState hook to manage the patient data
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    nombre: "",
    fecha_nacimiento: "",
    estado_civil: "",
    procedencia: "",
    genero: "",
    edad: "",
    ocupacion: "",
    telefono: "",
    email: "",
    antecedentes: ""
  });

  const añadirNuevoRegistro = async () => {
    const patientData = { ...newData };
    try {
      await ServicioRegistro.create_paciente(patientData);
      alert("Nuevo paciente creado con éxito");
      setNewData({
        nombre: "",
        fecha_nacimiento: "",
        estado_civil: "",
        procedencia: "",
        genero: "",
        edad: "",
        ocupacion: "",
        telefono: "",
        email: "",
        antecedentes: ""
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error al crear paciente:", error);
      alert("Fallo al crear nuevo paciente. por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 gap-6'>
      <FormRegistro
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevoRegistro}>Crear nuevo Paciente</Button>
    </div>
  );
};