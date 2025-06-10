import { useEffect, useState } from 'react';
import { Button, Card } from '../../components/ui';
import FormTratamiento from './FormTratamiento';
import ServicioTratamiento from '../../services/ServicioTratamiento';

// Component to add a new patient
export const NuevoTratamiento = () => {
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

  const añadirNuevoTratamiento = async () => {
    const tratamientoData = { ...newData };
    try {
      await ServicioTratamiento.create_tratamiento(tratamientoData);
      alert("Nuevo tratamiento creado con éxito");
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
      console.error("Error al crear tratamiento:", error);
      alert("Fallo al crear nuevo tratamiento. por favor intente de nuevo.");
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