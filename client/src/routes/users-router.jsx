import LayoutRoute from "../shared/layout/layout";
import EditInformation from "../pages/users/edit-information";
import EditAccount from "../pages/users/edit-account";
import CustomerRequestManagement from "../pages/users/manage-requests";
import CustomerRequestForm from "../pages/users/customer-request-form";
import RefundRequestForm from "../pages/users/refund-request-form";
import CustomersPayment from "../pages/users/payment";
import { CustomerRefundRequestManagement } from "../pages/users/customer-refund-requests";
import CustomerRefundRequestDetails from "../pages/users/customer-refund-request-details";
import UserRequestDetail from "../pages/users/request-detail";
export const UserRoutes = [
   {
      path: "/users/edit-information",
      element: <LayoutRoute element={<EditInformation />} />,
   },
   {
      path: "/users/edit-account",
      element: <LayoutRoute element={<EditAccount />} />,
   },
   {
      path: "/users/customer-requests",
      element: <LayoutRoute element={<CustomerRequestManagement />} />,
   },
   {
      path: "/users/refund-requests",
      element: <LayoutRoute element={<CustomerRefundRequestManagement />} />,
   },
   {
      path: "/users/requests-detail",
      element: <LayoutRoute element={<UserRequestDetail />} />,
   },
   {
      path: "/users/refund-requests/create",
      element: <LayoutRoute element={<RefundRequestForm />} />,
   },
   {
      path: "/users/refund-requests/:id",
      element: <LayoutRoute element={<CustomerRefundRequestDetails />} />,
   },
   {
      path: "/users/refund-requests/edit/:id",
      element: <LayoutRoute element={<CustomerRefundRequestDetails />} />,
   },
   {
      path: "/users/customer-requests/create",
      element: <LayoutRoute element={<CustomerRequestForm />} />,
   },
   {
      path: "users/payment",
      element: <LayoutRoute element={<CustomersPayment />} />,
   },
];
