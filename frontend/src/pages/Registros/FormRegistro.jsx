import React, { useState } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';

const FormRegistro = ({ newData, setNewData, addNewRow, editData, isDisabled }) => {
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
    <Card titulo={"Registro de Pacientes"}>
      <form className="mt-2 p-6 w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label>Nombre</Label>
            <Input value={newData.nombre || ''} onChange={e => setNewData({ ...newData, nombre: e.target.value })} type="text" disabled={isDisabled} />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          {/* Fecha de Nacimiento */}
          <div>
            <Label>Fecha de Nacimiento</Label>
            <Input value={newData.fecha_nacimiento || ''} onChange={e => setNewData({ ...newData, fecha_nacimiento: e.target.value })} type="date" disabled={isDisabled} />
            {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento}</p>}
          </div>
          {/* Estado Civil */}
          <div>
            <Label>Estado Civil</Label>
            <Input value={newData.estado_civil || ''} onChange={e => setNewData({ ...newData, estado_civil: e.target.value })} type="text" disabled={isDisabled} />
          </div>
          {/* Procedencia */}
          <div>
            <Label>Procedencia</Label>
            <Input value={newData.procedencia || ''} onChange={e => setNewData({ ...newData, procedencia: e.target.value })} type="text" disabled={isDisabled} />
          </div>
          {/* Género */}
          <div>
            <Label>Género</Label>
            <Input value={newData.genero || ''} onChange={e => setNewData({ ...newData, genero: e.target.value })} type="text" disabled={isDisabled} />
            {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
          </div>
          {/* Edad */}
          <div>
            <Label>Edad</Label>
            <Input value={newData.edad || ''} onChange={e => setNewData({ ...newData, edad: e.target.value })} type="number" disabled={isDisabled} />
            {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
          </div>
          {/* Ocupación */}
          <div>
            <Label>Ocupación</Label>
            <Input value={newData.ocupacion || ''} onChange={e => setNewData({ ...newData, ocupacion: e.target.value })} type="text" disabled={isDisabled} />
          </div>
          {/* Teléfono */}
          <div>
            <Label>Teléfono</Label>
            <Input value={newData.telefono || ''} onChange={e => setNewData({ ...newData, telefono: e.target.value })} type="number" disabled={isDisabled} />
          </div>
          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input value={newData.email || ''} onChange={e => setNewData({ ...newData, email: e.target.value })} type="email" disabled={isDisabled} />
          </div>
          {/* Antecedentes */}
          <div>
            <Label>Antecedentes</Label>
            <Input value={newData.antecedentes || ''} onChange={e => setNewData({ ...newData, antecedentes: e.target.value })} type="text" disabled={isDisabled} />
          </div>
        </div>

      </form>
    </Card>
  );
};

export default FormRegistro;