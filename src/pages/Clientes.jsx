import React, { useEffect } from 'react'
import TableInfo from '../common/TableInfo'
import Form from '../common/Form';
import { Container } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';
import DetailsPage from './DetailsPage';

function Clientes() {
  const [data, setData] = React.useState([]);
  const location = useLocation();

  const inputItems = [
    {label: 'Nombre', type: 'text', name:'nombre', required: true, value:'nombre'},
    {label: 'Apellido', type: 'text', name:'apellido', required: true, value:'apellido'},
    {label: 'Dirección', type: 'text', name:'direccion', required: true, value:'direccion'},
    {label: 'Mail', type:'email', name:'email', required: true, value:'email'},
    {label: 'Cuil/Cuit', type:'number', name:'cuilCuit', required: true, value:'cuilCuit'},
    {label: 'Teléfono', type:'number', name:'telefono', required: true, value:'telefono'}
  ];

  const header = [
    { title: "Id" },
    { title: "Nombre" },
    { title: "Apellido"},
    { title: "Cuil/Cuit" },
    { title: "Teléfono" },
    { title: "Acciones" }
  ];
  
  useEffect(() => {
    fetch("https://localhost:7180/api/Cliente")
    .then((res) => res.json())
    .then((data) => {
      let dataResult = data.filter(item => item.estadoActivo == true).map(item=>({
        id: item.id,
        nombre: item.nombre,
        apellido: item.apellido,
        cuilCuit: item.cuilCuit,
        telefono: item.telefono
      }))
      
      console.log(dataResult);
      setData(dataResult);
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
  },[location.state?.refresh]);

  return (
    <>
      <Container disableGutters sx={{mt:2}}>
        <Routes>
          <Route path="" element={<TableInfo header={header} rowsBody={data}/>}/>
          <Route path='Create' element={<Form pageTitle='Nuevo cliente' page="Cliente" inputItems={inputItems}/>}/>
          <Route path='Details/:id' element={<DetailsPage pageTitle="Detalle del cliente" page="Cliente" inputItems={inputItems}/>}/>
          <Route path="Edit/:id" element={<FormEdit pageTitle='Editar cliente' page="Cliente" inputItems={inputItems}/>}/>
          <Route path="Delete/:id" element={<Delete pageTitle='Eliminar cliente' page="Cliente" inputItems={inputItems}/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default Clientes