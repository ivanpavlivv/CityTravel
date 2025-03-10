import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import CityDashboard from "../../features/cities/dashboard/CityDashboard";
import CityForm from "../../features/cities/form/CityForm";
import CityDetails from "../../features/cities/details/CityDetails";
import NotFound from "../../features/errors/NotFound";
import TestErrors from "../../features/errors/TestErrors";
import ServerError from "../../features/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "cities", element: <CityDashboard /> },
      { path: "cities/:id", element: <CityDetails /> },
      { path: "createCity", element: <CityForm key="create" /> },
      { path: "manage/:id", element: <CityForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "errors", element: <TestErrors /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
