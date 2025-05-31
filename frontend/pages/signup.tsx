"use client";
import React, { FormEvent } from "react";
import styles from "../styles/signup.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
function Signup() {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("onSubmit");
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      age: formData.get("age"),
      contactNumber: formData.get("contactNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("response", response);
    if (response.ok) {
      const responseData = await response.json();
      console.log("Signup successful:", responseData);
      router.push("/");
      Cookies.set("token", responseData.token, { expires: 30000, path: "/" });
      const userdetails = [responseData.id, responseData.Name];
      Cookies.set("userdetails", JSON.stringify(userdetails), {
        expires: 30000,
        path: "/",
      });
      console.log("cookie is set");
      setAge("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setPassword("");
    } else {
      const responseData = await response.json();
      console.log();
      const er = responseData.message;
      setError(er);
      setAge("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setPassword("");
      console.error("Signup failed:", response.statusText);
    }
  }
  return (
    <div className={styles.Signupcontainer} id="Signupcontainer">
      <div className={styles.Signupform} id="Signupform">
        <h1 style={{ color: "blue" }}> Sign up</h1>
        <Form onSubmit={onSubmit}>
          <div className="form-row">
            <Form.Group
              className="mb-2"
              controlId="formGroupFirstName"
              style={{ flex: 1 }}
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                required={true}
                name="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="formGroupLastName"
              style={{ flex: 1 }}
            >
              <Form.Label>LastName</Form.Label>

              <Form.Control
                type="text"
                placeholder="Last name"
                required={true}
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-4" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="IIIT Mail ID"
              name="email"
              required={true}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required={true}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Group className="mb-4" controlId="formGroupNumber">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                placeholder="age"
                required={true}
                name="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formGroupContact">
              <Form.Label>Contact number:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="contact number"
                required={true}
                name="contactNumber"
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
              />
            </Form.Group>
          </div>
          {/* <Form.Group className="mb-4" controlId="formGroupName"></Form.Group> */}
          {error && (
            <Alert
              key={"danger"}
              variant={"danger"}
              onClose={() => setShow(false)}
            >
              {error}
            </Alert>
          )}
          <div className="login-link-container">
            <span>Already have an account?</span>
            <a href="/login">Login here</a>
          </div>
          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              margin: "4px",
            }}
          >
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
