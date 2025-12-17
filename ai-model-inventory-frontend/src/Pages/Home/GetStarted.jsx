import React from 'react';
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
          <div className="flex items-center gap-8 mt-5">
            <button className="btn bg-primary text-white rounded-xl border-none shadow-md shadow-white">
              Create Account
            </button>
            <button className="btn bg-surface text-accent border border-white rounded-xl border-none shadow-md">
              Explore Models
            </button>
          </div>
        </div>
      </div>
    );
};

export default GetStarted;