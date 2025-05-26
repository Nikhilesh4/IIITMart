"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { UserRoundPen } from 'lucide-react';
import { Search } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Store } from "lucide-react";
import { MessageCircleMore } from 'lucide-react';

import {

  Menu,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/esm/Button";
const SidebarLayout = ({ children }) => {
  //   const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const [expandedMenus, setExpandedMenus] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
      {
        id: "Profile",
        title: "Proflie",
        icon: <UserRoundPen className="w-5 h-5" />,
        href: "/",
      },
    {
      id: "SearchItems",
      title: "Search Items",
      icon: <Search className="w-5 h-5" />,
      href: "/searchitems",
    },
    {
      id: "My Cart",
      title: "My Cart",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/mycart",
    },
    {
      id: "Orders",
      title: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      href: "/orders",
    },
    {
      id: "Deliveritems",
      title: "Deliver Items",
      icon: <Store className="w-5 h-5" />,
      href: "/Deliveritems",
    },
    {
      id: "Chat",
      title: "Chat",
      icon: <MessageCircleMore className="w-5 h-5" />,
      href: "/chat",
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleClicked = () => {
    Cookies.remove("token");
    Cookies.remove("userdetails");
    console.log("clicked");
    // router.push("/login");
    redirect("/login");
  };
  const handleLinkClick = (id, href) => {
    setActiveLink(id);
    // router.push(href);
    redirect(href);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#dfe8ed" }}>
      {/* Hamburger menu for mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out z-40
          ${isOpen ? "w-64" : "w-0 lg:w-20"} overflow-hidden`}
        aria-label="Sidebar navigation"
      >
        <div
          className="h-full px-4 py-6 overflow-y-auto"
          style={{ backgroundColor: "	#1a2c40" }}
        >
          <div className={`mb-20 `} style={{ color:"#ffff",fontFamily: "fairdisplay", fontSize: "3rem",marginTop: "70px",marginLeft: "30px"}}>
            <h2>Buy and sell @IIITH</h2>
          </div>

          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      handleLinkClick(item.id, item.href);
                      toggleSubmenu(item.id);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200
                      ${
                        activeLink === item.id
                          ? "bg-#f8f8f8 text-white"
                          : "text-gray-400"
                      }
                    `}
                    aria-expanded={expandedMenus.includes(item.id)}
                    aria-controls={`${item.id}-submenu`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      <span className={`${!isOpen && "lg:hidden"}`}>
                        {item.title}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <Button variant={"secondary"} onClick={handleClicked} style={{ marginLeft: "60px",fontSize: "1.2rem",fontFamily: "fairdisplay",color: "#ffff"}}>
              Logout
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isOpen ? "lg:ml-0" : "lg:ml-0"
        }`}
        style={{
          maxHeight: 'calc(100vh - 70px)',  // Adjust this value based on the height of your header or other fixed elements
          overflowY: 'auto',               // Enable vertical scrolling
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
