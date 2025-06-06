import React, { useState } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';
import { useAgeCalculator } from '../../hooks/useAgeCalculator';

const FormRegistro = ({ newData, setNewData, addNewRow, editData, isDisabled }) => {
  // Estados para mensajes de error
  const [errors, setErrors] = useState({});
  const { handleBirthDateChange } = useAgeCalculator();

  // Opciones para los combobox
  const estadoCivilOptions = ["Soltero", "Casado", "Separado", "Divorciado", "Viudo"];
  const procedenciaOptions = ["Cochabamba", "La Paz", "Santa Cruz", "Oruro", "Potosi", "Beni", "Pando", "Chuquisaca", "Tarija"];
  const generoOptions = ["Masculino", "Femenino"];

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
    <Card titulo={"Registro de Pacientes"}>
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
          {/* Fecha de Nacimiento */}
          <div>
            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
            <Input
             id="fecha_nacimiento"
             name="fecha_nacimiento"
             value={newData.fecha_nacimiento || ''} 
             onChange={e => handleBirthDateChange(e.target.value, setNewData)} 
             type="date" 
             disabled={isDisabled} />
            {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento}</p>}
          </div>
          {/* Estado Civil */}
          <div>
            <Label htmlFor="estado_civil">Estado Civil</Label>
            <Input
             id="estado_civil"
             name="estado_civil"
             value={newData.estado_civil || ''} 
             onChange={e => setNewData({ ...newData, estado_civil: e.target.value })} 
             type="text" 
             list="estado-civil-options"
             disabled={isDisabled} />
            <datalist id="estado-civil-options">
              {estadoCivilOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>
          {/* Procedencia */}
          <div>
            <Label htmlFor="procedencia">Procedencia</Label>
            <Input
             id="procedencia"
             name="procedencia"
             value={newData.procedencia || ''} 
             onChange={e => setNewData({ ...newData, procedencia: e.target.value })} 
             type="text" 
             list="procedencia-options"
             disabled={isDisabled} />
            <datalist id="procedencia-options">
              {procedenciaOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>
          {/* Género */}
          <div>
            <Label htmlFor="genero">Género</Label>
            <Input
             id="genero"
             name="genero"
             value={newData.genero || ''} 
             onChange={e => setNewData({ ...newData, genero: e.target.value })} 
             type="text" 
             list="genero-options"
             disabled={isDisabled} />
            <datalist id="genero-options">
              {generoOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
          </div>
          {/* Edad */}
          <div>
            <Label htmlFor="edad">Edad</Label>
            <Input
             id="edad"
             name="edad"
             value={newData.edad || ''} onChange={e => setNewData({ ...newData, edad: e.target.value })} type="number" disabled={isDisabled} />
            {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
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

export default FormRegistro;