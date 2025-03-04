import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import CityDashboard from "../../features/cities/dashboard/CityDashboard";
import CityForm from "../../features/cities/form/CityForm";
import CityDetails from "../../features/cities/details/CityDetails";

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
    ],
  },
]);
