import React from 'react'
import { Breadcrumbs, Link } from '@mui/material'
import { useLocation } from 'react-router-dom'

function BreadcrumbsNav() {
  const location = useLocation();
  const path = location.pathname.replaceAll("/"," / ");

  return (
    <Breadcrumbs separator='>'>
        <Link color='inherit' sx={{textDecorationLine:"none"}}>
            {path}
        </Link>
    </Breadcrumbs>
  )
}

export default BreadcrumbsNav  