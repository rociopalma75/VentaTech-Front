import { useState } from 'react'
import { Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Navbar from './common/Navbar'
import { Routes, Route } from 'react-router-dom'
import BreadcrumbsNav from './common/BreadcrumbsNav'
import {Clientes, Proveedores, Rrhh, Productos, Servicios, Interacciones, Venta} from './pages/index'

function App() {
  return (
    <>
      <Container maxWidth='xl' disableGutters sx={{pr:5}}>
        <Grid container >
          <Grid size={3}>
              <Navbar/>
          </Grid>
          <Grid size={9} sx={{mt:2, pl:2}} >
              <BreadcrumbsNav/>
              <Routes>
                <Route path='/Productos/*' element ={<Productos/>}/>
                <Route path='/Proveedores/*' element ={<Proveedores/>}/>
                <Route path='/RRHH/*' element ={<Rrhh/>}/>
                <Route path='/Clientes/*' element ={<Clientes/>}/>
                <Route path='/Servicios/*' element ={<Servicios/>}/>
                <Route path='/Interacciones/*' element={<Interacciones/>}/>
                <Route path='/Ventas/*' element={<Venta/>}/>
              </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default App
