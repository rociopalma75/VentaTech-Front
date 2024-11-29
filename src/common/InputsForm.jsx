import React from 'react'
import Grid from '@mui/material/Grid2'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Input } from '@mui/material'

function InputsForm({inputItems, formData, errors, handleChange}) {
  return (
    <>
        {
            inputItems.map((item, index)=>(
              <Grid item alignContent='center' alignItems='center' key={index} size={3}>
                {
                  item.type == 'select' ? (
                  <FormControl fullWidth>
                    <InputLabel>{item.label}</InputLabel>
                    <Select
                      value={formData[item.name] || ''}
                      name={item.name}
                      label={item.label}
                      onChange={handleChange}
                      required={item.required}
                      error={!!errors[item.name]}
                    >
                    {
                      item.options && item.options.map((option) => (
                        <MenuItem key={option.id} value={option.id} >
                          {option[item.descripcion]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors[item.name] ?? errors[item.name]}</FormHelperText>
                  </FormControl>
                  ):(
                  
                  <FormControl sx={{mt:3}}  >
                    <InputLabel>
                    {
                      item.type == "date" ? '' : item.label 
                    }
                    </InputLabel>
                    <Input 
                      fullWidth
                      type={item.type} 
                      name={item.name} 
                      onChange={handleChange} 
                      value={formData[item.name]} 
                      required={item.required}
                      error={!!errors[item.name]}
                    />
                    <FormHelperText>
                    {
                      item.type == "date" && item.label
                    }
                    </FormHelperText>
                    <FormHelperText>{errors[item.name] ?? errors[item.name]}</FormHelperText>
                  </FormControl>
                  )

                }
              </Grid>
            ))
        }
    </>
  )
}

export default InputsForm