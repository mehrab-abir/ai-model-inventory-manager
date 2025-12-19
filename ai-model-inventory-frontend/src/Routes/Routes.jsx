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
        loader: () =>
          fetch("http://localhost:3000/allmodels"),
        hydrateFallbackElement: LoaderSpinner,
      },
      {
        path: "allmodels/:id",
        Component: ModelDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allmodels/${params.id}`),
        hydrateFallbackElement : LoaderSpinner
      },
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