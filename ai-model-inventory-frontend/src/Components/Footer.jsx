import React from 'react';
import logo from './../assets/logo-transparent.png'
import { Link } from 'react-router';
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
      <footer className="bg-footer pt-15 pb-3 text-secondary">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between mb-10">
          <div className="flex-2">
            <div className="flex items-center">
              <img src={logo} alt="" className="w-18" />
              <h3 className="text-lg font-semibold">AI Model Inventory</h3>
            </div>
            <p className="w-full md:w-4/5">
              Manage and discover AI models with ease. A comprehensive platform
              for AI enthusiasts and developers.
            </p>
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col items-start mt-5 space-y-2.5">
              <Link to="/">Home</Link>
              <Link to="/allmodels">All Models</Link>
              <Link to="/addmodel">Add Model</Link>
            </div>
          </div>
          <div className="flex-1 mt-10 md:mt-0">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex items-center mt-5 gap-8">
              <Link to="https://github.com/mehrab-abir/ai-model-inventory-manager" target='_blank'>
                <FaGithub className="text-2xl" />
              </Link>
              <FaInstagramSquare className="text-2xl cursor-pointer" />
              <FaXTwitter className="text-2xl cursor-pointer" />
              <BsLinkedin className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-primary opacity-20"></div>
        <div className="text-center space-y-3 mt-3 text-muted">
          <p>&copy; Copyright Reserved - 2025</p>
          <p>-Mehrab Jalil Abir-</p>
        </div>
      </footer>
    );
};

export default Footer;