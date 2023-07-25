import React from 'react';
import { Button } from 'react-bootstrap';
import CircleIcon from '@mui/icons-material/Circle';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Config } from '../../../model/config';
import { useParams } from "react-router-dom";

import './record.css';


const DetailsRecord = () => {

  const { id } = useParams()

  const handleClick = () => {
    window.print();
  };
  const [orders, setOrders] = useState("");
  // console.log(orders);
  const [orderdetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetch(`${Config.baseUrl}/serviceorders/${id}`, {

      method: 'GET',


    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setOrders(res);


      });
  }, [id]);

  useEffect(() => {
    fetchCustomers();

  }, []);


  function fetchCustomers() {
    fetch(`${Config.baseUrl}/serviceorderdetails`)
      .then((res) => res.json())
      .then((result) => {

        setOrderDetails(result);

      })

  }




  return (
    <>




      <div className="card" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px", border:"3px solid #00A064" }} >
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="row d-flex align-items-baseline">
              <div className="col-xl-9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>Invoice <strong>ID: 01</strong></p>
              </div>
              <div className="col-xl-3" style={{ display: "flex" }}>
                <Link to="#" rel="noopener" target="_blank" class="btn btn-default" className="btn  text-capitalize border-0" data-mdb-ripple-color="dark" onClick={handleClick}>
                  <PrintIcon style={{ color: "green" }} /> Print</Link>

              </div>
              <hr />
            </div>

            <div className="container" class="print-section">
              <div className="col-md-12" >
                <div className="text-center">

                  <p className="pt-0"><b>Electro Service </b></p>
                </div>

              </div>


              <div className="row">
                <div className="col-xl-8">


                  <ul className="list-unstyled">
                    {/* {orderdetails.map((detail) => ( */}
                    <li>
                      <span className="text-muted">To : <span style={{ color: "#5d9fc5" }}>Manjur Rahman</span></span>
                      <br />
                      <span className="text-muted">Street : 72/2 Panthapath</span>
                      <br />
                      <span className="text-muted">City  : Dhaka</span>
                      <br />
                      <span className="text-muted">Mobile : 01632480646</span>
                    </li>
                    {/* //   ))} */}
                  </ul>


                </div>
                <div className="col-xl-4">


                  {/* {orderdetails.map((detail)=>( */}

                  <ul className="list-unstyled">
                    <li className="text-muted"><span><CircleIcon style={{ color: "#00A064 " }} />Order ID:</span>#1</li>
                    <li className="text-muted"><span><CircleIcon style={{ color: "#00A064 " }} />Order Date:19-03-23 </span></li>
                    <li className="text-muted"><span><CircleIcon style={{ color: "#00A064 " }} />Status:</span><span className="badge bg-warning text-black fw-bold">
                      paid</span></li>
                  </ul>

                </div>
              </div>

              <div className="row my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
                  <thead style={{ backgroundColor: "#00A064", color: "white" }} className="text-black">
                    <tr>

                      <th scope="col" style={{ color: "white" }} >SN</th>
                      <th scope="col" style={{ color: "white" }}>Product</th>
                      <th scope="col" style={{ color: "white" }}>Price</th>
                      <th scope="col" style={{ color: "white" }}>Qty</th>
                      <th scope="col" style={{ color: "white" }}>SubTotal</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">01</th>
                      <td>Ram-DDR4-8GB</td>
                      <td>500</td>
                      <td>1</td>
                      <td>500</td>

                    </tr>
                    <tr>
                      <th scope="row">02</th>
                      <td>Cooling Fan</td>
                      <td>500</td>
                      <td>1</td>
                      <td>500</td>

                    </tr>

                    {/* {orderdetails.map((detail)=>(
              <tr>
                <th scope="row">{detail.id}</th>
                <td>{detail.product}</td>
                <td>{detail.mobile}</td>
                <td>{detail.address}</td>
                <td>{detail.email}</td>
                
              </tr>
              ))}  */}
                    {/* <tr>
                <th scope="row">2</th>
                <td>Web hosting</td>
                <td>1</td>
                <td>$10</td>
                <td>$10</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Consulting</td>
                <td>1 year</td>
                <td>$300</td>
                <td>$300</td>
              </tr> */}
                  </tbody>

                </table>
              </div>
              <div className="row">
                <div className="col-xl-8">


                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                    <li className="text-muted ms-3"><span className="text-black me-4">SubTotal :</span>1000 tk</li>
                    <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Tax(10%) :</span>100 tk</li>
                  </ul>
                  <p className="text-black float-start"><span className="text-black me-3"> Total Amount:</span><span
                    style={{ fontSize: "20px" }}>1100 tk</span></p>
                </div>
              </div>

              <hr />
              <div className="row">
                <div className=" text-center">
                  <p>Thank you for your comming</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DetailsRecord;