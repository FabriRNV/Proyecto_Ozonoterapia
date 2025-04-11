import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
//import serviceEntrada from '../../services/ServicioRegistro';  
import { Card, Button } from '../../components/ui';  

export const ListaRegistro = () => {

  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Indice',  
      selector: row => row.index  
    },
    {
      name: 'proveedor',  
      selector: row => row.supplier  
    },
    {
      name: 'Nombre Producto',
      selector: row => row.product  
    },
    {
      name: 'cantidad',  
      selector: row => row.quantity 
    },
    {
      name: 'Precio Unitario',  
      selector: row => row.unit_price 
    },
    {
      name: 'Fecha Entrada',  
      selector: row => row.create_at  
    },
    {
      name: 'actions',
      selector: (row) => (
        <Button onClick={() => handleEditClick(row)}>Editar</Button>
      ),
    },
  ];
/*
  const getItems = async () => {
    try {
      const response = await serviceEntrada.getEntrada();
      console.log(response);
      let index = 1;
      const formattedData = response.map((item) => {
        return item.entry_product.map((product) => {
          const row = {
          index: index,
          supplier: item.supplier,
          product: product.product,
          quantity: product.quantity,
          unit_price: product.unit_price,
          create_at: item.create_at
        };
        index++;
        return row;
      });
      }).flat();  
      setData(formattedData); 
    } catch (error) {
      console.error(error);  
    }
  };
  useEffect(() => {
    getItems();  
  }, []);  
*/
  return (
    <Card titulo={"Entrada de productos a almacen"}>
      <DataTable columns={columns} data={data} theme="solarized" />
    </Card>
  );
};

/* 
Possible Improvements:
1. **Add Form Fields:** The current form is empty. Consider adding input fields (e.g., for product name, quantity, supplier, etc.) and connecting them to the useForm register method.
2. **Form Validation:** Implement validation rules using the register function to ensure data integrity before submission.
3. **Error Handling:** Provide user feedback for invalid inputs or submission errors.
4. **Loading State:** Add a loading state to indicate when the form is processing the submission, enhancing user experience.
5. **Data Submission:** Instead of just logging data to the console, consider implementing a function to send the data to a server or API endpoint for further processing.
6. **Use of State Management:** Depending on the application's scale, consider integrating a state management solution (like Redux) for managing the form state more effectively.
*/
