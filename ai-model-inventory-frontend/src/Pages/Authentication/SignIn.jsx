import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { AuthContext } from "./AuthContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import LoaderSpinner from "../../Components/LoaderSpinner";

const SignIn = () => {
  const { signin, googleSignIn, setUser, forgotPassword } =
    use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signinError, setSigninError] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");

  const modalRef = useRef();
  const emailRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setSigninError('');
    signin(email,password)
    .then(()=>{
        toast.success("Welcome Back!");
        navigate(location.state || '/');
    })
    .catch((error)=>{
        if (error.code === "auth/invalid-credential"){
            setSigninError("Invalid Credential");
        }
        else{
            setSigninError(error.code);
        } 
    })
    .finally(()=>{
        setIsSubmitting(false);
    })
  };

  //sign in with google
  const signInWithGoogle = ()=>{

    googleSignIn()
    .then((result)=>{
        const user = result.user;
        setUser(user);
        
        const newUser = {
            displayName : user.displayName,
            email : user.email,
            photoURL : user.photoURL
        }

        navigate(location.state || '/');

        fetch("https://ai-model-inventory-backend.vercel.app/users",{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newUser)
        })
        .then((res)=>res.json())
        .then((afterPost)=>{
            if(afterPost.insertedId){
                toast.success("Welcome!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
            }
        })
    })
    .catch((error)=>{
        toast.error(`${error.code}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
    })
    .finally(()=>{

    })
  }

  //forgot password modal
  const openModal = ()=>{
    modalRef.current.show();
  }

  const resetPassword = ()=>{
    setResetPasswordError('')
    setResetPasswordMessage("");

    const email = emailRef.current.value;
    forgotPassword(email)
    .then(()=>{
        setResetPasswordMessage(
          "If an account exists with this email, password reset link has been sent. Please check your email, including spam"
        );
    })
    .catch((err)=>{
        setResetPasswordError(err.code);
    })
    .finally(()=>{
        setIsSubmitting(false);
    })
  }

  if(isSubmitting){
    return <LoaderSpinner></LoaderSpinner>
  }

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
          <p
            onClick={() => openModal()}
            className="text-secondary hover:underline cursor-pointer text-sm hover:text-primary!"
          >
            Forgot password?
          </p>
          <p className="text-red-500 text-sm mt-2">{signinError}</p>
          <button
            type="submit"
            className="btn bg-primary w-full text-white rounded-md border-none mt-4 hover:shadow-md hover:shadow-indigo-300"
          >
            Sign In
          </button>
          <p className="text-center my-4">Or</p>
          <button
            onClick={() => signInWithGoogle()}
            type="button"
            className="btn bg-white w-full text-black rounded-md border-none hover:shadow-md hover:shadow-indigo-300"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </form>

        {/* reset password modal */}
        <dialog
          ref={modalRef}
          className="bg-surface modal modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Enter the email associated with your account
            </h3>
            <input
              ref={emailRef}
              type="email"
              className="input border-input outline-none w-full"
              required
            />
            <p className="text-info text-sm mt-2">{resetPasswordMessage}</p>
            <p className="text-red-500 text-sm">{resetPasswordError}</p>
            <button
              type="button"
              onClick={() => resetPassword()}
              className="btn bg-primary text-white mt-4"
            >
              Next
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => {
                    setResetPasswordError("");
                    setResetPasswordMessage("");
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default SignIn;
