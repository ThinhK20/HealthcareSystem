import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import LayoutRoute from "../shared/layout/layout";
<<<<<<< HEAD
import TableInsuranceManagement from "../pages/insuarancePolices/table-insurance-management";
import ConfirmNotification from "../pages/insuarancePolices/delete-confirmation";
import Form from "../pages/insuarancePolices/form";
import RegisterInsurance from "../components/register-insurance/register-insurance";
import CheckOut from "../components/payment/checkout";
=======
>>>>>>> b330114d57403bab84c1631d07c688c12f213f55
import Page404 from "../pages/Error/page404";
import Register from "../pages/login/register";
import EmailVerify from "../pages/login/emailverify";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from "./users-router";
import { StaffRoutes } from "./staffs-router";
<<<<<<< HEAD
import Insurance from "../pages/insurances/insurance";
import FormUpdate from "../pages/insurances/form-update";
import FormCreate from "../pages/insurances/form-create";
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

   {
      path: "staffs/table-insurance-management",
      element: (
         <LayoutRoute element={<TableInsuranceManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/insurances",
      element: (
         <LayoutRoute element={<Insurance />}></LayoutRoute>
      ),
   },
   {
      path: "/insurances/edit",
      element: (
         <LayoutRoute element={<FormUpdate />}></LayoutRoute>
      ),
   },
   {
      path: "/insurances/create",
      element: (
         <LayoutRoute element={<FormCreate />}></LayoutRoute>
      ),
   },
   {
      path: "/edit-form",
      // element: <LayoutRoute element={<EditForm />}></LayoutRoute>,
   },

   {
      path: "/delete-confirmation",
      element: <LayoutRoute element={<ConfirmNotification />}></LayoutRoute>,
   },

   {
      path: "/insuarancePolices/form",
      element: <LayoutRoute element={<Form />}></LayoutRoute>,
   },

   {
      path: "/register-insurance",
      element: <LayoutRoute element={<RegisterInsurance />}></LayoutRoute>,
   },
   {
      path: "/payment/checkout",
      element: <LayoutRoute element={<CheckOut />}></LayoutRoute>,
   },
   ...UserRoutes,
   ...StaffRoutes,
   {
      path: "*",
      element: <Page404></Page404>,
   },
=======
// import StatisticCustomer from "../components/staffs/statistic-customers";
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
>>>>>>> b330114d57403bab84c1631d07c688c12f213f55
]);
