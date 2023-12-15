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
import { RefundRequestManagement } from "../pages/staffs/manage-refund-request";
import FormCreateNewStaff from "../pages/staffs/createStaffAccount";
import RefundRequestDetails from "../pages/staffs/refund-request-details";
import EditInformation from "../pages/users/edit-information";
import EditAccount from "../pages/users/edit-account";
import EmailVerify from "../components/login/emailverify";
import ConfirmPayment from "../components/payment/confirmPayment";

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
      path: "/verify",
      element: <LayoutRoute element={<EmailVerify />}></LayoutRoute>,
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
      path: "/payment",
      element: <LayoutRoute element={<CheckOut />}></LayoutRoute>,
   },
   {
      path: "/payment/completePayment",
      element: <LayoutRoute element={<ConfirmPayment />}></LayoutRoute>,
   },
   {
      path: "/staffs/refund-requests",
      element: (
         <LayoutRoute element={<RefundRequestManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/staffs/refund-requests/:id",
      element: <LayoutRoute element={<RefundRequestDetails />}></LayoutRoute>,
   },
   {
      path: "/users/edit-information",
      element: (
         <LayoutRoute element={<EditInformation />}></LayoutRoute>
      ),
   },
   {
      path: "/users/edit-account",
      element: (
         <LayoutRoute element={<EditAccount />}></LayoutRoute>
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
