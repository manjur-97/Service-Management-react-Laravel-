import * as React from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../customer/customer.css';

import { useState } from 'react';
import { Config } from '../../../model/config';
import { Grid } from 'rsuite';
import { Outlet, Link } from "react-router-dom";



const CreateTechnicians =()=>{

    const[name,setName]=useState("");
  const[mobile,setMobile]=useState("");
  const[email,setEmail]=useState("");
  const[city,setCity]=useState("");
  const[skill,setSkill]=useState("");

  
const handleSubmit=(e)=>{
  
  e.preventDefault();
  
  

  let technician={
    name:name,
    mobile:mobile,
    email:email,
    city:city,
    skill:skill,
}

fetch(`${Config.baseUrl}/technicians`,{
method:'POST',
headers:{
  'content-type':'application/x-www-form-urlencoded'
},
body:new URLSearchParams(technician).toString(),
})
  .then(respons=> respons.json())
  .then(technician=> console.log(technician))
  .then(error=> console.error(error))   
    
}

    return(
    <>
   <h3>Create Technicians</h3>
  <Link to="/manage-technicians" style={{textDecoration:"none",color:"black"}}>
    <Button variant="contained" disableElevation id="button_p">
      Manage Technicians
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
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Mobile"
          multiline
          maxRows={4}
          onChange={e => setMobile(e.target.value)}
          style={{width:"70%"}}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Email"
          multiline
          maxRows={4}
          style={{width:"70%"}}
          onChange={e => setEmail(e.target.value)}
        />
        </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="City"
          multiline
          maxRows={4}
          style={{width:"70%"}}
          onChange={e=> setCity(e.target.value)}
        />
      </div>
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Skill"
          multiline
          maxRows={4}
          style={{width:"70%"}}
          onChange={e=> setSkill(e.target.value)}
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
export default CreateTechnicians;