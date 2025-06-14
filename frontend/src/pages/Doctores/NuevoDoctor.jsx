import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormDoctor from './FormDoctor';
import { Button } from '../../components/ui';
import ServicioDoctor from '../../services/ServicioDoctor';

export const NuevoDoctor = () => {
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    email: "",
    licencia_medica: ""
  });

  const añadirNuevoDoctor = async () => {
    const doctorData = { ...newData };
    try {
      await ServicioDoctor.create_doctor(doctorData);
      alert("Nuevo Doctor creado con éxito");
      setNewData({
        nombre: "",
        especialidad: "",
        telefono: "",
        email: "",
        licencia_medica: ""
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error al crear doctor:", error);
      alert("Fallo al crear nuevo doctor. por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 gap-6'>
      <FormDoctor
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevoDoctor}>Crear nuevo Doctor</Button>
    </div>
  );
}; 