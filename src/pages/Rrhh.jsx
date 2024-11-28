import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import TableInfo from '../common/TableInfo';
import DetailsPage from './DetailsPage';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';

function Rrhh() {
  const [data, setData] = React.useState([]);
  const location = useLocation();
  const [optionsRol, setOptionsRol] = React.useState([]);
  const [optionsDeptos, setOptionsDeptos] = React.useState([]);

  const inputItems = [
    {label: 'Rol', type: 'select', name:'idTipoRol', required: true, value:'rol.nombreRol', options: optionsRol, descripcion:'nombreRol'},
    {label: 'Nombre', type: 'text', name:'nombre', required: true, value:'nombre'},
    {label: 'Apellido', type: 'text', name:'apellido', required: true, value:'apellido'},
    {label: 'Fecha de Nacimiento', type: 'date', name:'fechaNacimiento', required: true, value:'fechaNacimiento'},
    {label: 'Cuil', type: 'number', name:'cuil', required: true, value:'cuil'},
    {label: 'DNI', type:'number', name:'dni', required: true, value:'dni'},
    {label: 'Dirección', type: 'text', name:'direccion', required: true, value:'direccion'},
    {label: 'Fecha de Contratacion', type: 'date', name:'fechaContratacion', required: true, value:'fechaContratacion'},
    {label: 'Departamento', type: 'select', name:'idDepto', required: true, value:'departamento.nombreDepto', options: optionsDeptos, descripcion:'nombreDepto'},
    {label: 'Usuario', type: 'text', name:'usuario', required: true, value:'usuario'},
    {label: 'Correo', type: 'email', name:'correo', required: true, value:'correo'}
  ]

  const inputEditsItems = [
    {label: 'Rol', type: 'select', name:'idTipoRol', required: true, value:'rol.nombreRol', options: optionsRol, descripcion:'nombreRol'},
    {label: 'Nombre', type: 'text', name:'nombre', required: true, value:'nombre'},
    {label: 'Apellido', type: 'text', name:'apellido', required: true, value:'apellido'},
    {label: 'Fecha de Nacimiento', type: 'date', name:'fechaNacimiento', required: true, value:'fechaNacimiento'},
    {label: 'Cuil', type: 'number', name:'cuil', required: true, value:'cuil'},
    {label: 'DNI', type:'number', name:'dni', required: true, value:'dni'},
    {label: 'Dirección', type: 'text', name:'direccion', required: true, value:'direccion'},
    {label: 'Fecha de Contratacion', type: 'date', name:'fechaContratacion', required: true, value:'fechaContratacion'},
    {label: 'Departamento', type: 'select', name:'idDepto', required: true, value:'departamento.nombreDepto', options: optionsDeptos, descripcion:'nombreDepto'},
  ]

  const header = [
    { title: "Id"},
    { title: "Nombre"},
    { title: "Apellido "},
    { title: "Fecha de Nacimiento" },
    { title: "Fecha de Contratación" }, 
    { title: "Rol" },
    { title: "Acciones" }
  ];

  useEffect(()=>{
    fetch("https://localhost:7180/api/Empleado")
    .then((res) => res.json())
    .then((data) => {
      let dataResult = data.filter(item => item.estadoActivo == true)
      .map(item => ({
        id: item.id,
        nombre: item.nombre,
        apellido: item.apellido,
        fechaNacimiento: item.fechaNacimiento,
        fechaContratacion: item.fechaContratacion,
        rol: item.rol.nombreRol
      }))
      console.log(dataResult);
      setData(dataResult);
    })
    .catch((error) => console.error("Error al obtener los datos"));

    fetch("https://localhost:7180/api/TipoRol")
    .then((res) => res.json())
    .then((data) => {
      setOptionsRol(data);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

    fetch("https://localhost:7180/api/Departamento")
    .then((res) => res.json())
    .then((data) => {
      setOptionsDeptos(data);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

  }, [location.state?.refresh]);

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
          <Routes>
            <Route path="" element={<TableInfo header={header} rowsBody={data} />} />
            <Route path='Details/:id' element={<DetailsPage pageTitle="Detalle del empleado" page="Empleado" inputItems={inputItems}/>}/>
            <Route path="Edit/:id" element={<FormEdit pageTitle="Editar empleado" page="Empleado" inputItems={inputEditsItems}/>}/>
            <Route path="Delete/:id" element={<Delete pageTitle="Eliminar empleado" page="Empleado" inputItems={inputItems}/>}/>
          </Routes>
        </Container>
    </>
  )
}

export default Rrhh