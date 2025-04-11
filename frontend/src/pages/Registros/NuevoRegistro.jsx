import { useEffect, useState } from 'react';
import { Button, Card } from '../../components/ui';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FormEntrada from './FormRegistro';

// Component to add a new product to the stock
export const NuevoRegistro = () => {
  // useState hook to manage the stock and form data
  const [proveedor, setProveedor] = useState([]);
  const [producto, setProducto] = useState([]);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [newData, setNewData] = useState({
    supplier: "", 
    product: "", 
    quantity: "",
    unit_price: "", 
    create_at: ""
  });

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

  const añadirNuevoRegistro = async () => {
    const entryData = {
      entry: {
        create_at: newData.create_at, // Fecha de creación
      },
      supplier: {
        id: parseInt(newData.supplier), // ID del proveedor
      },
      products: [], // La tabla ha sido eliminada, por lo que no hay productos
      entry_products: [], // La tabla ha sido eliminada, por lo que no hay productos
    };

    console.log(entryData);
    try {
      await serviceEntrada.createEntrada(entryData);
      alert("NEW ENTRY CREATED SUCCESSFULLY 😺");
      setNewData({
        supplier: "", 
        product: "", 
        quantity: "",
        unit_price: "", 
        create_at: ""
      });
      setInputsDisabled(false);
    } catch (error) {
      console.error("Error creating new entry:", error);
      alert("Failed to create new entry. Please try again.");
    }
  };

  return (
    <div className='w-full flex flex-col px-4 gap-3'>
      <FormEntrada
        newData={newData}
        setNewData={setNewData}
        proveedor={proveedor}
        producto={producto}
        isDisabled={inputsDisabled}
      />
      <Button onClick={añadirNuevoRegistro}>Crear nuevo Paciente</Button>
    </div>
  );
};