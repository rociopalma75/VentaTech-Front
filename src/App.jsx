import React from 'react'

import { AuthProvider, useAuth } from './AuthProvider'
import InicioSesion from './pages/Sesion/InicioSesion'
import InicioModulos from './pages/InicioModulos';


function App() {
  const { user } = useAuth();

  return (
      <>
        {
          user ? (
            <InicioModulos/>
          ) : (
            <InicioSesion/>
          )
        }
     </>
  )
}

export default App