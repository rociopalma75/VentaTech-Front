import React , {useEffect} from 'react'
import { Container } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import TableInfo from '../common/TableInfo';
import Form from '../common/Form';
import DetailsPage from './DetailsPage';
import FormEdit from '../common/FormEdit';
import Delete from '../common/Delete';

function Proveedores() {
  const [data, setData] = React.useState([]);
  const location = useLocation();
  const [optionsRanking, setOptionsRanking] = React.useState([]);

  const inputItems = [
    {label: 'Razon Social', type: 'text', name:'razonSocial', required: true, value:'razonSocial'},
    {label: 'Cuit', type:'number', name:'cuit', required: true, value:'cuit'},
    {label: 'Mail', type:'email', name:'email', required: true, value:'email'},
    {label: 'Teléfono', type:'number', name:'telefono', required: true, value:'telefono'},
    {label: 'Dirección', type: 'text', name:'direccion', required: true, value:'direccion'},
    {label: 'Ranking', type:'select', name:'idRanking', required: true, value:'ranking.descripcion', options: optionsRanking, descripcion: 'descripcion'}
  ];

  const header = [
    { title: "Id"},
    { title: "Razón social"},
    { title: "Cuit"},
    { title: "Teléfono"},
    { title: "Ranking"},
    { title: "Acciones"}
  ];

  useEffect(() => {
    fetch("https://localhost:7180/api/Proveedor")
    .then((res) => res.json())
    .then((data) => {
      let dataResult = data.filter(item => item.estadoActivo == true).map(
        item =>({
          id: item.id,
          razonSocial: item.razonSocial,
          cuit: item.cuit,
          telefono: item.telefono,
          ranking: item.ranking.calificacion
        }));
      
        setData(dataResult);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

    fetch("https://localhost:7180/api/DetalleRanking")
    .then((res) => res.json())
    .then((data) => {
      setOptionsRanking(data);
    })
    .catch((error) => console.error("Error al obtener los datos: ", error));

  },[location.state?.refresh])

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
          <Routes>
            <Route path="" element={<TableInfo header={header} rowsBody={data} />}/>
            <Route path="Details/:id" element={<DetailsPage pageTitle="Detalle del proveedor" page="Proveedor" inputItems={inputItems}/>}/>
            <Route path="Create" element={<Form pageTitle="Nuevo proveedor" page="Proveedor" inputItems={inputItems}/>} />
            <Route path="Edit/:id" element={<FormEdit pageTitle="Editar proveedor" page="Proveedor" inputItems={inputItems}/>}/>
            <Route path='Delete/:id' element={<Delete pageTitle="Eliminar proveedor" page="Proveedor" inputItems={inputItems} />} />
          </Routes>
        </Container>
    </>
  )
}

export default Proveedores