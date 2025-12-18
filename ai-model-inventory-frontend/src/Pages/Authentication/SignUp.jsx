import React, { useState } from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (e) =>{
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        console.log("Sign up info",{name, email,photoURL,password});
    }
  return (
    <div className="pt-36 bg-surface pb-10">
      <div className="w-11/12 md:w-3/5 lg:w-1/3 mx-auto mt-10 bg-base p-5 shadow-lg shadow-indigo-500 rounded-md flex flex-col justify-center">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold my-3">Create An Account</h1>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        {/* sign in form starts here */}
        <form onSubmit={(e) => handleFormSubmit(e)} className="px-8 py-5 space-y-2">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input border-input outline-none w-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="input border-input outline-none w-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="input border-input outline-none w-full"
            />
          </div>
          <div className="flex flex-col relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="input border-input outline-none w-full"
            />
            {showPassword ? (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl absolute top-8.5 right-3 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl absolute top-8.5 right-3 cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            className="btn bg-primary w-full text-white rounded-md border-none mt-4 hover:shadow-md hover:shadow-indigo-300"
          >
            Sign Up
          </button>
          <p className="text-center my-4">Or</p>
          <button
            type="button"
            className="btn bg-white w-full text-black rounded-md border-none hover:shadow-md hover:shadow-indigo-300"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
