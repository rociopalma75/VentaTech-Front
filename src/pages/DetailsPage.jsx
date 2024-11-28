import { Divider, Typography, Button} from '@mui/material';
import React from 'react';
import Details from '../common/Details';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';


function DetailsPage({pageTitle,page,inputItems}) {
    const navigate = useNavigate();

    const handleDirection = () =>{
        navigate(`../`);
    }
      

  return (
    <>
        <Typography sx={{mb:2}} variant='h5'>{pageTitle}</Typography>
        <Divider/>
        <Details page={page} inputItems={inputItems}/>
        <Grid container size={10} justifyContent='center'>
            <Button variant='contained' color='inherit' onClick={handleDirection}>Volver</Button>
        </Grid>
    </>
  )
}

export default DetailsPage  