import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { Routes, useLocation, Route } from 'react-router-dom'
import TableInfo from '../common/TableInfo';
import Form from '../common/Form';
import DetailsPage from './DetailsPage';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';

function Venta() {
    const location = useLocation();
    const [data, setData] = React.useState([]);
    const [optionsEmpleados, setOptionsEmpleados] = React.useState([]);
    const [optionsSoftware, setOptionsSoftware] = React.useState([]);

    const inputItems = [
        {label: 'Software', type: 'select', name:'idProductoSoftware', required: true, value:'productoSoftware.nombreProducto', options: optionsSoftware, descripcion:'nombreProducto'},
        {label: 'Empleado (realiza la venta)', type: 'select', name:'idEmpleadoRealiza', required: true, value:'empleadoRealizaVenta.usuario', options: optionsEmpleados, descripcion: "usuario"},
        {label: 'Empleado (instalación)', type: 'select', name:'idEmpleadoInstala', required: false, value:'empleadoInstala.usuario', options: optionsEmpleados, descripcion: "usuario"},
        {label: 'Fecha de Inicio', type: "date", name:'fechaInicio', required: true, value:'fechaInicio'},
        {label: 'Fecha de Entrega', type: "date", name:'fechaEntrega', required: false, value:'fechaEntrega'}
    ]

    const header =[
        {title: "Id"},
        {title: "Software"},
        {title: "Fecha de Inicio"},
        {title: "Fecha de Entrega"},
        {title: "Empleado"},
        {title: "Acciones"},
    ]

    useEffect(() =>{
        fetch("https://localhost:7180/api/Venta")
        .then((res) => res.json())
        .then((data) => {
            let dataResult = data.filter(item => item.estadoActivo == true).map(
                item => ({
                    id: item.id,
                    productoSoftware: item.productoSoftware.nombreProducto,
                    fechaInicio: item.fechaInicio,
                    fechaEntrega: item.fechaEntrega,
                    empleadoRealizaVenta: item.empleadoRealizaVenta.usuario
                })
            )
            setData(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
    
        fetch("https://localhost:7180/api/Empleado")
        .then((res) => res.json())
        .then((data) => {
            let dataResult = data.filter(d => d.estadoActivo == true);
            setOptionsEmpleados(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
 
        fetch("https://localhost:7180/api/ProductoSoftware")
        .then((res) => res.json())
        .then((data) => {
            let dataResult = data.filter(d => d.estadoActivo == true);
            setOptionsSoftware(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
 

    }, [location.state?.refresh]);


  return (
    <>
        <Container disableGutters sx={{mt:2}}>
            <Routes>
                <Route path="" element={<TableInfo header={header} rowsBody={data}/>}/> 
                <Route path="Details/:id" element={<DetailsPage page="Venta" inputItems={inputItems} pageTitle="Detalle de la venta"/>}/>
                <Route path="Create" element={<Form pageTitle="Nueva venta" page="Venta" inputItems={inputItems}/>}/>
                <Route path="Edit/:id" element={<FormEdit pageTitle="Editar venta" page="Venta" inputItems={inputItems}/>}/>
                <Route path="Delete/:id" element={<Delete pageTitle="Eliminar venta" page="Venta" inputItems={inputItems}/>}/>
            </Routes>
        </Container>
    </>
  )
}

export default Venta