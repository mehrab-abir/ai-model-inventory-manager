import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <h1 className="text-red-500 text-xl text-center p-4">-Oops..! You may be lost. The page  you are looking for is not available-</h1>
            <Link to='/' className='btn bg-black text-white mt-5'>Go back to Home</Link>
        </div>
    );
};

export default ErrorPage;