import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/login";
import LayoutRoute from "../shared/layout/layout";
import TableInsuranceManagement from "../components/table-insurance-management/table-insurance-management";
import EditForm from  "../components/table-insurance-management/edit-form";
import ConfirmNotification from "../components/table-insurance-management/delete-confirmation"
import AddForm from "../components/table-insurance-management/add-form"
import RegisterInsurance from "../components/register-insurance/register-insurance";


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
      element: <LayoutRoute element={<EditForm />}></LayoutRoute>,
   },

   {
      path: "/delete-confirmation",
      element: <LayoutRoute element={<ConfirmNotification />}></LayoutRoute>,
   },

   {
      path: "/add-form",
      element: <LayoutRoute element={<AddForm />}></LayoutRoute>,
   },

   {
      path: "/register-insurance",
      element: <LayoutRoute element={<RegisterInsurance />}></LayoutRoute>,
   },

]);
