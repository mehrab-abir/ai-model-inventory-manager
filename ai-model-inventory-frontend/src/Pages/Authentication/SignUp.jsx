import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { AuthContext } from "./AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import LoaderSpinner from "../../Components/LoaderSpinner";
import { uploadToCloudinary } from "../../utils/photoUploader";

const SignUp = () => {
  const { setUser, googleSignIn, createAccount, updateUser } = use(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFormatError, setPasswordFormatError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // file input (may be empty)
    const imageFile = form.avatar?.files?.[0] || null;

    setPasswordFormatError("");
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
      setPasswordFormatError(
        "Password must be at least 6 characters long and include at least one uppercase letter and one lowercase letter."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      //Upload image to Cloudinary
      const photoURL = imageFile ? await uploadToCloudinary(
        imageFile,
        import.meta.env.VITE_CLOUDINARY_PROFILE_PRESET
      ) : '';

      //Create firebase account
      const result = await createAccount(email, password);

      await updateUser({ displayName, photoURL });

      const user = result.user;
      setUser({ ...user, displayName, photoURL });

      const newUser = {
        displayName,
        email,
        photoURL,
        password
      };

      const res = await fetch(
        `https://ai-model-inventory-backend.vercel.app/users`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const afterPost = await res.json();

      if (afterPost.insertedId) {
        toast.success("Welcome!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
        navigate(location.state || "/");
      }
    } catch (err) {
      toast.error(`${err.code || err.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const signInWithGoogle = () => {
    setIsSubmitting(true);
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);

        const newUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        navigate(location.state || "/");

        fetch("https://ai-model-inventory-backend.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((afterPost) => {
            if (afterPost.insertedId) {
              toast.success("Welcome!", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
              });
            }
          });
      })
      .catch((error) => {
        toast.error(`${error.code}`, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isSubmitting) return <LoaderSpinner />;

  return (
    <div className="pt-36 bg-surface pb-10">
      <div className="w-11/12 md:w-3/5 lg:w-1/3 mx-auto mt-10 bg-base p-5 shadow-lg shadow-indigo-500 rounded-md flex flex-col justify-center">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold my-3">
            Register for AI Model Inventory Manager
          </h1>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="px-8 py-5 space-y-2">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input border-input outline-none w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="input border-input outline-none w-full"
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Profile Image (optional)</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="flex flex-col relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="input border-input outline-none w-full"
              required
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

          <p className="text-red-500 text-sm">{passwordFormatError}</p>

          <button
            type="submit"
            className="btn bg-primary w-full text-white rounded-md border-none mt-4 hover:shadow-md hover:shadow-indigo-300"
          >
            Sign Up
          </button>

          <p className="text-center my-4">Or</p>

          <button
            onClick={signInWithGoogle}
            type="button"
            className="btn bg-white w-full text-black rounded-md border-none hover:shadow-md hover:shadow-indigo-300"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default SignUp;
