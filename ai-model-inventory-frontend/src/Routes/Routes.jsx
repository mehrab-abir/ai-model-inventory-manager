import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Root";
import AllModels from "../Pages/Models/AllModels";
import Auth from "../Pages/Authentication/Auth";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import ErrorPage from "../Components/ErrorPage";
import LoaderSpinner from "../Components/LoaderSpinner";
import ModelDetails from "../Pages/Models/ModelDetails";
import AddModel from "../Pages/Models/AddModel";
import UpdateModel from "../Pages/Models/UpdateModel";
import MyModels from "../Pages/Models/MyModels";
import PurchasedModels from "../Pages/Models/PurchasedModels";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allmodels",
        Component: AllModels,
        loader: () => fetch("http://localhost:3000/allmodels"),
        hydrateFallbackElement: <LoaderSpinner></LoaderSpinner>,
      },
      {
        path: "allmodels/:id",
        element : <PrivateRoute>
          <ModelDetails></ModelDetails>
        </PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allmodels/${params.id}`),
        hydrateFallbackElement: <LoaderSpinner></LoaderSpinner>,
      },
      {
        path: "addmodel",
        element: <PrivateRoute>
          <AddModel></AddModel>
        </PrivateRoute>,
      },
      {
        path: "/update-this-model/:id",
        element : <PrivateRoute>
          <UpdateModel></UpdateModel>
        </PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/update-this-model/${params.id}`),
        hydrateFallbackElement: <LoaderSpinner></LoaderSpinner>,
      },
      {
        path: "/mymodels",
        element : <PrivateRoute>
          <MyModels></MyModels>
        </PrivateRoute>
      },
      {
        path : '/purchased-models',
        element : <PrivateRoute>
          <PurchasedModels></PurchasedModels>
        </PrivateRoute>
      }
    ],
  },
  {
    path: "/auth",
    Component: Auth,
    children: [
      {
        index: true,
        Component: SignIn,
      },
      {
        path: "/auth/signin",
        Component: SignIn,
      },
      {
        path: "/auth/signup",
        Component: SignUp,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;