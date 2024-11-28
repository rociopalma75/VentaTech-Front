import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Stack} from '@mui/material';
import Grid from '@mui/material/Grid2';


function Details({page, inputItems }) {
    const { id } = useParams();
    const [entidad, setEntidad] = React.useState({});

    useEffect(() => {
        fetch(`https://localhost:7180/api/${page}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                let dataResult = {};
                inputItems.forEach((item) => {
                    if(item.value.includes('.')){
                        const keys = item.value.split('.');
                        let valor = data;

                        keys.forEach((key) => {
                            if (valor) valor = valor[key];
                        });

                        dataResult[item.name] = valor;
                    }else{
                        dataResult[item.name] = data[item.value];
                    }
                })
                setEntidad(dataResult);
            })
            .catch((error) => console.error('Error al obtener los datos: ', error));
    }, []);

    return (
        <>
            <Grid container size={10} direction='column' spacing={2} sx={{ mt: 4, mb:4 }} >
                {
                    inputItems.map((item, index) => (
                        <Stack key={index} direction='row'  alignContent='center' height={30} spacing={2}>
                            <Grid item width={'50%'} alignContent='center' textAlign='end'>{item.label}</Grid>
                            <Grid item width={'50%'} alignContent='center'>{entidad[item.name] || ' '}</Grid>
                        </Stack>
                    ))
                }
            </Grid>
        </>
    )
}

export default Details