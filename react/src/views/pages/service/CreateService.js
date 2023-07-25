import * as React from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../customer/customer.css';

import { useState } from 'react';
import { Config } from '../../../model/config';
import { Grid } from 'rsuite';
import { Outlet, Link } from "react-router-dom";






export default function CreateService(props){

  

  const[name,setName]=useState("");
  
const handleSubmit=(e)=>{
  
  e.preventDefault();
  let services={
    name:name,
    
}


fetch(`${Config.baseUrl}/services`,{
method:'POST',
headers:{
  'content-type':'application/x-www-form-urlencoded'
},
body:new URLSearchParams(services).toString(),

})
  .then(respons=> respons.json())

  .then(services=>alert("success"))
  .then(error=> console.error(error))   
    

};
return(
    <>
    
    <h3>Create Service</h3>
    
  <Link to="/manage-services" style={{textDecoration:"none",color:"black"}}>
    <Button variant="contained" disableElevation id="button_p">
      Manage Service
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
      
       <div id="form"> 
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
      
        
      </div>
      <Stack direction="row" spacing={2}>
        <Button type='submit' variant="outlined" id="button_p">
         Save
        </Button>
    </Stack>
      </Grid>
      
      </form>
      
    
    </>
)
}
 