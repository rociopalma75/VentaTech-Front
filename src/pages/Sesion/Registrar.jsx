import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Form from '../../common/Form';

function Registrar() {
    const [optionsDeptos, setOptionsDeptos] = useState([]);

    const inputItems = [
        {label: 'Nombre', type: 'text', name:'nombre', required: true, value:'nombre'},
        {label: 'Apellido', type: 'text', name: 'apellido', required: true, value:'apellido'},
        {label: 'Fecha de Nacimiento', type: 'date', name: 'fechaNacimiento', required: true, value:'fechaNacimiento'},
        {label: 'Cuil', type:'number', name:'cuil', required: true, value:'cuil'},
        {label: 'DNI', type:'number', name:'dni', required: true, value:'dni'},
        {label: 'Dirección', type: 'text', name:'direccion', required: true, value:'direccion'},
        {label: 'Fecha de Contratación', type: 'date', name: 'fechaContratacion', required: true, value:'fechaContratacion'},
        {label: 'Departamento', type:'select', name:'idDepto', required: true, value:'departamento.nombreDepto', options: optionsDeptos, descripcion: 'nombreDepto'},
        {label: 'Usuario', type: 'text', name: 'usuario', required: true, value:'usuario'},
        {label: 'Mail', type:'text', name:'correo', required: true, value:'correo'},
        {label: 'Clave', type:'password', name:'hashClave', required: true, value:'hashClave'},
    ];

    useEffect(()=>{   
        fetch("https://localhost:7180/api/Departamento")
        .then((res) => res.json())
        .then((data) => {
          setOptionsDeptos(data);
        })
        .catch((error) => console.error("Error al obtener los datos: ", error));
    
      }, []);
    
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #0000',
        boxShadow: 24,
        p: 4,
      };
    

  return (
    <>
        <Box sx={style}>
            <Form pageTitle="Nuevo empleado" page="Empleado/SignIn" inputItems={inputItems}/>
        </Box>
    </>
  )
}

export default Registrar