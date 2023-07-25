import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

import {useState,useEffect} from 'react';
import { Config } from '../../../model/config';
import { useNavigate,Link  } from "react-router-dom";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00A064",
    color: theme.palette.common.white,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
   
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const ManageTechnicians =()=>{

    let navigate=useNavigate();

      const[error,setError]=useState(null);
      const[isLoaded,setIsLoaded]=useState(false);
      const[technicians,setTechnicians]=useState([]);

      useEffect(()=>{
        fetchTechnicians();
        
      },[]);

      function fetchTechnicians(){
        fetch(`${Config.baseUrl}/technicians`)
        .then((res)=>res.json())
        .then((result)=>{
          
          setIsLoaded(true);
          console.log(result);
          setTechnicians(result);
          console.log(technicians);
        }).catch((arr)=>{
          setError(arr);
        });
      }

      const handleEdit=(id)=>{
        navigate(`/edit-technicians/${id}`);
      }

      const handleDelete=(id)=>{
           const technician=window.confirm("Are you sure?");
           if(technician){

           
        fetch(`${Config.baseUrl}/technicians/${id}`, {
          method: 'DELETE',
         
        
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(technicians => {
          //console.log(data);
          fetchTechnicians();

        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
  }

      if(error) return <div>Error:{error.massege}</div>
      if(!isLoaded) return <div>Loaded</div>

    return(
    <>
    <h3>Manage Technicians</h3>
   <Link to="/Create-technicians" style={{textDecoration:"none",color:"black"}}>
    <Button id="button_p" variant="contained" disableElevation >
      Create Technicians
    </Button>
    </Link>
    <TableContainer component={Paper}>
      <Table aria-label="customized table" style={{width:"100%"}}>
        <TableHead >
          <TableRow >
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Mobile</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell >City</StyledTableCell>
            <StyledTableCell >Skill</StyledTableCell>


            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {technicians.map((technician) => (
            <StyledTableRow key={technician.id}>

              <StyledTableCell component="th" scope="row">
                {technician.id}
              </StyledTableCell>
              <StyledTableCell >{technician.name}</StyledTableCell>
              <StyledTableCell >{technician.mobile}</StyledTableCell>
              <StyledTableCell >{technician.email}</StyledTableCell>
              <StyledTableCell >{technician.city}</StyledTableCell>
              <StyledTableCell >{technician.skill}</StyledTableCell>
              
              <StyledTableCell >

          

            <IconButton onClick={()=>handleDelete(technician.id)} style={{color:"red"}} aria-label="delete" size="large">
              <DeleteIcon />
              </IconButton>
            <IconButton onClick={()=>handleEdit(technician.id)} style={{color:"black"}} aria-label="edit" size="large">
              <EditIcon />
              </IconButton>
            

              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
)
}
export default ManageTechnicians;