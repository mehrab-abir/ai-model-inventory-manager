import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Root";

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
                
            }
        ]
    }
])

export default router;