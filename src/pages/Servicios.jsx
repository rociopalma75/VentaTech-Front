import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import TableInfo from '../common/TableInfo';
import DetailsPage from './DetailsPage';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';
import Form from '../common/Form';

function Servicios() {
  const [data, setData] = React.useState([]);
  const location = useLocation();
  const [optionsProveedor, setOptionsProveedor] = React.useState();

  const inputItems = [
    {label: 'Descripción', type: 'text', name:'descripcion', required: true, value:'descripcion'},
    {label: 'Precio', type: 'number', name:'precio', required: true, value:'precio'},
    {label: 'Proveedor', type: 'select', name:'idProveedor', required: true, value:'proveedor.razonSocial', options: optionsProveedor, descripcion: 'razonSocial'},
  ]

  const header = [
    { title: "Id" },
    { title: "Descripción" },
    { title: "Precio" },
    { title: "Proveedor" },
    { title: "Acciones" }
  ]

  useEffect(() => {
    fetch("https://localhost:7180/api/ProductoServicio")
    .then((res) => res.json())
    .then((data) => {
      let dataResult = data.filter(item => item.estadoActivo == true).map(
        item => ({
          id: item.id,
          descripcion: item.descripcion,
          precio: item.precio, 
          proveedor: item.proveedor.razonSocial
        })
      );
      setData(dataResult);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

    fetch("https://localhost:7180/api/Proveedor")
    .then((res) => res.json())
    .then((data) => {
      data = data.filter(item => item.estadoActivo == true);
      setOptionsProveedor(data);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

  }, [location.state?.refresh])

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
          <Routes>
            <Route path="" element={<TableInfo header={header} rowsBody={data} />}/>
            <Route path="Details/:id" element={<DetailsPage pageTitle="Detalle del servicio" page="ProductoServicio" inputItems={inputItems}/>}/>
            <Route path="Create" element={<Form pageTitle="Nuevo servicio" page="ProductoServicio" inputItems={inputItems}/>} />
            <Route path="Edit/:id" element={<FormEdit pageTitle="Editar servicio" page="ProductoServicio" inputItems={inputItems}/>}/>
            <Route path="Delete/:id" element={<Delete pageTitle="Eliminar servicio" page="ProductoServicio" inputItems={inputItems}/>}/>
          </Routes>
          
        </Container>
    </>
  )
}

export default Servicios