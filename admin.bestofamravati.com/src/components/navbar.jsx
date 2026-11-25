import React, { useState } from "react";
import bizologo from "../assets/bizonance_logo.png";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown.jsx";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, setActiveContent }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const adminEmail = localStorage.getItem("adminEmail") || "admin@bestofamravati.com";

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="relative navbar flex items-center justify-between px-4 md:px-6 h-[72px] bg-white border-b border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] z-30">
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Menu Icon to Toggle Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-700 ${
            isSidebarOpen ? "bg-gray-100" : "bg-transparent"
          }`}
        >
          <Menu size={22} />
        </button>

        {/* Brand Logo & Portal Tag */}
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/boanav.svg"
            alt="Best of Amravati"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={() => {
              if (setActiveContent) setActiveContent("Dashboard");
            }}
          />
   
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <NotificationDropdown setActiveContent={setActiveContent} />

        {/* User Profile & Logout */}
        <div className="relative group inline-block">
          <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
            <img
              src={bizologo}
              alt="Bizonance Admin"
              className="h-9 w-9 rounded-full object-cover border border-gray-200 hover:ring-2 hover:ring-primary/40 transition"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-gray-800 leading-tight">Admin Console</span>
              <span className="text-[10px] text-gray-500 leading-tight truncate max-w-[120px]">{adminEmail}</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-52 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-1.5 transition-all duration-150 animate-in fade-in">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-900">Signed in as</p>
              <p className="text-xs text-gray-500 truncate">{adminEmail}</p>
            </div>
            <ul className="py-1 text-xs text-gray-700">
              <li
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer font-medium"
              >
                <LogOut size={15} /> Sign out
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <LogOut size={22} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Sign out of Admin Portal?</h3>
            <p className="text-xs text-gray-500 mt-1">You will need to sign in again to manage Best of Amravati listings.</p>
            <div className="flex justify-center mt-5 gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-5 py-2 bg-[#b7131a] text-white text-xs font-semibold rounded-xl hover:bg-[#9c0f15] transition cursor-pointer shadow-xs"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Border Accent - Best of Amravati Civic Crimson Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#b7131a] via-[#da3433] to-[#880d13]" />
    </div>
  );
};

export default Navbar;
