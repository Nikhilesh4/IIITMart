"use client";
import { useState, useEffect } from "react";
// import { use, useEffect } from "react";
import Cookies from "js-cookie";

import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
interface Item {
  _id: string;
  productName: string;
  price: number;
  Description: string;
  Category: string;
  SellerName: string;
  SellerID: string;
  // Add other properties if needed
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function MyCart() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [OTPG, setOTPG] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    setError("");
    const fetchData = async () => {
      // const resolvedParams = await params;
      const token = Cookies.get("token");

      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/getcart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log("response", data.message);
          console.log("items", data.cart);
          setItems(data.cart);
          let total = 0;
          for (let item of data.cart) {
            // setSum(sum+ item.price);
            total += item.price;
          }
          setSum(total);
          //   {setSum(sum+item.price)}
          // setItems(data.items);
        } catch (error) {
          setError("Error during fetch");
          // console.error("Error during fetch:", error);
        }
      }
    };

    fetchData();
  }, []);
  const Onclick = async (items: Item[]) => {
    // setOTPG("");
    // setError("");
    // alert("Order Placed");
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/placeorder`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: items }),
        });
        const data = await response.json();
        console.log("response", data.message);
        console.log("items", data.OTP);
        // Alert({});
        if (response.ok) {
          alert(
            "OTP is " +
              data.OTP +
              "\n" +
              "Please show this OTP to the delivery person" +
              "Thank you for shopping with us" +
              "Remember the OTP for future reference"
          );
          setOTPG(data.OTP);
          // await sleep(800);
          router.push("/orders");
        } else {
          setError(data.message);
        }
        // redirect('/orders');
      } catch (error) {
        console.error("Error during fetch:", error);
        setError("Error during fetch");
      }
    }
  };
  const removeItem = async (id: string) => {
    setError("");
    const token = Cookies.get("token");
    if (token) {
      try {
        console.log("id", id);
        const dat = {
          ItemID: id,
        };
        const response = await fetch(`http://localhost:5000/api/users/removefromcart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dat),
        });
        const data = await response.json();
        console.log("response", data.message);
        console.log("items", data.cart);
        setItems(data.cart);
        let total = 0;
        for (let item of data.cart) {
          // setSum(sum+ item.price);
          total += item.price;
        }
        setSum(total);
        // setItems(data.items);
      } catch (error) {
        setError("Error during fetch"); 
        // console.error("Error during fetch:", error);
      }
    }
  };
  return (
    <>
      {/* <h1>Cart page </h1> */}
      <div className="h-screen  pt-20" style={{backgroundColor:"#dfe8ed"}} >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {items.map((item) => (
              <div
                key={item._id}
                className="justify-between mb-6 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start"
              >
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.productName}
                    </h2>
                    <p className="text-sm"> Rs: {item.price}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => removeItem(item._id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">RS {sum}</p>
                {/* <p className="text-sm text-gray-700">including VAT</p> */}
              </div>
            </div>
            
            {error && (
              <Alert key={error} variant={"danger"}>
                {error}
              </Alert>
            )}
            <button
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              onClick={() => Onclick(items)}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
