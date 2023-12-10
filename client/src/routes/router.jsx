import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/login";
import LayoutRoute from "../shared/layout/layout";
import TableInsuranceManagement from "../components/insuarancePolices/table-insurance-management";
import ConfirmNotification from "../components/insuarancePolices/delete-confirmation";
import Form from "../components/insuarancePolices/form";
import RegisterInsurance from "../components/register-insurance/register-insurance";
import CheckOut from "../components/payment/checkout";
import Page404 from "../pages/Error/page404";
import Register from "../components/login/register";
import EmailVerify from "../components/login/emailverify";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from "./users-router";
import { StaffRoutes } from "./staffs-router";
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
]);
