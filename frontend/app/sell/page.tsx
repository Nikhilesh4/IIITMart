"use client";
import React, { useEffect, useState, FormEvent } from "react";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";
// import { useRouter } from "next/router";
// import { redirect } from "next/dist/server/api-utils";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
export default function Profile() {
  const [sucess, setSucess] = useState("");
  const [error, setError] = useState("");
  const Router = useRouter();
  const handleclick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      ItemName: formData.get("ItemName"),
      Price: formData.get("Price"),
      Description: formData.get("Description"),
      Category: formData.get("Category"),
    };
    console.log(data);
    const response = await fetch("http://localhost:5000/api/items/additems", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      }),
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      setSucess("Item added successfully");
      await sleep(500);
      Router.push("/");
    }
    // console.error("Login failed:", response.statusText);
  };

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "10vh",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          maxWidth: "420px",
        }}
      >
        <div className="row">
          <div className="col-12">
            {/* Page title */}
            <div className="my-4">
              <h3>Sell products</h3>
              <hr />
            </div>
            {/* Form START */}
            <Form onSubmit={handleclick}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ItemName</Form.Label>
                <Form.Control
                  name="ItemName"
                  type="text"
                  placeholder="ItemName"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Price</Form.Label>
                <Form.Control
                  name="Price"
                  type="number"
                  placeholder="Price"
                  min="0"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicItemName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="Description"
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="Category"
                  placeholder="Category"
                />
              </Form.Group>
              {sucess && (
                <Alert
                  key={"success"}
                  variant={"success"}
                  onClose={() => setSucess("")}
                >
                  {sucess}
                </Alert>
              )}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {/* Form END */}
          </div>
        </div>
      </div>
    </>
  );
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
