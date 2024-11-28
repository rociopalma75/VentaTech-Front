import React, { useState } from 'react'
import { Typography, Divider , Button, Fab} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSnackbar } from 'notistack';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useNavigate } from 'react-router-dom';
import InputsForm from './inputsForm';

function Form({pageTitle,page, inputItems}) {
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    inputItems.reduce((acc, item) =>{
      acc[item.name] = '';
      return acc;
    }, {})
  );

  const handleBack = () =>{
    navigate("../")
  }
  const handleChange = (event) =>{
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const url = `https://localhost:7180/api/${page}`;
    
    console.log(formData);
    const options = {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    };

    console.log("Enviando peticion");

    try{
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        console.log('Success:', result);
        enqueueSnackbar(`${page} creado exitosamente`, {variant:"success"});

        setTimeout(() => {
          navigate("../", { state: {refresh: Date.now()}});
        }, 1000);

      } else {
        console.error(result);
        const errorsResult = Object.entries(result.errors).reduce((acc, item) =>{
          const [prop, value] = item;
          inputItems.map(input => {
            if(input.name.toLowerCase() == prop.toLowerCase()){
               acc[input.name] = value[0]; 
            }
          })
          return acc;
        },{})
        console.log(errorsResult);
        setErrors(errorsResult);
        enqueueSnackbar(`Ingreso datos incorrectos`, {variant:"error"});
      } 

    }catch(error)
    {
      console.error("Error al hacer el POST: ", error);
    }
  }

  return (
    <>
        <Typography sx={{mb:2}} variant='h5'>{pageTitle}</Typography>
        <Divider></Divider>
        <Grid container spacing={2} sx={{mt:4}} component='form' onSubmit={handleSubmit} >
          <InputsForm inputItems={inputItems} formData={formData} handleChange={handleChange} errors={errors}/>
          <Grid container size={10} flexDirection='row' justifyContent='center' alignContent='center'>
            <Button sx={{mt:6}} type='submit' variant='contained'>Registrar</Button>  
          </Grid>
        </Grid>
        <Fab variant="extended" sx={{position:'absolute', top:'10px', left:'90%'}} onClick={handleBack}>
          <NavigationIcon sx={{ mr: 1 }} />
          Volver
        </Fab>
    </>
  )
}

export default Form