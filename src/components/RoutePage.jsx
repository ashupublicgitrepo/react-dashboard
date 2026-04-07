import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UIPage from "./UIPage";
import App from "./App";
import UserDetailPage from "./UserDetailPage";
import AddUser from "./AddUser";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <UIPage />,
      },
      {
        path: "/userDetail/:id",
        element: <UserDetailPage />,
      },
      {
        path: "/addUser",
        element:<AddUser/>
      }
    ],
  },
]);

const RoutePage = () => {
  return <RouterProvider router={appRoute} />;
};

export default RoutePage;
