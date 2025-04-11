import React from 'react';
import DataTable from 'react-data-table-component';
import { Card, Button } from '../../components/ui';

const TableEntrada = ({ dataTable, handleDeleteOnTable, handleEditTable }) => {
  const columns = [
    { name: 'ID', selector: row => row.id },
    { name: 'Proveedor', selector: row => row.supplier },
    { name: 'Producto', selector: row => row.product },
    { name: 'Cantidad', selector: row => row.quantity },
    { name: 'Precio Unitario', selector: row => row.unit_price },
    { name: 'Total Producto', selector: row => Number(row.quantity * row.unit_price) },
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
    <Card titulo={"Entrada de productos a almacen"}>
      <DataTable columns={columns} data={dataTable} theme="solarized" />
    </Card>
  );
}

export default TableEntrada;