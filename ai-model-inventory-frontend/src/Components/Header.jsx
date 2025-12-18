import React, { use, useEffect, useState } from "react";
import logo from "./../assets/logo-transparent.png";
// import userAvatar from "./../assets/userAvatar.png";
import { Link, NavLink, useNavigate } from "react-router";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "../Pages/Authentication/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import LoaderSpinner from "./LoaderSpinner";

const Header = () => {
  const { user, signOutUser, setLoading, loading } = use(AuthContext);
  const navigate = useNavigate();

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
  const handleSignOut = ()=>{
    signOutUser()
    .then(()=>{
      toast.info("Signed Out");
      setLoading(false);
      navigate('/');
    })
  }

  // const userPicture =
  //   user?.photoURL || user?.providerData[0]?.photoURL || userAvatar;

  if(loading){
    return <LoaderSpinner></LoaderSpinner>
  }

  return (
    <header className="bg-surface fixed w-full z-50 shadow-xl">
      <div className="w-11/12 md:10/12 mx-auto flex items-center justify-between">
        <div className="logo flex gap-1 items-center">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="flex flex-col md:hidden space-y-1 cursor-pointer"
          >
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
            <span className="h-1 bg-gray-400 rounded-md w-5"></span>
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
          </div>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="w-20" />
            <h1 className="text-xl font-bold hidden md:flex">AI Models</h1>
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
            <button
              onClick={() => handleSignOut()}
              className="btn p-1 text-sm md:p-2 bg-surface border-danger cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              {/* md to large device */}
              <Link
                to="/auth/signin"
                className="btn bg-surface border border-primary hidden md:flex"
              >
                Login
              </Link>
              
              {/* only in small device */}
              <Link
                to="/auth/signin"
                className="flex flex-col md:hidden items-center text-center"
              >
                <CiLogin className="text-2xl text-primary" />
                <span className="text-primary">Login</span>
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
        <nav className="flex flex-col items-center mt-20 space-y-2.5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allmodels">All Models</NavLink>
          <NavLink to="/addmodel">Add a Model</NavLink>
        </nav>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
