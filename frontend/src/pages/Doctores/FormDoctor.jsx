import React, { useState } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/axios';

const FormDoctor = ({ newData, setNewData, isDisabled, onChange }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    if (!newData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!newData.especialidad) newErrors.especialidad = "La especialidad es obligatoria.";
    if (!newData.telefono) newErrors.telefono = "El teléfono es obligatorio.";
    if (!newData.email) newErrors.email = "El email es obligatorio.";
    if (!newData.licencia_medica) newErrors.licencia_medica = "La licencia médica es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      if (id) {
        await api.put(`/api/doctores/${id}`, newData);
      } else {
        await api.post('/api/doctores/', newData);
      }
      navigate('/Menu/doctores/listaDoctores');
    } catch (error) {
      console.error('Error al guardar doctor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData(prev => ({
      ...prev,
      [name]: value
    }));
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 gap-6">
      <Card titulo="Gestión de Doctores">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-4">
          {/* Nombre */}
          <div>
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              name="nombre"
              value={newData.nombre || ""}
              onChange={handleChange}
              type="text"
              placeholder="Nombre completo del doctor"
              disabled={isDisabled}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          {/* Especialidad */}
          <div>
            <Label htmlFor="especialidad">Especialidad</Label>
            <Input
              id="especialidad"
              name="especialidad"
              value={newData.especialidad || ""}
              onChange={handleChange}
              type="text"
              placeholder="Especialidad médica"
              disabled={isDisabled}
            />
            {errors.especialidad && <p className="text-red-500 text-xs mt-1">{errors.especialidad}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              value={newData.telefono || ""}
              onChange={handleChange}
              type="tel"
              placeholder="Número de teléfono"
              disabled={isDisabled}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={newData.email || ""}
              onChange={handleChange}
              type="email"
              placeholder="Correo electrónico"
              disabled={isDisabled}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Número de Licencia */}
          <div>
            <Label htmlFor="licencia_medica">Número de Licencia</Label>
            <Input
              id="licencia_medica"
              name="licencia_medica"
              value={newData.licencia_medica || ""}
              onChange={handleChange}
              type="text"
              placeholder="Número de licencia médica"
              disabled={isDisabled}
            />
            {errors.licencia_medica && <p className="text-red-500 text-xs mt-1">{errors.licencia_medica}</p>}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormDoctor; 