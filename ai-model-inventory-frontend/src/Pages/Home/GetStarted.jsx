import React from 'react';
import { Link } from 'react-router';
//background: linear-gradient(to top, #000428, #004e92);
const GetStarted = () => {
    return (
      <div className="bg-surface py-15">
        <div className="w-10/12 mx-auto p-10 bg-linear-to-r from-[#3b2ce3] to-[#abacf8] text-base flex flex-col items-center justify-center text-center text-white rounded-xl">
          <p className="text-lg font-bold">Get Started Today</p>
          <p className="my-4 text-lg">
            Join our community and start managing your AI models efficiently.
            Register now to access all features and contribute to the AI
            ecosystem.
          </p>
          <div className="flex items-center gap-4 md:gap-8 mt-5">
            <Link to='/auth/signup' className="btn p-1 md:p-2 bg-primary text-white rounded-xl border-none shadow-md hover:shadow-white">
              Create Account
            </Link>
            <Link to='/allmodels' className="btn p-1 md:p-2 bg-surface text-accent rounded-xl border-none hover:shadow-xl">
              Explore Models
            </Link>
          </div>
        </div>
      </div>
    );
};

export default GetStarted;