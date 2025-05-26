"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
// import Button from "@mui/material/Button";
import Button from "react-bootstrap/Button";
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
// import MultiActionAreaCard from "@/components/cards";
export default function LabTabs() {
  const [value, setValue] = useState("1");
  // const [pending, setPending] = React.useState([]);
  const [OTP, setOTP] = useState("");
  const [pending, setPending] = useState<Order[]>([]);
  const [placed, setPlaced] = useState<Order[]>([]);
  const [recieved, setRecieved] = useState<Order[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const logout = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/orders/getorders", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log("response", data.message);
          console.log("res", data.pending);
          setPending(data.pending);
          console.log("response", data.Delevired);
          setPlaced(data.Delevired);
          console.log("respinse", data.Sold);
          setRecieved(data.Sold);
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

      logout();
    }
  }, []);
  const regenarate= async (id: string) => {
    const token = Cookies.get("token");
    if (token) {
      const response = await fetch("http://localhost:5000/api/orders/regenarteotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ id: id }),
      });
      if(response.ok){
        const data = await response.json();
        console.log("response", data.message);
        console.log("res", data.OTP);
        setOTP(data.OTP);
        alert("newly generated OTP is " + data.OTP+" for order id "+id);
      } 
    }
  };
  return (
    <div style={{ marginTop: "8vh",overflow:"hidden" }}>
      {/* <Box
        sx={{ width: "100%", typography: "body1", backgroundColor: 
          
          "	#f0f5f7"}}
      > */}
    
        <TabContext value={value}>
          <Box
            sx={{
              marginLeft: "27%",
              width: "700px",
              borderBottom: 1,
              borderColor: "divider",
              // backgroundColor:"#f0f5f7",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab
                label="Items Placed"
                value="1"
                sx={{ color: "black", fontSize: "18px" }}
              />
              <Tab
                label="Items recieved"
                value="2"
                sx={{ color: "black", fontSize: "18px" }}
              />
              <Tab
                label="Items Sold"
                value="3"
                sx={{ color: "black", fontSize: "18px" }}
              />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            style={{
              justifyContent: "center",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            {pending.map((Order) => (
              <div
                key={Order._id}
                className="justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start"
              >
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {/* {item.productName} */}
                      {Order.ItemName}
                    </h2>
                    <p className="text-sm">Price: Rs {Order.Amount}</p>
                    <p>SellerName: {Order.SellerName}</p>
                    <p>OrderId:{Order._id} </p>
                    {/* <div className="flex items-center space-x-4"> */}
                    <Button onClick={() => regenarate(Order._id)} variant="primary">
                      regenarate OTP
                    </Button>
                  </div>
                </div>
                {/* <div className=" flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6" style={{marginTop:"5vh"}}> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="2"
          style={{
            justifyContent: "center",
            marginLeft: "25%",
            marginRight: "25%",
          }}>
          {placed.map((Order) => (
              <div
                key={Order._id}
                className="justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start"
              >
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {/* {item.productName} */}
                      {Order.ItemName}
                    </h2>
                    <p className="text-sm">Price: Rs {Order.Amount}</p>
                    <p>SellerName: {Order.SellerName}</p>
                    <p>OrderId:{Order._id} </p>
                    {/* <div className="flex items-center space-x-4"> */}
                    
                  </div>
                </div>
                {/* <div className=" flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6" style={{marginTop:"5vh"}}> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="3"
          style={{
            justifyContent: "center",
            marginLeft: "25%",
            marginRight: "25%",
          }}>
              {recieved.map((Order) => (
              <div
                key={Order._id}
                className="justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start"
              >
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {/* {item.productName} */}
                      {Order.ItemName}
                    </h2>
                    <p className="text-sm">Price: Rs {Order.Amount}</p>
                    <p>BuyerName: {Order.BuyerName}</p>
                    <p>OrderId:{Order._id} </p>
                    {/* <div className="flex items-center space-x-4"> */}
                    
                  </div>
                </div>
                {/* <div className=" flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6" style={{marginTop:"5vh"}}> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* </div> */}
              </div>
            ))}
          </TabPanel>
        </TabContext>
      {/* </Box> */}
    </div>
  );
}
