import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Root";
import AllModels from "../Pages/AllModels";
import Auth from "../Pages/Authentication/Auth";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        Component : Root,
        children : [
            {
                index : true,
                Component : Home
            },
            {
               path: '/allmodels',
               Component : AllModels 
            }
        ]
    },
    {
        path : '/auth',
        Component : Auth,
        children : [
            {
                index: true,
                Component : SignIn
            },
            {
                path : '/auth/signin',
                Component : SignIn
            },
            {
                path: '/auth/signup',
                Component : SignUp
            }
        ]
    },
    {
        path : '*',
        Component : ErrorPage
    }
])

export default router;