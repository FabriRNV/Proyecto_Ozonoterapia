import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import servicio_registro from '../../services/ServicioRegistro';  
import { Card, Button } from '../../components/ui';  

export const ListaRegistro = () => {

  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Indice',  
      selector: row => row.id  
    },
    {
      name: 'FHIR ID',
      selector: row => row.fhir_id  
    },
    {
      name: 'Nombre',  
      selector: row => row.nombre  
    },
    {
      name: 'Apellido',
      selector: row => row.apellido  
    },
    {
      name: 'Fecha De Nacimiento',  
      selector: row => row.fecha_nacimiento 
    },
    {
      name: 'Genero',  
      selector: row => row.genero 
    },
    {
      name: 'actions',
      selector: (row) => (
        <Button onClick={() => handleEditClick(row)}>Editar</Button>
      ),
    },
  ];

  const getItems = async () => {
    try {
      const response = await servicio_registro.get_paciente();
      console.log(response);
      const formattedData = response.map((item) => ({
        id: item.id,
        fhir_id: item.fhir_id,
        nombre: item.nombre,
        apellido: item.apellido,
        fecha_nacimiento: item.fecha_nacimiento,
        genero: item.genero,
      }));
      setData(formattedData);
    } catch (error) {
      console.error(error);  
    }
  };
  useEffect(() => {
    getItems();  
  }, []);  

  return (
    <Card titulo={"Registro de Pacientes"}>
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
