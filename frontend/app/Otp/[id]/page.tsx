"use client";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button } from "react-bootstrap";
interface Params {
  id: string;
}
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function BasicDemo({ params }: { params: Promise<Params> }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<Params | null>(null);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    params.then((data) => setResolvedParams(data));
    setSuccess("");
    setError("");
  }, [params]);

  console.log("resolvedParams", resolvedParams);
  const handleSubmit = async (id: string) => {
    setSuccess(""); 
    console.log("id", id);
    console.log("otp", otp);
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/orders/closeorder", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, OTP: otp }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("response", data.message);
          setSuccess(data.message);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          router.push("/Deliveritems");
        } else {
          const data = await response.json();
          console.log("response", data.message);
          setError(data.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };
  return (
    <div
      className="container"
      style={{  marginTop:"15vh",backgroundColor: "white",border:"1px dashed 	#dbdbdb",borderRadius:"10px" ,boxShadow:"2px 2px 2px #888888",alignContent:"center",width:"400px",height:"500px",padding:"62px"}}
    >
      <p style={{paddingBottom:"40px",fontSize:"17px",color:"#02245c"}} >{resolvedParams ? `OrderID: ${resolvedParams.id}` : "Loading..."}</p>

      {
        success && (
          <div style={{ marginTop: "50px",color:"green" ,marginLeft:"50px"}}>
            <h1>{success}</h1>
          </div>
        )
      }
      {!success && (
        <div style={{}}>
          <p style={{marginBottom:"20px"}}>Enter OTP</p>
          <OtpInput
          
            inputStyle={{
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
              borderRadius: "5px",
              textAlign: "center",
            }}
            value={otp}
            onChange={(value) => setOtp(value)}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          {
            error && (
              <Alert variant="danger" style={{marginTop:"50px"}}> {error}</Alert>
            )
          }
          <Button
            variant="primary"
            onClick={() => resolvedParams && handleSubmit(resolvedParams.id)}
            style={{ marginTop: "50px" }}
          >
            Submit
          </Button>
        </div>
      )}
      
    </div>
  );
}
