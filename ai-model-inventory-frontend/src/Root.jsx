import React from 'react';
import { Outlet } from 'react-router';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Root = () => {
    return (
        <div className='bg-base text-base'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;