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
  LogOut
} from "lucide-react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/esm/Button";

const HorizontalNavLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Profile");

  const menuItems = [
    {
      id: "Profile",
      title: "Profile",
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userdetails");
    console.log("Logout clicked");
    redirect("/login");
  };

  const handleLinkClick = (id, href) => {
    setActiveLink(id);
    setIsMobileMenuOpen(false); // Close mobile menu on link click
    redirect(href);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b-2 border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand/Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Buy & Sell <span className="text-blue-600">@IIITH</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id, item.href)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 ${
                    activeLink === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="hidden xl:inline">{item.title}</span>
                </button>
              ))}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 ml-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200 border border-red-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id, item.href)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeLink === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
              
              {/* Mobile Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 mt-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200 border border-red-200"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default HorizontalNavLayout;