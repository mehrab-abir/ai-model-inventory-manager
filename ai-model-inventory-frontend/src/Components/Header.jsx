import React, { useEffect, useState } from "react";
import logo from "./../assets/logo-transparent.png";
import { Link, NavLink } from "react-router";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="bg-surface fixed w-full z-50">
      <div className="w-10/12 mx-auto flex items-center justify-between">
        <div className="logo flex gap-1 items-center">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="flex flex-col md:hidden space-y-1 cursor-pointer"
          >
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
            <span className="h-1 bg-gray-400 rounded-md w-5"></span>
            <span className="h-1 bg-gray-400 rounded-md w-7"></span>
          </div>
          <Link to='/' className="flex items-center">
            <img src={logo} alt="" className="w-20" />
            <h1 className="text-xl font-bold">AI Models</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 ">
          <NavLink to="/" className='hover:text-primary hover:tracking-wider transition-all duration-300'>Home</NavLink>
          <NavLink to="/allmodels" className='hover:text-primary hover:tracking-wider transition-all duration-300'>All Models</NavLink>
          <NavLink to="/addmodel" className='hover:text-primary hover:tracking-wider transition-all duration-300'>Add a Model</NavLink>
        </nav>

        <div className="user-action flex items-center space-x-2">
          {theme === "light" ? (
            <MdDarkMode
              onClick={() => setTheme("dark")}
              className="text-2xl md:text-4xl cursor-pointer"
            />
          ) : (
            <CiLight
              onClick={() => setTheme("light")}
              className="text-2xl md:text-4xl cursor-pointer"
            />
          )}

          <button className="btn bg-surface border border-primary">
            Login
          </button>
          <button className="btn bg-primary text-white">Register</button>
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
    </header>
  );
};

export default Header;
