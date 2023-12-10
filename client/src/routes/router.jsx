import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/login";
import LayoutRoute from "../shared/layout/layout";
import Page404 from "../pages/Error/page404";
import Register from "../components/login/register";
import EmailVerify from "../components/login/emailverify";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from "./users-router";
import { StaffRoutes } from "./staffs-router";
import StatisticCustomer from "../components/staffs/statistic-customers";
export const router = createBrowserRouter([
   {
      path: "/",
      element: <LayoutIndexRoute element={<Home />}></LayoutIndexRoute>,
   },
   {
      path: "/login",
      element: <LayoutRoute element={<Login />}></LayoutRoute>,
   },
   {
      path: "/verify",
      element: <LayoutRoute element={<EmailVerify />}></LayoutRoute>,
   },
   {
      path: "/register",
      element: <LayoutRoute element={<Register />}></LayoutRoute>,
   },
   ...UserRoutes,
   ...StaffRoutes,
   {
      path: "*",
      element: <Page404></Page404>,
   },
]);
