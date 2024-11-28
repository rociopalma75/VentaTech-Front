import { Divider, Typography, Button, Modal, Box } from '@mui/material';
import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid2'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Details from './Details';

function Delete({pageTitle, page, inputItems}) {
  const { id } = useParams();
  const [modal, setModal] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #0000',
    boxShadow: 24,
    p: 4,
  };

  const handleModal = (stateBool) =>{
    setModal(stateBool);
  }

  const handleBack = () => {
    navigate('../');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://localhost:7180/api/${page}/${id}`;

    const options = {
      method: 'DELETE',
      header:{
        'Content-Type':'application/json',
      }
    }

    try{
      const response = await fetch(url, options)
      
      if(response.ok){
        console.log(response);
        enqueueSnackbar(`${page} se elimino exitosamente`, {variant:"success"});
        
        setTimeout(()=>{
          navigate("../", { state: { refresh: Date.now() } });
        }, 1000);

      }else{
        console.error(response);
        enqueueSnackbar("Ocurrio un error, no se pudo realizar la operación", {variant:"success"});
      }
    }
    catch(error){
      console.log("Error al hacer el DELETE: ", error);
    }
  }

  return (
    <>
      <Typography sx={{mb:2}} variant='h5'>{pageTitle}</Typography>  
      <Divider></Divider>
      <Details page={page} inputItems={inputItems}/>
      <Grid container size={10} spacing={3} justifyContent='center'>
        <Button variant='contained' onClick={handleBack}>Volver</Button>
        <Button variant='contained' onClick={()=>handleModal(true)}>Eliminar</Button>
      </Grid>
      <Modal open={modal}>
      <Box sx={style} component='form' onSubmit={handleSubmit} >
        <Typography variant="h6" component="h2">
          {pageTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center'>
          ¿Está seguro que desea eliminar el {page.toLowerCase()} con ID {id}? 
        </Typography>
        <Grid container justifyContent='space-between' sx={{mt:2}}>
          <Button variant='contained' color='warning' sx={{width:'40%'}} onClick={() => handleModal(false)}>Cancelar</Button>
          <Button variant='contained' color='error' sx={{width:'40%'}} type='submit'>Confirmar</Button>
        </Grid>
      </Box>
      </Modal>
    </>
  )
}

export default Delete