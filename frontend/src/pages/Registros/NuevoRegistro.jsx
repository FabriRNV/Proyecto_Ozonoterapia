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
    id: "",
    fhir_id: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
  });
/*
  const showProducts = async () => {
    const response = await serviceItem.getAll();
    setProducto(response);
    console.log('Productos: ', response);
  };

  const showProveedor = async () => {
    const response = await serviceProveedor.getAll();
    setProveedor(response);
    console.log('Proveedor: ', response);
  };

  useEffect(() => {
    showProveedor();
    showProducts();
  }, []);
*/
  const añadirNuevoRegistro = async () => {
    const patientData = {
      id: newData.id,
      fhir_id: newData.fhir_id,
      nombre: newData.nombre,
      apellido: newData.apellido,
      fecha_nacimiento: newData.fecha_nacimiento,
      genero: newData.genero,
    };

    console.log(patientData);
    try {
      await ServicioRegistro.create_paciente(patientData);
      alert("Nuevo paciente creado con éxito");
      setNewData({
        id: "",
        fhir_id: "",
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        genero: "",
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error al crear paciente:", error);
      alert("Fallo al crear nuevo paciente. por favor intente de nuevo.");
    }
  };

  return (
    <div className='w-full flex flex-col px-4 gap-3'>
      <FormRegistro
        newData={newData}
        setNewData={setNewData}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevoRegistro}>Crear nuevo Paciente</Button>
    </div>
  );
};