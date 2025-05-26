"use client";
import React, { useEffect, useState, FormEvent } from "react";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";

import { useRouter } from "next/navigation";
export default function Profile() {
  
  const router = useRouter();
  const [sucess, setSucess] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  //   const [heading, setHeading] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
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

          console.log("response", data.name);
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
  const Onsubmit = (event: FormEvent<HTMLFormElement>) => {

    console.log("onSubmit");
    event.preventDefault();
    // setSucess("");
    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      age: formData.get("age") as string,
      contactNumber: formData.get("contactNumber") as string,
      email: formData.get("email") as string,
      password: formData.get("password"),
      newpassword: formData.get("newpassword"),
    };
    if (data.newpassword) {
      if (!data.password) {
        setError("please  enter ur current password");
        return;
      }
    }
    if (data.password) {
      if (!data.newpassword) {
        setError("please  enter ur new password");
        return;
      }
    }
    if (data.email) {
      if (!vaildatemail(data.email)) {
        alert("Invalid email format");
        return;
      }
      if (!vaildatemobile(data.contactNumber)) {
        alert("Invalid mobile number");
        return;
      }
    }
    const token = Cookies.get("token");
    if (token) {
      const logout = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/users/updateuserdetails",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const responseData = await response.json();
          console.log("response", responseData);
          if (response.ok) {
            console.log("profile updated successfully");
            setSucess("Profile updated successfully");
            await new Promise((resolve) => setTimeout(resolve, 500));
            // redirect("/");
            router.push("/");
          
          } else {
            console.log("error", responseData.message);
            setError(responseData.message);
            setPassword("");
            setNewpassword("");
            return;
          }
        } catch (error) {
          console.log("error", error);
          setError("error");
          return;
          //   console.error("Error during logout:", error);
        }
      };

      logout();
    }
  };
  if (sucess) {
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Page title */}
            <div className="my-5">
              <h3>Edit ur Profile</h3>
              <hr />
            </div>
            {/* Form START */}
            <form className="file-upload" onSubmit={Onsubmit}>
              <div className="row mb-5 gx-5">
                {/* Contact detail */}
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div
                    className="bg-secondary-soft px-4 py-5 rounded"
                    style={{
                      border: "2px solid #e5e5e5",
                      backgroundColor: "#f0f5f7",
                    }}
                  >
                    <div className="row g-3">
                      {/* First Name */}
                      <div className="col-md-6">
                        <label className="form-label">First Name *</label>
                        <input
                          name="firstName"
                          required={true}
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="First name"
                          defaultValue={firstName}
                        />
                      </div>
                      {/* Last name */}
                      <div className="col-md-6">
                        <label className="form-label">Last Name *</label>
                        <input
                          name="lastName"
                          required={true}
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="Last name"
                          defaultValue={lastName}
                        />
                      </div>
                      {/* Phone number */}
                      <div className="col-md-6">
                        <label className="form-label">age *</label>
                        <input
                          name="age"
                          required={true}
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="AGE"
                          defaultValue={age}
                        />
                      </div>
                      {/* Mobile number */}
                      <div className="col-md-6">
                        <label className="form-label">Mobile number *</label>
                        <input
                          name="contactNumber"
                          required={true}
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="Phone number"
                          defaultValue={phone}
                        />
                      </div>
                      {/* Email */}
                      <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">
                          Email *
                        </label>
                        <input
                          name="email"
                          required={true}
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          value={email}
                          readOnly
                        />
                      </div>
                      <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label">
                          enter ur current password
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="inputEmail4"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          //   value={}
                        />
                      </div>
                      <div className="col-md-7">
                        <label htmlFor="inputEmail4" className="form-label">
                          new password
                        </label>
                        <input
                          name="newpassword"
                          //   required={true}
                          type="password"
                          className="form-control"
                          id="inputEmail4"
                          value={newpassword}
                          onChange={(e) => setNewpassword(e.target.value)}
                          //   readOnly
                        />
                      </div>
                      {/* Skype */}
                    </div>{" "}
                    <div className="mt-4">
                      {error && (
                        <Alert key={"danger"} variant={"danger"}>
                          {error}
                        </Alert>
                      )}
                      {sucess && (
                        <Alert key={"sucess"} variant={"success"}>
                          {sucess}
                        </Alert>
                      )}
                    </div>
                    {/* Row END */}
                  </div>
                </div>
                {/* Upload profile */}
              </div>
              {/* Row END */}
              {/* Social media detail */}

              {/* Row END */}
              {/* button */}
              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Update profile
                </button>
              </div>
            </form>{" "}
            {/* Form END */}
          </div>
        </div>
      </div>
    </>
  );
}
