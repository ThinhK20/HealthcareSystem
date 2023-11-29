import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/login";
import LayoutRoute from "../shared/layout/layout";
import TableInsuranceManagement from "../components/insuarancePolices/table-insurance-management";
import ConfirmNotification from "../components/insuarancePolices/delete-confirmation"
import Form from "../components/insuarancePolices/form"
import RegisterInsurance from "../components/register-insurance/register-insurance";
import StaffsPayment from "../pages/staffs/payment";


export const router = createBrowserRouter([
   {
      path: "/",
      element: <LayoutRoute element={<App />}></LayoutRoute>,
   },
   {
      path: "/login",
      element: <LayoutRoute element={<Login />}></LayoutRoute>,
   },

   {
      path: "/table-insurance-management",
      element: <LayoutRoute element={<TableInsuranceManagement />}></LayoutRoute>,
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
      path: "staff/payment",
      element: <LayoutRoute element={<StaffsPayment />}></LayoutRoute>,
   },

]);
