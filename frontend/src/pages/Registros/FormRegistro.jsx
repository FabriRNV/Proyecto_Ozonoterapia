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
/*      
<div className="mt-5 col-span-4 flex justify-center">
<Button type="submit">{editData !== null ? 'Actualizar' : 'Agregar'}</Button>
</div>
*/
    if (!newData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!newData.apellido) newErrors.apellido = "El apellido es obligatorio.";
    if (!newData.fecha_nacimiento) newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
    if (!newData.genero) newErrors.genero = "El género es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Card titulo={"Registro de Pacientes"}>
      <form className="mt-2 p-6 w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label className="block mb-3 text-sm font-bold text-gray-900">Nombre</Label>
            <Input
              value={newData.nombre || ''}
              onChange={(e) => setNewData({ ...newData, nombre: e.target.value })}
              type="text"
              disabled={isDisabled}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          {/* Apellido */}
          <div>
            <Label className="block mb-3 text-sm font-bold text-gray-900">Apellido</Label>
            <Input
              value={newData.apellido || ''}
              onChange={(e) => setNewData({ ...newData, apellido: e.target.value })}
              type="text"
              disabled={isDisabled}
            />
            {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <Label className="block mb-3 text-sm font-bold text-gray-900">Fecha de Nacimiento</Label>
            <Input
              value={newData.fecha_nacimiento || ''}
              onChange={(e) => setNewData({ ...newData, fecha_nacimiento: e.target.value })}
              type="date"
              disabled={isDisabled}
            />
            {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento}</p>}
          </div>

          {/* Género */}
          <div>
            <Label className="block mb-3 text-sm font-bold text-gray-900">Género</Label>
            <Input
              value={newData.genero || ''}
              onChange={(e) => setNewData({ ...newData, genero: e.target.value })}
              type="text"
              disabled={isDisabled}
            />
            {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
          </div>
        </div>

      </form>
    </Card>
  );
};

export default FormRegistro;