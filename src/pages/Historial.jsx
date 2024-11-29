import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState , useEffect} from 'react'
import {  useLocation } from 'react-router-dom';

import {format} from 'date-fns';

function Historial() {
    const [data, setData] = useState([]);
    const location = useLocation();

    const [page, setPage] = useState(0);  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page
    // Handle page change
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    // Handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);  // Reset the table to the first page whenever rows per page changes
    };

    const header = [
        {title: "Id"},
        {title: "Acción"},
        {title: "Fecha y Hora"}
    ];

    useEffect(() => {
        fetch("https://localhost:7180/api/Historial")
        .then((res) => res.json())
        .then((data) => {
          let dataResult = data.map(item=>({
            id: item.id,
            accion: item.accion,
            fechaHora: format(new Date(item.fechaHora), 'dd/MM/yyyy HH:mm:ss')
          }))
          
          console.log(dataResult);
          setData(dataResult);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
      },[location.state?.refresh]);

  return (
    <>
        <Container disableGutters sx={{mt:2}}>
          <TableContainer sx={{mt:2}} >
          <Table>
              <TableHead>
                  <TableRow>
                      {header.map(item=>(
                          <TableCell key={item.title}>{item.title}</TableCell>
                      ))} 
                  </TableRow>
              </TableHead>
              <TableBody>
                  {
                      data
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, idx) => (
                              <TableCell key={idx}>{value}</TableCell>
                            ))}
                          </TableRow>))
                  }
              </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 6]}  // Options for rows per page
          />
        </TableContainer>
        </Container>
    </>
  )
}

export default Historial