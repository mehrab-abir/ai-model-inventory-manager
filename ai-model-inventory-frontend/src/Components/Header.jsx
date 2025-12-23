import React, { use, useEffect, useState } from "react";
import logo from "./../assets/logo-transparent.png";
import userAvatar from "./../assets/userAvatar.png";
import { Link, NavLink, useNavigate } from "react-router";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "../Pages/Authentication/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useRef } from "react";

const Header = () => {
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //sign out user
  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.info("Signed Out");
      navigate("/");
    });
  };

  useEffect(()=>{
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  },[])

  const userPicture =
    user?.photoURL || user?.providerData[0]?.photoURL || userAvatar;

  return (
    <header className="bg-surface fixed w-full z-50 shadow-xl">
      <div className="w-11/12 md:10/12 mx-auto flex items-center justify-between">
        <div className="logo flex gap-1 items-center py-6 md:py-0">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="flex flex-col md:hidden space-y-1 cursor-pointer"
          >
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
            <span className="h-1 bg-gray-400 rounded-md w-5"></span>
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
          </div>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="w-20 hidden md:flex" />
            <h1 className="text-xl font-bold ml-2">AI Models</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 ">
          <NavLink
            to="/"
            className="hover:text-primary hover:tracking-wider transition-all duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/allmodels"
            className="hover:text-primary hover:tracking-wider transition-all duration-300"
          >
            All Models
          </NavLink>
          <NavLink
            to="/addmodel"
            className="hover:text-primary hover:tracking-wider transition-all duration-300"
          >
            Add a Model
          </NavLink>
        </nav>

        <div className="user-action flex items-center space-x-2">
          {theme === "light" ? (
            <MdDarkMode
              onClick={() => setTheme("dark")}
              className="text-3xl md:text-4xl cursor-pointer mr-4"
            />
          ) : (
            <CiLight
              onClick={() => setTheme("light")}
              className="text-3xl md:text-4xl cursor-pointer mr-4"
            />
          )}

          {user ? (
            <div ref={dropdownRef}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={userPicture}
                  className="w-12 rounded-full"
                  alt="user"
                />
                <IoIosArrowDropdown className="text-2xl" />
              </div>

              {/* user dropdown */}
              <div
                className={`min-w-52 bg-surface p-2 absolute top-20 right-2 shadow-md shadow-indigo-400 flex flex-col space-y-4 rounded-lg ${
                  showDropdown
                    ? "opacity-100 mt-0 pointer-events-auto"
                    : "opacity-0 mt-5 pointer-events-none"
                } transition-all duration-500`}
              >
                <p>{user.displayName}</p>
                <p className="text-sm text-muted -mt-4">{user.email}</p>
                <Link to="/mymodels" className="hover:underline">
                  My Models
                </Link>
                <Link to="/purchased-models" className="hover:underline">
                  My Purchase
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="btn p-1 text-sm md:p-2 bg-surface border-danger cursor-pointer hover:bg-red-500! hover:text-white! rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* md to large device */}
              <Link
                to="/auth/signin"
                className="btn bg-surface border border-primary hidden md:flex"
              >
                Sign In
              </Link>

              {/* only in small device */}
              <Link
                to="/auth/signin"
                className="flex flex-col md:hidden items-center text-center"
              >
                <CiLogin className="text-2xl text-primary" />
                <span className="text-primary">Sign In</span>
              </Link>

              {/* only in small device */}
              <Link
                to="/auth/signup"
                className="flex flex-col md:hidden items-center text-center"
              >
                <AiOutlineUserAdd className="text-2xl text-primary" />
                <span className="text-primary">Register</span>
              </Link>

              {/* md to large device */}
              <Link
                to="/auth/signup"
                className="btn bg-primary text-white hidden md:flex"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* responsive navbar-small device */}
      <div
        className={`fixed w-full h-full top-0 right-0 bg-surface text-secondary ${
          openMenu ? "" : "-translate-x-full"
        } transition-all duration-500`}
      >
        <FaRegTimesCircle
          onClick={() => setOpenMenu(!openMenu)}
          className="text-4xl absolute top-10 right-10 cursor-pointer text-gray-400"
        />
        <nav className="flex flex-col items-center mt-20 space-y-3">
          <NavLink
            to="/"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/allmodels"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-lg"
          >
            All Models
          </NavLink>
          <NavLink
            to="/addmodel"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-lg"
          >
            Add a Model
          </NavLink>
        </nav>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
