
import React, { useState } from 'react'
import { Container, FormControl, FormHelperText, Input, InputLabel, Button, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import { NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../../AuthProvider';

function Login() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        correo:'',
        clave:''
    });

    const { login } = useAuth(); 

    const inputItems = [
        {label:'Correo', type:'text', name:'correo', required:true,value:'correo'},
        {label:'Clave', type:'password', name:'clave', required:true, value:'clave'}
    ];

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "https://localhost:7180/api/Empleado/LogIn";

        console.log(formData);
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        }

        try{
            const response = await fetch(url, options);
            const result = await response.json();

            if(response.ok){
                console.log("Success. ", result);
                enqueueSnackbar("Se inicio sesión correctamente", {variant:"success"});
                
                login(formData);

                navigate("/Clientes");
            }else{
                console.error(result);
                const errorsResult = Object.entries(result.errors).reduce((acc, item) => {
                    const [prop, value] = item;
                    inputItems.map(input => {
                        if(input.name.toLowerCase() == prop.toLowerCase()){
                            acc[input.name] = value[0];
                        }

                    })
                    return acc;
                },{});
                console.log(errorsResult);
                setErrors(errorsResult);
                enqueueSnackbar("Ingreso email/clave incorrecta", {variant:"error"});
            }
        }catch(error){
            console.error("Error al hacer el login: ", error);
            enqueueSnackbar("Ingreso email/clave incorrecta", {variant:"error"});
        }
    }

  return (
    <>
        <Container>
            <Typography align='center' sx={{mb:10}} variant='h4'>Iniciar Sesión</Typography>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} component='form' onSubmit={handleSubmit}>
                {
                    inputItems.map((item, index) => (
                        <Grid item key={index}>
                            <FormControl>
                                <InputLabel>{item.label}</InputLabel>
                                <Input 
                                    type={item.type}
                                    name={item.name}
                                    onChange={handleChange}
                                    value={formData[item.name]}
                                    required={item.required}
                                    error={!!errors[item.name]}
                                />
                                <FormHelperText>
                                    {errors[item.name] ?? errors[item.name]}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    ))
                } 

                <Grid container justifyContent="space-between" alignContent="center">
                    <Button type='submit'>Iniciar Sesión</Button>
                    <Button component={NavLink} to={"Register"}>Registrar</Button>
                </Grid>
            </Grid>

        </Container>
    </>
  )
}

export default Login