import React from 'react'
import Grid  from '@mui/material/Grid2'
import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import logoInicio from '../../assets/logoInicio.png'
import Login from './Login'
import Registrar from './Registrar'

function InicioSesion() {
  return (
    <>
        <Grid container sx={{minHeight:'100vh'}}>
            <Grid bgcolor='#0b1320' color='white' alignContent='center' textAlign='center'  size={9}>
            <Typography variant='h1'>Bienvenido</Typography>
            <Typography variant='h3'>VentaTech</Typography>
            <img src={logoInicio} style={{width:'250px', position: 'absolute', top:10,left:'30%' , padding:0}}/>
            </Grid>
            <Grid size={3} alignContent="center">
                <Routes>
                    <Route path='' element={<Login/>}/>
                    <Route path='/Register' element={<Registrar/>}/>
                </Routes>
            </Grid>

        </Grid>
    </>
  )
}

export default InicioSesion