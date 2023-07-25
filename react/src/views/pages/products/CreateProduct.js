import * as React from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../customer/customer.css';

import { useState } from 'react';
import { Config } from '../../../model/config';
import { Grid } from 'rsuite';
import { Outlet, Link } from "react-router-dom";

export default function CreateProduct(props){

  const[name,setName]=useState("");
  const[price,setPrice]=useState("");
  const[description,setDescription]=useState("");
  

  
const handleSubmit=(e)=>{
  
  e.preventDefault();
  
  

  let products={
    name:name,
    price:price,
    description:description,
    
}

fetch(`${Config.baseUrl}/products`,{
method:'POST',
headers:{
  'content-type':'application/x-www-form-urlencoded'
},
body:new URLSearchParams(products).toString(),
})
  .then(respons=> respons.json())
  .then(products=> alert("Product Successfully Added"))
  .then(error=> console.error(error))
  setName("")
  setPrice("")
  setDescription("")
    
}
return(
    <>
    <h3>Create Products</h3>
  <Link to="/manage-products" style={{textDecoration:"none",color:"black"}}>
    <Button id='button_p' variant="contained" disableElevation >
      Manage Products
    </Button>
  </Link>
    <form onSubmit={handleSubmit}>
    
    <Grid
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      
    >
      
       <div id="form" > 
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Name"
          multiline
          maxRows={4}
          onChange={e => setName(e.target.value)}
          style={{width:"70%"}}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Price"
          multiline
          maxRows={4}
          onChange={e => setPrice(e.target.value)}
          style={{width:"70%"}}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          style={{width:"70%"}}
          onChange={e => setDescription(e.target.value)}
        />
        </div>
        
      </div>
      <Stack direction="row" spacing={2}>
        <Button type='submit' variant="outlined" id='button_p'>
         Save
        </Button>
    </Stack>
      </Grid>
      
      </form>
    </>
)
}
 