"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Order {
  _id: string;
  Amount: number;
  BuyerID: string;
  BuyerName: string;
  ItemID: string;
  ItemName: string;
  OTP: string;
  SellerID: string;
  SellerName: string;
  Status: string;
}

export default function Delivered() {
  // Capitalized the component name
  const router = useRouter();

  const complete = (id: string) => {
    console.log("id", id);
    router.push(`/Otp/${id}`);
  };

  const [recieved, setRecieved] = useState<Order[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const fetchOrders = async () => {
        // Renamed for clarity
        try {
          const response = await fetch("http://localhost:5000/api/users/pendingorders", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("response", data.orders);
          setRecieved(data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, []);

  return (
    <>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ItemName</TableCell>
              <TableCell>BuyerName</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recieved.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.ItemName}
                </TableCell>
                <TableCell>{order.BuyerName}</TableCell>
                <TableCell>{order.Status}</TableCell>
                <TableCell>{order.Amount}</TableCell>

                <TableCell align="right">
                  <Button variant="primary" onClick={() => complete(order._id)}>
                    Complete Transaction
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <div className="h-screen  pt-20" style={{ backgroundColor: "#dfe8ed" }}>
        <h1 className="mb-10 text-center text-2xl font-bold">
          Items to be Delivered
        </h1>
        <TableContainer component={Paper} style={{width:"65vw",marginLeft:"20vh"}}>
        <Table  aria-label="simple table">
          <TableHead style={{ backgroundColor: "#e9f0f5" }}>
            <TableRow >
              <TableCell style={{fontSize:"18px"}}>ItemName</TableCell>
              <TableCell style={{fontSize:"18px"}}>BuyerName</TableCell>
              <TableCell style={{fontSize:"18px"}}>Status</TableCell>
              <TableCell style={{fontSize:"18px"}}>Price</TableCell>
              <TableCell style={{fontSize:"18px"}}>OrderID</TableCell>
              <TableCell style={{fontSize:"18px"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recieved.map((order) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{fontSize:"15px"}}>
                  {order.ItemName}
                </TableCell>
                <TableCell style={{color:"#00174a"}}>{order.BuyerName}</TableCell>
                <TableCell style={{color:"red"}}>{order.Status}</TableCell>
                <TableCell> Rs:{order.Amount}</TableCell>
                <TableCell>{order._id} </TableCell>
              
                <TableCell align="right">
                  <Button variant="primary" onClick={() => complete(order._id)}>
                    Deliver item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
      </div>
    </>
  );
}
