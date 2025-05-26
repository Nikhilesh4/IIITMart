"use client";
import MultiActionAreaCard from "@/components/cards";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
// import { Grid } from "lucide-react";
import { Search } from "lucide-react";
// import { Button, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { Grid2 } from "@mui/material";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import { it } from "node:test";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
interface Item {
  _id: string;
  ItemName: string;
  price: number;
  Description: string;
  Category: string;
  SellerName: string;
  SellerID: string;
  // Add other properties if needed
}

export default function SearchItems() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filtereditems, setFilteredItems] = useState<Item[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const priceRanges = [
    { label: "₹0 - ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹5000", min: 1000, max: 5000 },
    { label: "₹5000+", min: 5001, max: Infinity },
  ];

  let filter = ["Electronics", "Sports & Outdoors", "Home & Kitchen","Travel Accessories","Office Supplies","Furniture"];
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const logout = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/items/allitems", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log("response", data.message);

          console.log("response", data.items);
          setItems(data.items);
          console.log("items", items);
        } catch (error) {
          console.error("Error during logout:", error);
        }
      };

      logout();
    }
  }, []);
  const router = useRouter();
 

  const handleCardClick = (ID: string) => {
    console.log("clicked");
    // Redirect to /items with the id
    router.push(`/items/${ID}`);
  };
  const handleFilterClick = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlefilterclick = (category: string) => {
    console.log(category);
  };
  const handlePriceFilterClick = (range: string) => {
    if (selectedPriceRange === range) {
      setSelectedPriceRange(""); // Deselect the price range
    } else {
      setSelectedPriceRange(range); // Select the new price range
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      item.ItemName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedFilters.length === 0 || selectedFilters.includes(item.Category);
    const priceFilter = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );
    const matchesPrice =
      !priceFilter ||
      (item.price >= priceFilter.min && item.price <= priceFilter.max);

    return matchesSearch && matchesCategory && matchesPrice;
  });
  return (
    <>
      {/* <div className="py-20 h-screen bg-gray-300 px-2"> */}
      <div
        className="max-w-md mx-auto rounded-lg overflow-hidden "
        style={{ maxWidth: "900px", marginBottom: "10px" }}
      >
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative">
              <Search className="absolute fa fa-search text-gray-400 top-3.5 left-3" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                name="search items"
                placeholder="Search items"
              />
              <span className="absolute top-4 right-5 border-l pl-4">
                <i className="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          height: "50px", // Full viewport height
          // backgroundColor: "#ffffff", // White background
          padding: "5px",
          // width: "45vw",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filter.map((category: string) => (
            <Button
              key={category}
              style={{
                margin: "2px",
                backgroundColor: selectedFilters.includes(category)
                  ? "#007bff"
                  : "#005099",
              }}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <Dropdown style={{ marginLeft: "10px" }}>
          <Dropdown.Toggle id="dropdown-basic">
            {selectedPriceRange || "Select Price Range"}{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {priceRanges.map((range) => (
              <Dropdown.Item
                key={range.label}
                onClick={() => handlePriceFilterClick(range.label)}
                style={{
                  backgroundColor:
                    selectedPriceRange === range.label ? "#007bff" : "#ffffff",
                }}
              >
                {range.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* </div> */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 4 }}
          columns={{ xs: 4, sm: 9, md: 12 }}
        >
          {filteredItems
            .filter((items) => {
              return search.toLowerCase() === ""
                ? items
                : items.ItemName.toLowerCase().includes(search.toLowerCase());
            })
            .map((item, index) => (
              <Grid key={index} size={{ xs: 6, sm: 3, md: 3 }}>
                {/* <Item>{index + 1}</Item> */}
                <MultiActionAreaCard
                  Category={item.Category}
                  id={item._id}
                  title={item.ItemName}
                  description={item.Description}
                  price={item.price}
                  name={""}
                  onClick={() => handleCardClick(item._id)} // Attach click handler
                ></MultiActionAreaCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
