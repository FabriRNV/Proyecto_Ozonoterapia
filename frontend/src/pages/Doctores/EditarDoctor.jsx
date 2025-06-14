import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormDoctor from './FormDoctor';
import { Button } from '../../components/ui';
import ServicioDoctor from '../../services/ServicioDoctor';

export const EditarDoctor = () => {
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    nombre: "",
    EditarDocdad: "",
    telefono: "",
    email: "",
    licencia_medica: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctor = await ServicioDoctor.getId_doctor(id);
        setNewData(doctor);
      } catch (error) {
        console.error("Error al obtener el doctor:", error);
        alert("Error al cargar los datos del doctor");
      }
    };
    getDoctor();
  }, [id]);

  const actualizarDoctor = async () => {
    const doctorData = { ...newData, id: parseInt(id) };
    try {
      await ServicioDoctor.update_doctor(doctorData);
      alert("Doctor actualizado con éxito");
      navigate("/Menu/doctores");
    } catch (error) {
      console.error("Error al actualizar doctor:", error);
      alert("Fallo al actualizar doctor. Por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 gap-6'>
      <FormDoctor
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={actualizarDoctor}>Actualizar Doctor</Button>
    </div>
  );
};


