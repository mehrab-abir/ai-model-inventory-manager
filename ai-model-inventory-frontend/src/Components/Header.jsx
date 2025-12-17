import React, { useEffect, useState } from 'react';
import logo from "./../assets/logo-transparent.png";
import { NavLink } from 'react-router';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Header = () => {

    const [theme, setTheme] = useState(()=>localStorage.getItem("theme") || "light");

    useEffect(()=>{
        const html = document.querySelector('html');
        html.setAttribute("data-theme",theme);
        localStorage.setItem("theme",theme);
    },[theme])


    return (
      <header className="bg-surface fixed w-full z-50">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <div className="logo flex gap-1 items-center">
            <img src={logo} alt="" className="w-20" />
            <h1 className="text-xl font-bold">AI Models</h1>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">All Models</NavLink>
            <NavLink to="/">Add a Model</NavLink>
          </nav>

          <div className="user-action flex items-center space-x-2">
            {
                theme === "light" ? <MdDarkMode onClick={()=>setTheme("dark")} className="text-4xl cursor-pointer" /> : <CiLight onClick={()=>setTheme("light")} className="text-4xl cursor-pointer" />
            }
            
            
            <button className="btn bg-surface border border-primary">
              Login
            </button>
            <button className="btn bg-primary text-white">Register</button>
          </div>
        </div>
      </header>
    );
};

export default Header;