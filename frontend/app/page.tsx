"use client";
import React, { useEffect, useState, FormEvent } from "react";
// import Cookies from "@/node_modules/@types/js-cookie";
import Cookies from   "js-cookie"
// import {useRouter} from "next/router";
import { Button } from "react-bootstrap";
// import Alert from "react-bootstrap/Alert";
// import { redirect } from "next/dist/server/api-utils";
import {redirect} from "next/navigation";
// "use client";
// import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { red } from "@mui/material/colors";

export default function Profile() {
  const [sucess, setSucess] = useState("");
  // const router = useRouter();
  
  // setSucess(router.query.sucess as string);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  //   const [heading, setHeading] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const globaldata = {};
  const vaildatemail = (email: string) => {
    const pattern =
      /(@students\.iiit\.ac\.in$|@iiit\.ac\.in$|@research\.iiit\.ac\.in$)/;
    return pattern.test(email.trim());
  };
  const vaildatemobile = (mobile: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const logout = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/users/getuserdetails", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log("response", data.message);
          console.log("response", data.reviews);
          // console.log("response", data.name)/;
          //   setHeading(data.name);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setAge(data.age);
          setEmail(data.email);
          setPhone(data.contactNumber);
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

      logout();
    }
  }, []);
  // const Onsubmit = (event: FormEvent<HTMLFormElement>) => {
    
  // };
  const handleclick = () => {
    console.log("onSubmit");
    // event.preventDefault();
    redirect("/editprofile");
  }
  const handleclickE = () => {
    redirect("/sell");
  }
  return (
    <>
    <section >
      <MDBContainer className="py-16">
  
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center d-flex flex-column align-items-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                />
                <MDBCardText style={{fontSize:"25px",marginTop:"10px"}}>{firstName+" "+lastName}</MDBCardText>
                <div className="d-flex justify-content-center mt-3">
                  <Button onClick={handleclick}  style={{marginRight:"5px"}}>Edit profile</Button>
                  <Button style={{backgroundColor:"white",color:"blue"}} onClick={handleclickE}>
                    Sell items
                  </Button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
              
                <MDBListGroup flush="true" className="rounded-3">
              
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    {/* <h4>Email</h4> */}
                    <MDBCardText>
                      Email:
                      <span style={{color:"#004fff"}}>{email}</span></MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>Age:
                    {age}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>Phone:  {phone}</MDBCardText>
                  </MDBListGroupItem>
                 
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <h4 style={{textAlign:"center"}}>Reviews</h4>
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {firstName+" "+lastName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {phone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {age}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}
