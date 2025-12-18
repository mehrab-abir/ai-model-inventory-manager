import React, { useState } from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log("Sign in info", { email, password });
  };
  return (
    <div className="pt-36 bg-surface pb-10">
      <div className="w-11/12 md:w-3/5 lg:w-1/3 mx-auto mt-10 bg-base p-5 rounded-md flex flex-col justify-center shadow-lg shadow-indigo-500">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold my-3">Sign In to Your Account</h1>
          <p className="text-sm">
            Dont't have an account?{" "}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        {/* sign in form starts here */}
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="px-8 py-5 space-y-2"
        >
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
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
          <p className="text-secondary hover:underline cursor-pointer text-sm hover:text-primary!">
            Forgot password?
          </p>
          <button
            type="submit"
            className="btn bg-primary w-full text-white rounded-md border-none mt-4 hover:shadow-md hover:shadow-indigo-300"
          >
            Sign In
          </button>
          <p className="text-center my-4">Or</p>
          <button
            type="button"
            className="btn bg-white w-full text-black rounded-md border-none hover:shadow-md hover:shadow-indigo-300"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
