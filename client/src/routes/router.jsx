import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/login";
import LayoutRoute from "../shared/layout/layout";
import TableInsuranceManagement from "../components/insuarancePolices/table-insurance-management";
import ConfirmNotification from "../components/insuarancePolices/delete-confirmation";
import Form from "../components/insuarancePolices/form";
import RegisterInsurance from "../components/register-insurance/register-insurance";
import StaffsPayment from "../pages/staffs/payment";
import StaffRequestDetail from "../pages/staffs/request-detail";
import CheckOut from "../components/payment/checkout";
import CustomerRequestManagement from "../pages/customers/manage-requests";
import CustomerRequestForm from "../pages/customers/customer-request-form";
import RefundRequestForm from "../pages/customers/RefundRequestForm";
import Page404 from "../pages/Error/page404";
import Register from "../components/login/register";
import { RefundRequestManagement } from "../pages/customers/manage-refund-request";
import FormCreateNewStaff from "../pages/staffs/createStaffAccount"
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
      path: "/register",
      element: <LayoutRoute element={<Register />}></LayoutRoute>,
   },

   {
      path: "/table-insurance-management",
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
      path: "staff/payment",
      element: <LayoutRoute element={<StaffsPayment />}></LayoutRoute>,
   },
   {
      path: "staff/request-detail/:id",
      element: <LayoutRoute element={<StaffRequestDetail />}></LayoutRoute>,
   },
   {
      path: "staffs/create-staff-account/",
      element: <LayoutRoute element={<FormCreateNewStaff />}></LayoutRoute>,
   },

   {
      path: "/payment/checkout",
      element: <LayoutRoute element={<CheckOut />}></LayoutRoute>,
   },
   {
      path: "/staffs/refund-request-management",
      element: (
         <LayoutRoute element={<RefundRequestManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/users/customer-requests",
      element: (
         <LayoutRoute element={<CustomerRequestManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/users/customer-requests/create",
      element: <LayoutRoute element={<CustomerRequestForm />}></LayoutRoute>,
   },
   {
      path: "/users/refund-requests/create",
      element: <LayoutRoute element={<RefundRequestForm />}></LayoutRoute>,
   },
   {
      path: "*",
      element: <Page404></Page404>,
   },
]);
