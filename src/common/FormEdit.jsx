import React, { useEffect , useState} from 'react'
import { Typography, Divider, Button, Fab} from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import NavigationIcon from '@mui/icons-material/Navigation';
import InputsForm from './inputsForm';

function FormEdit({pageTitle, page, inputItems}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = useState(
    inputItems.reduce((acc, item) =>{
      acc[item.name] = '';
      return acc;
    }, {})
  );

  const handleChange = (event) =>{
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleBack = () =>{
    navigate("../");
  }

  useEffect(() =>{
    fetch(`https://localhost:7180/api/${page}/${id}`)
    .then((res) => res.json())
    .then((data) =>{
      let dataResult = {};

      inputItems.forEach((item) =>{
        if(item.value.includes('.')){
          const keys = item.value.split('.');
          dataResult[item.name] = data[keys[0]]['id'];
        }else{
          dataResult[item.name] = data[item.name]
        }
      });
      setFormData(dataResult);
    })
    .catch((error) => console.error('Error al obtener los datos:', error));
  },[])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://localhost:7180/api/${page}/${id}`;
    console.log(formData);
    
    const options = {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    };

    try{
      const response = await fetch(url, options);
      const result = await response.json();

      if(response.ok){
        enqueueSnackbar(`${page} actualizado exitosamente`, {variant:"success"});

        setTimeout(() => {
          navigate("../", {state: {refresh:Date.now()}});
        },1000)

      }else{
        const errorsResult = Object.entries(result.errors).reduce((acc, item) =>{
          const [prop, value] = item;
          inputItems.map(input => {
            if(input.name.toLowerCase() == prop.toLowerCase()){
               acc[input.name] = value[0]; 
            }
          })
          return acc;
        },{})
        setErrors(errorsResult);
        enqueueSnackbar(`Ingreso datos incorrectos`, {variant:'error'});
      }
    }
    catch(error){
      console.error("Error al hacer el PUT: ", error);
    }
  }

  return (
    <>
        <Typography sx={{mb:2}} variant='h5'>{pageTitle}</Typography>
        <Divider></Divider>
        <Grid container spacing={5} sx={{mt:4}} component='form' onSubmit={handleSubmit}>
          <InputsForm inputItems={inputItems} formData={formData} errors={errors} handleChange={handleChange}/>
          <Grid container size={10} justifyContent='center'>
            <Button sx={{mt:6}} type='submit' variant='contained'>Actualizar</Button>
          </Grid>
        </Grid>
        <Fab variant="extended" sx={{position:'absolute', top:'10px', left:'90%'}} onClick={handleBack}>
          <NavigationIcon sx={{ mr: 1 }} />
          Volver
        </Fab>
    </>
  )
}

export default FormEdit 