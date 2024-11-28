import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import TableInfo from '../common/TableInfo';
import DetailsPage from './DetailsPage';
import Form from '../common/Form';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';

function Productos() {
  const [data, setData] = React.useState([]);
  const location = useLocation();
  const [optionsCliente, setOptionsCliente] = React.useState([]);
  const [optionsEstado, setOptionsEstado] = React.useState([]);

  const inputItems = [
    {label: 'Cliente', type: 'select', name:'idCliente', required: true, value:'cliente.cuilCuit', options: optionsCliente, descripcion:'cuilCuit' },
    {label: 'Descripción', type: 'text', name:'descripcion', required: true, value:'descripcion'},
    {label: 'Precio', type: 'number', name:'precio', required: true, value:'precio'},
    {label: 'Nombre del Producto', type: 'text', name:'nombreProducto', required: true, value:'nombreProducto'},
    {label: 'Estado', type: 'select', name:'idEstado', required: true, value:'estado.nombreEstado', options: optionsEstado, descripcion:'nombreEstado'},
  ]

  const header = [
    { title: "Id" },
    { title: "Cliente" },
    { title: "Descripción" },
    { title: "Precio" },
    { title: "Nombre del producto" },
    { title: "Estado" },
    { title: "Acciones" }
  ]

  useEffect(() => {
    fetch("https://localhost:7180/api/ProductoSoftware")
    .then((res) => res.json())
    .then((data) => {
      let dataResult = data.filter(item => item.estadoActivo == true).map(item=>({
        id: item.id,
        cliente: item.cliente.cuilCuit,
        descripcion: item.descripcion,
        precio: item.precio,
        nombreProducto: item.nombreProducto,
        estado: item.estado.nombreEstado
      }))

      setData(dataResult);
    })
    .catch((error) => console.error("Error al obtener los datos: ",error));

    fetch("https://localhost:7180/api/Cliente")
    .then((res) => res.json())
    .then((data) => {
      data = data.filter(item => item.estadoActivo == true);
      setOptionsCliente(data);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

    fetch("https://localhost:7180/api/Estado")
    .then((res) => res.json())
    .then((data) =>{
      setOptionsEstado(data)
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

  }, [location.state?.refresh])

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
          <Routes>
            <Route path="" element={<TableInfo header={header} rowsBody={data} />} />
            <Route path="Details/:id" element={<DetailsPage pageTitle="Detalle del producto" page="ProductoSoftware" inputItems={inputItems} />}/>
            <Route path="Create" element={<Form pageTitle="Nuevo producto" page="ProductoSoftware" inputItems={inputItems} />} />
            <Route path="Edit/:id" element={<FormEdit pageTitle="Editar producto" page="ProductoSoftware" inputItems={inputItems} />} />
            <Route path="Delete/:id" element={<Delete pageTitle="Eliminar producto" page="ProductoSoftware" inputItems={inputItems} />} />
          </Routes>
        </Container>
    </>
  )
}

export default Productos