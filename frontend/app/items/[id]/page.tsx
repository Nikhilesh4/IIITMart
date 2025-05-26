"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Alert } from "react-bootstrap";
  interface Params {
    id: string;
  }
import Button from "react-bootstrap/Button";

interface Item {
  _id: string;
  ItemName: string;
  price: number;
  Description: string;
  Category: string;
  SellerName: string;
  SellerID: string;
}

export default function Items({ params }: { params: Promise<Params> }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [items, setItems] = useState<null | Record<string, any>>(null);

  useEffect(() => {
    setSuccess("");
    setError("");
    const fetchData = async () => {
      const resolvedParams = await params;
      const token = Cookies.get("token");

      if (token && resolvedParams?.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/items/getitembyid?id=${resolvedParams.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log("response", data.message);
          console.log("items", data.items);
          setItems(data.items);
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      }
    };

    fetchData();
  }, [params]);
  const Onsumbit = async (id: string) => {
    setSuccess("");
    setError("");
    console.log("onSubmit");
    // {
    const token = Cookies.get("token");
    if (token) {
      try {
        console.log("id", id);

        const response = await fetch("http://localhost:5000/api/users/addtocart", {
          method: "POST",
          headers: {
            // headers: {
            Authorization: `Bearer ${token}`,
            // },
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ItemID: id }),
        });
        if (response.ok) {
          console.log("response", response);
          const data = await response.json();
          console.log("response", data.message);
          setSuccess(data.message);
        } else {
          console.log("response", response);
          const data = await response.json();
          console.log("response", data.message);
          setError(data.message);
        }
      } catch (error) {
        // console.log(error.message);
        console.error("Error during fetch:", error);
      }
    }
  };
  return (
    <>
      {items ? (
        <section className=" bg-blueGray-50">
          <div className="w-full lg:w-1/3 px-4 mx-auto">
            <div
              className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-xl rounded-lg mt-16"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="px-4 " >
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/iiit.png"
                        className=" w-full"
                        // style={{ border: "2px solid #2e2c2c" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <h3 className="text-xl font-semibold leading-normal  text-blueGray-700">
                    {items.ItemName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                   Rs: {items.price}
                  </div>
                </div>
                <div className="py-6 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-11/12">
                      <p className="mb-2 text-lg leading-relaxed text-blueGray-700">
                        <span  style={{color:"#057ff0"}} >Description:</span> {items.Description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 " style={{fontSize:"20px",color:"#057ff0"}}>
                    <i className="fas fa-map-marker-alt mr-2 " />
                      <span >Category:</span>     {items.Category}
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                    {items.Sellername}
                  </div>
                </div>
              </div>
              <div >
                {error && (
                  <Alert key={"danger"} variant={"danger"}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert key={"sucess"} variant={"success"}>
                    {success}
                  </Alert>
                )}
              </div>
              <Button
                variant="primary"
                type="submit"
                onClick={() => Onsumbit(items.id)}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
