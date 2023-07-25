
import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Config } from '../../../model/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import {useState,useEffect} from 'react';



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


//To get the data from MYData
    const getLocalItmes=()=>{
let data=localStorage.getItem('myData');
console.log(data);
if(data){
  return JSON.parse (localStorage.getItem('myData'));
}else{
  return [];
}
    }


const CreateOrderRecord = () => {

  

  const [data, setData] = useState(getLocalItmes());
  
  const [showForm, setShowForm] = useState(false);

  const [product, setProduct] = useState('');
  const [repair, setRepair] = useState('');
  const [price, setPrice] = useState(0);
  const [qty,setQty]=useState(0);
  
  const [total,setTotal]=useState(0);
  const [customer_id,setCustomer_id]=useState('');
  const [remark,setRemark]=useState('');
  const [order_id,setOrder_id]=useState('');
  

  // for auto set data
  const currentDate = new Date().toISOString().substr(0, 10);
  const [date, setDate] = useState(currentDate);



// local storage data save

useEffect(() => {
  localStorage.setItem('myData',JSON.stringify(data));

}, [data]);







// data transfire

  const handleSubmit=(e)=>{
    e.preventDefault();

    // console.log(customer_id);
    // console.log(date);
    // console.log(remark);
    
  
    

    let record={
      customer_id:customer_id,
      delivery_date:date,
      order_total:total,
      remark:remark
    }
    fetch(`${Config.baseUrl}/record`,{
      method:'POST',
      headers:{
        'content-type':'application/x-www-form-urlencoded'
      },
      body:new URLSearchParams(record).toString(),
      })
        .then(respons=> respons.json())
        .then(record=> console.log(record))
        .then(error=> console.error(error))

        let details
        {data.map((item) => (
          details={
          order_record_id:order_id,
          product:item.product,
          repair:item.repair,
          price:item.price,
          qty:item.qty
           }
          

        ))}
        
        fetch(`${Config.baseUrl}/recorddetails`,{
          method:'POST',
          headers:{
            'content-type':'application/x-www-form-urlencoded'
          },
          body:new URLSearchParams(details).toString(),
          })
            .then(respons=> respons.json())
            .then(details=> console.log(details))
            .then(error=> console.error(error))  
          }
  
          //for remove data
          const handleRemove = (index) => {
            const newItems = [...data];
            newItems.splice(index, 1);
            setData(newItems);
            localStorage.setData('myData', JSON.stringify(newItems));
          };

          //for get total
          function updateTotal() {
            setTotal(price * qty);
          }
//for add new data in row 
  const handleAddRow = () => {
    
    
    setData([...data, { product, repair, price,qty }]);
    setShowForm(false);
    setProduct('');
    setRepair('');
    setPrice('');
    setQty('');
    updateTotal();
  };

  // for dropdawn

  const[error,setError]=useState(null);
     
      const[customers,setCustomers]=useState([]);

      // const handleChange = (event) => {
      //   setCustomers(event.target.customer.id);
      // };
      useEffect(()=>{
        fetchCustomers();
        
      },[]);

      function fetchCustomers(){
        fetch(`${Config.baseUrl}/customers`)
        .then((res)=>res.json())
        .then((result)=>{
          
         
        
          setCustomers(result);
          
        }).catch((arr)=>{
          setError(arr);
        });
      }

      


  return (
    
    <>
    <div style={{ border:"3px solid #00A064",  boxShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 12px' ,borderRadius:"7px"}}>
      <div style={{ display: "flex", justifyContent: "space-around" , paddingTop:"50px"}}>
        <div>
          <span><b>Elrctro Service </b></span><br />
          <span>Mobile:01518389862</span><br />
          <span>Email:kazi@gmail.com</span><br />
          <span>Address:Dhanmondi</span><br />
        </div>

        <div style={{ marginLeft: "20px" }}>
        <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native"><b>Customer</b></InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
         
          onChange={e => setCustomer_id(e.target.value)}
          input={<BootstrapInput />}
        >
            {customers.map((customer) => (
            <MenuItem
              key={customer.id}
              value={customer.id}
              
            >
              {customer.name}
            </MenuItem>
          ))}
      
         
        </Select>
      </FormControl>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex" }}>
            <div><b>Order ID</b></div>
            <div>
              <input type="text" className="form-control" value={order_id} onChange={e => setOrder_id(e.target.value)} style={{ width: "60%", marginLeft: "30px" }} Controlid="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div><b>Delivery D</b></div>
            <div>
              <input type="date" id='date' name='date' value={date} onChange={e => setDate(e.target.value)} className="form-control" style={{ width: "80%", marginLeft: "15px" }} Controlid="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "50px" }}>

      </div>
      <Table striped bordered hover size="sm" >
        <thead style={{ backgroundColor: "#00A064", textAlign: "center",color:"black"}}>
          <tr>

            <th>SN</th>
            <th>Product</th>
            <th>Repair</th>
            <th>Price</th>
            <th>Qty</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody >
        
          <tr >
            <td></td>
            <td><Form.Control type="text" value={product} onChange={e => setProduct(e.target.value)} /></td>
            <td><Form.Control type="text" value={repair} onChange={e => setRepair(e.target.value)} /></td>
            <td><Form.Control type="text" value={price} onChange={e => setPrice(e.target.value)}/></td>
            <td><Form.Control type="text" value={qty} onChange={e => setQty(e.target.value)}/></td>
            
            <td><Button variant="light" onClick={handleAddRow}><b>+</b></Button>{' '}</td>
            
          </tr>
          
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.product}</td>
              <td>{row.repair}</td>
              <td>{row.price}</td>
              <td>{row.qty}</td>
              
              
              <td> <button onClick={() => handleRemove(index)} style={{marginLeft:"5%",color:"white",backgroundColor:"#00A064",border:"none",borderRadius:"3px",width:"30px"}}>-</button></td>
            </tr>
          ))}
        
        </tbody>
      </Table>

      <div style={{display:"flex",flexDirection:"column",marginLeft:"60%",marginTop:"80px"}}>
        
        &nbsp;
        <div>
          <b>Total:</b>
          <span style={{marginLeft:"100px"}}>{total}</span>
        </div>
        </div>

      <div style={{ display: "flex", width: "100%", padding: "20px"}}>
        <div style={{ marginTop: "100px", width: "200px" }}>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Remark"

          >
            <Form.Control as="textarea" onChange={e => setRemark(e.target.value)} placeholder="Leave a comment here" />
          </FloatingLabel>
        </div>
        
        <div style={{marginTop: "100px",  marginLeft: "60%", float: "right" }} >
          <Button onClick={handleSubmit} variant="success" style={{ width: "150px", height: "40px" }} active>Submit</Button>{' '}
        </div>
      </div>
      </div>
    </>

  );
}
export default CreateOrderRecord;