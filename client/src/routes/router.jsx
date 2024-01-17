import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import LayoutRoute from "../shared/layout/layout";
import Page404 from "../pages/Error/page404";
import Register from "../pages/login/register";
import EmailVerify from "../pages/login/emailverify";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from "./users-router";
import { StaffRoutes } from "./staffs-router";
import ConfirmPayment from "../components/payment/confirmPayment";
import AboutUs from "../pages/users/about-us";
import InformationCompany from "../pages/users/information-company";
import InsurancePackage from "../pages/insurancePackage/insurance-package";


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
  {
    path: "/payment/completePayment",
    element: <LayoutRoute element={<ConfirmPayment />}></LayoutRoute>,
  },
  {
     path: "/about-us",
     element: <LayoutRoute element={<AboutUs />}></LayoutRoute>,
   },
   {
      path: "/information-company",
      element: <LayoutRoute element={<InformationCompany />}></LayoutRoute>,
   },
   {
      path: "/insurance-package",
      element: <LayoutRoute element={<InsurancePackage />}></LayoutRoute>,
   },
 
]);
