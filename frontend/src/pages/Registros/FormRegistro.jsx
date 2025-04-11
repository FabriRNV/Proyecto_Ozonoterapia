import React, { useState } from 'react';
import { Button, Input, Label, Select, Card } from '../../components/ui';

const FormRegistro = ({ newData, setNewData, addNewRow, editData,isDisabled }) => {
  
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

    if (!newData.create_at) newErrors.create_at = "La fecha de creación es obligatoria.";
    if (!newData.supplier) newErrors.supplier = "Debe seleccionar un proveedor.";
    if (!newData.product) newErrors.product = "Debe seleccionar un producto.";
    if (!newData.quantity || newData.quantity <= 0) newErrors.quantity = "Ingrese una cantidad válida.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Card titulo={"Registro Entradas"}>
      <form className='mt-2 p-6' onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          
          {/* Fecha de Creación */}
          <div>
            <Label className='block mb-3 text-sm font-bold text-gray-900'>Fecha Creación</Label>
            <Input 
              value={newData.create_at || ''} 
              onChange={(e) => setNewData({ ...newData, create_at: e.target.value })} 
              type="datetime-local"  
              disabled={isDisabled}
            />
            {errors.create_at && <p className="text-red-500 text-xs mt-1">{errors.create_at}</p>}
          </div>

          {/* Proveedor */}
          <div>
            <Label className='block mb-3 text-sm font-bold text-gray-900'>Proveedor:</Label>
            <Select 
              value={newData.supplier || ""} 
              onChange={(e) => setNewData({ ...newData, supplier: e.target.value })} 
            >
              <option value="" disabled>Seleccione un proveedor</option>
              {proveedor.map((supplierOption, index) => (
                <option key={'supplier-' + index} value={supplierOption.id} disabled={isDisabled}>
                  {supplierOption.supplier_name}
                </option>
              ))}
            </Select>
            {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>}
          </div>

          {/* Producto, Cantidad y Precio */}
          <div className="sm:col-span-2">
            {/* Producto */}
            <div>
              <Label className='block mb-3 text-sm font-bold text-gray-900'>Producto:</Label>
              <Select 
                value={newData.product || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedProduct = producto.find(item => item.id == selectedId);
                  setNewData({
                    ...newData,
                    product: selectedId,
                    unit_price: selectedProduct ? selectedProduct.unit_price : "",
                  });
                }} 
              >
                <option value="" disabled>Seleccione un producto</option>
                {producto.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </Select>
              {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
            </div>

            {/* Cantidad */}
            <div className='mt-3'>
              <Label className='block mb-3 text-sm font-bold text-gray-900'>Cantidad</Label>
              <Input 
                type="number" 
                value={newData.quantity || ""} 
                onChange={(e) => setNewData({ ...newData, quantity: e.target.value })} 
              />
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
            </div>

            {/* Precio Unitario */}
            <div className='mt-3'>
              <Label className='block mb-3 text-sm font-bold text-gray-900'>Precio Unitario</Label>
              <Input 
                type='number' 
                disabled={true}
                value={newData.unit_price || ""} 
                onChange={(e) => setNewData({ ...newData, unit_price: e.target.value })} 
              />
            </div>
          </div>
        </div>

        {/* Botón de agregar o actualizar */}
        <div className="mt-5 col-span-4 flex justify-center">
          <Button type="submit">{editData !== null ? 'Actualizar' : 'Agregar'}</Button>
        </div>
      </form>
    </Card>
  );
};

export default FormRegistro;