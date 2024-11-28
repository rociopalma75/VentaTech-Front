import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Button, TablePagination } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

function TableInfo({header, rowsBody}) {
  const [page, setPage] = useState(0);  // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page
  const location = useLocation();
  const path = location.pathname;
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset the table to the first page whenever rows per page changes
  };

  return (
    <>
    {
      path != "/RRHH" && (
      <Button component = {NavLink} to={"Create"} startIcon={<AddCircleIcon/>} sx={{mt:2}}>Crear</Button> )
    }
    
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
                    rowsBody
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                        <TableRow key={index}>
                          {Object.values(row).map((value, idx) => (
                            <TableCell key={idx}>{value}</TableCell>
                          ))}
                            <TableCell>
                              <Button component={NavLink} to={`Details/${row.id}`} >{<VisibilityIcon/>}</Button>
                              <Button component={NavLink} to={`Edit/${row.id}`} >{<ModeEditOutlineIcon/>}</Button>
                              <Button component={NavLink} to={`Delete/${row.id}`}>{<DeleteIcon/>}</Button>  
                            </TableCell>
                        </TableRow>))
                }
            </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={rowsBody.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 6]}  // Options for rows per page
        />
    </TableContainer>
    </>
  )
}

export default TableInfo    