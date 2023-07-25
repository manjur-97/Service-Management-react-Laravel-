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

import { useState, useEffect } from 'react';
import { Config } from '../../../model/config';
import { useNavigate, Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




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



const ManageCustomer = () => {

  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();

  }, []);

  function fetchCustomers() {
    fetch(`${Config.baseUrl}/customers`)
      .then((res) => res.json())
      .then((result) => {

        setIsLoaded(true);
        console.log(result);
        setCustomers(result);
        console.log(customers);
      }).catch((arr) => {
        setError(arr);
      });
  }

  const handleEdit = (id) => {
    navigate(`/edit-customer/${id}`);
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if ((confirm)) {

      fetch(`${Config.baseUrl}/customers/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(customers => {
          //console.log(data);
          fetchCustomers();

        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }

  if (error) return <div>Error:{error.massege}</div>
  if (!isLoaded) return <div>Loaded</div>

  return (
    <>

      <h3>Manage Customer</h3>
      <Link to="/create-customer" style={{ textDecoration: "none", color: "black" }}>
        <Button id='button_p' variant="contained" disableElevation >
          Create Customer
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >Mobile</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
             
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <StyledTableRow key={customer.id}>

                <StyledTableCell component="th" scope="row">
                  {customer.id}
                </StyledTableCell>
                <StyledTableCell >{customer.name}</StyledTableCell>
                <StyledTableCell >{customer.mobile}</StyledTableCell>
                <StyledTableCell >{customer.email}</StyledTableCell>
              
                <StyledTableCell >

                  <IconButton onClick={() => handleDelete(customer.id)} style={{ color: "red" }} aria-label="delete" size="large">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(customer.id)} style={{ color: "black" }} aria-label="edit" size="large">
                    <EditIcon />
                  </IconButton>


                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <Stack>
       
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};

export default ManageCustomer;