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
import CustomerRequestManagement from "../pages/users/manage-requests";
import CustomerRequestForm from "../pages/users/customer-request-form";
import RefundRequestForm from "../pages/users/refund-request-form";
import Page404 from "../pages/Error/page404";
import Register from "../components/login/register";
import { RefundRequestManagement } from "../pages/staffs/manage-refund-request";
import FormCreateNewStaff from "../pages/staffs/createStaffAccount";
import RefundRequestDetails from "../pages/staffs/refund-request-details";
import EditInformation from "../pages/users/edit-information";
import EditAccount from "../pages/users/edit-account";
import EmailVerify from "../components/login/emailverify";
import CustomersPayment from "../pages/users/payment";
import { CustomerRefundRequestManagement } from "../pages/users/customer-refund-requests";
import Home from "../pages/general/home";
import LayoutIndexRoute from "../shared/layout/layoutIndex";
import { UserRoutes } from './users-router';
import { StaffRoutes } from './staffs-router';
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
