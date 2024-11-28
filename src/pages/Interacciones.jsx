import { Container } from '@mui/system';
import React, { useEffect } from 'react'
import {useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import TableInfo from '../common/TableInfo';
import DetailsPage from './DetailsPage';
import Form from '../common/Form';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';

function Interacciones() {
    const [data, setData] = React.useState([]);
    const location = useLocation();
    const [optionsClientes, setOptionsClientes] = React.useState([]);
    const [optionsEmpleados, setOptionsEmpleados] = React.useState([]);
    const [optionsInteracciones, setOptionsInteracciones] = React.useState([]);

    const inputItems = [
        {label: 'Cliente', type: 'select', name:'idCliente', required: true, value:'cliente.cuilCuit', options: optionsClientes, descripcion:'cuilCuit'},
        {label: 'Empleado', type: 'select', name:'idEmpleado', required: true, value:'empleado.usuario', options: optionsEmpleados, descripcion: "usuario"},
        {label: 'Tipo de Interacción', type: 'select', name:'idTipoInteraccion', required: true, value:'tipoInteraccion.descripcion', options: optionsInteracciones, descripcion: "descripcion"},
        {label: 'Motivo', type: 'text', name:'motivo', required: true, value:'motivo'},
        {label: 'Fecha', type: 'date', name:'fecha', required: true, value:'fecha'}
    ]

    const header = [
        { title: "Id"}, 
        { title: "Cliente" },
        { title: "Empleado" },
        { title: "Tipo de Interacción" },
        { title: "Motivo" },
        { title: "Fecha"},
        { title: "Acciones"}
    ];

    useEffect(() => {
        fetch("https://localhost:7180/api/Interacciones")
        .then((res) => res.json())
        .then((data) =>{
            let dataResult = data.filter(item => item.estadoActivo == true).map(
                item => ({
                    id: item.id,
                    cliente: item.cliente.cuilCuit,
                    empleado: item.empleado.usuario,
                    tipoInteraccion: item.tipoInteraccion.descripcion,
                    motivo: item.motivo,
                    fecha: item.fecha
                })
            );

            setData(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));

        fetch("https://localhost:7180/api/Cliente")
        .then((res) => res.json())
        .then((data) => {
            let dataResult = data.filter(d => d.estadoActivo == true);
            setOptionsClientes(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));

        fetch("https://localhost:7180/api/Empleado")
        .then((res) => res.json())
        .then((data) => {
            let dataResult = data.filter(d => d.estadoActivo == true);
            setOptionsEmpleados(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
        
        fetch("https://localhost:7180/api/TipoInteraccion")
        .then((res) => res.json())
        .then((data) => {
            setOptionsInteracciones(data);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
        
    }, [location.state?.refresh]);  

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
            <Routes>
                <Route path="" element={<TableInfo header={header} rowsBody={data}/> } />
                <Route path="Details/:id" element={<DetailsPage pageTitle="Detalle de la Interacción" page="Interacciones" inputItems={inputItems}/>}/>
                <Route path="Create" element={<Form pageTitle="Nueva Interacción" page="Interacciones" inputItems={inputItems}/> }/>
                <Route path="Edit/:id" element={<FormEdit pageTitle="Editar interacción" page="Interacciones" inputItems={inputItems} />}/>
                <Route path="Delete/:id" element={<Delete pageTitle="Eliminar interacción" page="Interacciones" inputItems={inputItems}/>}/>
            </Routes>
        </Container>    
    </>
  )
}

export default Interacciones