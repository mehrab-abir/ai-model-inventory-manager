import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Root";
import AllModels from "../Pages/AllModels";

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
    }
])

export default router;