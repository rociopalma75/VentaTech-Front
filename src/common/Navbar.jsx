import React from 'react'
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Container, Tooltip, Button, ImageList, ImageListItem} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { NavLink } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StarBorder from '@mui/icons-material/StarBorder';
import WebIcon from '@mui/icons-material/Web';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import BadgeIcon from '@mui/icons-material/Badge';
import SellIcon from '@mui/icons-material/Sell';
import logoVentaTech from '../assets/logoVentaTech.png'

function Navbar() {

    const navLinks = [
        { title:"Clientes", path:"/Clientes", icon: <GroupIcon/> },
        { title:"Proveedores", path:"/Proveedores", icon: <StarBorder/> },
        { title:"Servicios", path:"/Servicios", icon: <ElectricalServicesIcon/> },
        { title:"Productos", path:"/Productos", icon: <WebIcon/> },
        { title:"Recursos Humanos", path:"/RRHH", icon: <BadgeIcon/> },
        { title:"Interacciones", path:"/Interacciones", icon: <QuestionAnswerIcon/> },
        { title:"Ventas", path:"/Ventas", icon: <SellIcon/> }
    ]

    const navLinksOperador = [
        { title:"Clientes", path:"/Clientes", icon: <GroupIcon/> },
        { title:"Proveedores", path:"/Proveedores", icon: <StarBorder/> },
        { title:"Servicios", path:"/Servicios", icon: <ElectricalServicesIcon/> },
        { title:"Productos", path:"/Productos", icon: <WebIcon/> },
        { title:"Interacciones", path:"/Interacciones", icon: <QuestionAnswerIcon/> }
    ]

    const navLinksAdmin = [
        { title:"Recursos Humanos", path:"/RRHH", icon: <BadgeIcon/> }
    ]

  return (
    <>
        <Grid 
        container 
        direction="column" 
        justifyContent="space-between" 
        sx={{ minHeight: '100vh', ml: 3 }}>
        
        <img src={logoVentaTech} style={{width:'180px', position: 'absolute', top:10, left:'70px', margin:0, padding:0}}/>
        
        <Grid item sx={{position:'absolute', top:'200px'}}>
            {navLinks
            .map(item => (
                <List key={item.title}>
                    <ListItem disablePadding sx={{pl:2, pr:2}}>
                        <ListItemButton component = {NavLink} to={item.path} 
                        sx={{p:0, pl:2, pr:2,
                            '&:hover': {
                                backgroundColor: 'primary.main', 
                                borderRadius: '10px',
                                color: 'secondary.white', 
                                '& .MuiListItemIcon-root': { 
                                    color: 'secondary.white', 
                                  },
                            },
                            '&.active': {
                                backgroundColor: 'primary.main', 
                                borderRadius: '10px',
                                color: 'secondary.white', 
                                '& .MuiListItemIcon-root': { 
                                    color: 'secondary.white', 
                                  },
                            },
          
                        }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                </List>
            ))}
        </Grid>

        <Grid item sx={{mb:2, ml:3, position:'absolute', bottom:'5px'}}>
            <Grid container spacing={4} >
                <Button>Registros</Button>
                <Button>Cerrar Sesion</Button>
            </Grid>
        </Grid>
    </Grid>

    </>
  )
}

export default Navbar