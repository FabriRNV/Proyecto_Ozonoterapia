import React from 'react';
import DataTable from 'react-data-table-component';
import { Card, Button } from '../../components/ui';

const TablaRegistro = ({ dataTable, handleDeleteOnTable, handleEditTable }) => {
  const columns = [
    { name: 'ID', selector: row => row.id },
    { name: 'FHIR ID', selector: row => row.fhir_id },
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Apellido', selector: row => row.apellido },
    { name: 'Fecha de Nacimiento', selector: row => row.fecha_nacimiento },
    { name: 'Género', selector: row => row.genero },
    {
      name: 'Actions',
      selector: (row, index) => (
        <div className="flex gap-2 justify-center">
          <Button onClick={() => handleDeleteOnTable(row.id)}>Eliminar</Button>
          <Button onClick={() => handleEditTable(index, row)}>Editar</Button>
        </div>
      ),
    },
  ];

  return (
    <Card titulo={"Registro de Pacientes"}>
      <DataTable columns={columns} data={dataTable} theme="solarized" />
    </Card>
  );
}

export default TablaRegistro;