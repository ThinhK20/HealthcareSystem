import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import LayoutRoute from "../shared/layout/layout";
import TableInsuranceManagement from "../pages/insuarancePolices/table-insurance-management";
import ConfirmNotification from "../pages/insuarancePolices/delete-confirmation";
import Form from "../pages/insuarancePolices/form";
import RegisterInsurance from "../components/register-insurance/register-insurance";
import CheckOut from "../components/payment/checkout";
import Page404 from "../pages/Error/page404";
import Register from "../pages/login/register";
import EmailVerify from "../pages/login/emailverify";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from "./users-router";
import { StaffRoutes } from "./staffs-router";
import Insurance from "../pages/insurances/insurance";
import FormUpdate from "../pages/insurances/form-update";
import FormCreate from "../pages/insurances/form-create";
import ConfirmPayment from "../components/payment/confirmPayment";
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
      path: "/insurancePolicies",
      element: (
         <LayoutRoute element={<TableInsuranceManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/insurances",
      element: <LayoutRoute element={<Insurance />}></LayoutRoute>,
   },
   {
      path: "/insurances/edit",
      element: <LayoutRoute element={<FormUpdate />}></LayoutRoute>,
   },
   {
      path: "/insurances/create",
      element: <LayoutRoute element={<FormCreate />}></LayoutRoute>,
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
      path: "/insurancePolices/form",
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
   {
      path: "/payment/completePayment",
      element: <LayoutRoute element={<ConfirmPayment />}></LayoutRoute>,
   },
]);
