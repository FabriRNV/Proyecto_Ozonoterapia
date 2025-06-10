import React, { useState } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';

const FormTratamiento = ({ newData, setNewData, addNewRow, editData, isDisabled }) => {
  // Estados para mensajes de error
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      addNewRow(e);
    }
  };

  const validateFields = () => {
    let newErrors = {};
      
    if (!newData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!newData.fecha_nacimiento) newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
    if (!newData.genero) newErrors.genero = "El género es obligatorio.";
    if (!newData.edad) newErrors.edad = "La edad es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full flex flex-col items-center px-4 gap-6">
    <Card titulo={"Registro de Tratamientos"}>
      <form className="mt-2 p-6 w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
             id="nombre"
             name="nombre"
             value={newData.nombre || ''} onChange={e => setNewData({ ...newData, nombre: e.target.value })} type="text" disabled={isDisabled} />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          {/* Ocupación */}
          <div>
            <Label htmlFor="ocupacion">Ocupación</Label>
            <Input
             id="ocupacion"
             name="ocupacion"
             value={newData.ocupacion || ''} onChange={e => setNewData({ ...newData, ocupacion: e.target.value })} type="text" disabled={isDisabled} />
          </div>
          {/* Teléfono */}
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
             id="telefono"
             name="telefono"
             value={newData.telefono || ''} onChange={e => setNewData({ ...newData, telefono: e.target.value })} type="number" disabled={isDisabled} />
          </div>
          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
             id="email"
             name="email"
             value={newData.email || ''} onChange={e => setNewData({ ...newData, email: e.target.value })} type="email" disabled={isDisabled} />
          </div>
          {/* Antecedentes */}
          <div>
            <Label htmlFor="antecedentes">Antecedentes</Label>
            <Input
             id="antecedentes"
             name="antecedentes"
             value={newData.antecedentes || ''} onChange={e => setNewData({ ...newData, antecedentes: e.target.value })} type="text" disabled={isDisabled} />
          </div>
        </div>
      </form>
    </Card>
  </div>
  );
};

export default FormTratamiento;