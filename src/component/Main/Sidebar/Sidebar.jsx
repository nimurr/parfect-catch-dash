/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/public/logo/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBriefcase, FaCopy, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";


const sidebarItems = [
  { path: "/", name: "Dashboard", icon: <MdDashboard className="size-6" /> },
  { path: "/users", name: "Users", icon: <FaUserAlt className="size-6" /> },
  
  
  
  { path: "/Earnings", name: "Earnings", icon: <RiMoneyDollarCircleFill className="size-6" /> },
  { path: "/Subscription", name: "Subscription", icon: <HiLightBulb className="size-8" /> },
  
  { path: "/settings", name: "Settings", icon: <IoSettingsSharp className="size-6" /> },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[220px] lg:w-[260px] xl:w-[280px] bg-[#B5B5B5] fixed h-screen shadow-2xl">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex flex-col md:mr-7 items-center   text-white my-5">
              <img src={logo} alt="logo" className="w-[354px] h-[166px] mb-4 object-contain" />
            </div>
            <ul className="flex flex-col gap-3">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-[80%] mx-auto px-5 py-4 flex items-center gap-3  rounded-md transition-all duration-300 ease-in-out hover:bg-[#EAF5F9] ${
                      isActive ? "bg-[#EAF5F7]" : ""
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-10 py-4 text-white mb-4"
          >
            <IoIosLogOut className="ml-2 size-8 bg-red-500 p-1 text-white rounded-md" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#4C7E95] shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
          <img src={logo} alt="logo" className="h-20 mb-5" />
        </div>
        <ul className="flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `w-[70%] mx-auto px-5 py-2 flex items-center gap-3 text-[#FFFFFF] rounded-md transition-all duration-300 ease-in-out hover:bg-[#85594B] ${
                  isActive ? "bg-[#85594B]" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={() => {
            setShowModal(true);
            toggleSidebar();
          }}
          className="flex items-center gap-2 px-10 py-4 text-white ml-6"
        >
          <IoIosLogOut className="size-8 bg-red-500 p-1 rounded-md text-white" />
          <span>Logout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;