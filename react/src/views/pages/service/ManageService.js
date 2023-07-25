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



const ManageService=()=> {

  let navigate=useNavigate();

      const[error,setError]=useState(null);
      const[isLoaded,setIsLoaded]=useState(false);
      const[services,setServices]=useState([]);

      useEffect(()=>{
        fetchServices();
        
      },[]);

      function fetchServices(){
        fetch(`${Config.baseUrl}/services`)
        .then((res)=>res.json())
        .then((result)=>{
          
          setIsLoaded(true);
          console.log(result);
          setServices(result);
          console.log(services);
        }).catch((arr)=>{
          setError(arr);
        });
      }

      const handleEdit=(id)=>{
        navigate(`/edit-services/${id}`);
      }

      const handleDelete=(id)=>{
        const confirmed = window.confirm("Are you sure?");
      if((confirmed)){
        fetch(`${Config.baseUrl}/services/${id}`, {
          method: 'DELETE',
         
        
        })
      
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(services => {
          //console.log(data);
          fetchServices();

        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
  }

      if(error) return <div>Error:{error.massege}</div>
      if(!isLoaded) return <div>Loaded</div>

  return (
   <>
   <h3>Manage Service</h3>
   <Link to="/Create-services" style={{textDecoration:"none",color:"black"}}>
    <Button variant="contained" disableElevation id="button_p">
      Create Service
    </Button>
    </Link>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
           
            <StyledTableCell >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <StyledTableRow key={service.id}>

              <StyledTableCell component="th" scope="row">
                {service.id}
              </StyledTableCell>
              <StyledTableCell >{service.name}</StyledTableCell>
              
              <StyledTableCell >
          

            <IconButton onClick={()=>handleDelete(service.id)} style={{color:"red"}} aria-label="delete" size="large">
              <DeleteIcon />
              </IconButton>
            <IconButton onClick={()=>handleEdit(service.id)} style={{color:"black"}} aria-label="edit" size="large">
              <EditIcon />
              </IconButton>
           
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
};

export default ManageService;