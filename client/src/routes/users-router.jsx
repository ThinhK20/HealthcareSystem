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
import ProtectLayoutRoute from "../shared/layout/Protect";
import CheckOut from "../components/payment/checkout";
import SocialInsuranceForm from "../pages/general/blog";
import Refund from "../pages/refund/refund";
import InsurancePackage from "../pages/insurancePackage/insurance-package";
export const UserRoutes = [
   {
      path: "/users/edit-information",
      element: (
         <ProtectLayoutRoute
            element={<EditInformation />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/edit-account",
      element: (
         <ProtectLayoutRoute
            element={<EditAccount />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/customer-requests",
      element: (
         <ProtectLayoutRoute
            element={<CustomerRequestManagement />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/refund-requests",
      element: (
         <ProtectLayoutRoute
            element={<CustomerRefundRequestManagement />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/refund-requests/create",
      element: (
         <ProtectLayoutRoute
            element={<RefundRequestForm />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/refund-requests/:id",
      element: (
         <ProtectLayoutRoute
            element={<CustomerRefundRequestDetails />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/refund-requests/edit/:id",
      element: (
         <ProtectLayoutRoute
            element={<CustomerRefundRequestDetails />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/customer-requests/create",
      element: (
         <ProtectLayoutRoute
            element={<CustomerRequestForm />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/users/payment",
      element: (
         <ProtectLayoutRoute
            element={<CustomersPayment />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "/payment/checkout",
      element: (
         <ProtectLayoutRoute element={<CheckOut />} allowedRoles={["User"]} />
      ),
   },
   {
      path: "users/social-insurance-form",
      element: (
         <LayoutRoute
            element={<SocialInsuranceForm />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "users/requests-detail/:id",
      element: (
         <LayoutRoute
            element={<UserRequestDetail />}
            allowedRoles={["User"]}
         />
      ),
   },
   {
      path: "users/refund",
      element: <LayoutRoute element={<Refund />} allowedRoles={["User"]} />,
   },
   {
      path: "/users/package",
      element: <LayoutRoute element={<InsurancePackage />} />,
   },
   {
      path: "/users/package",
      element: <LayoutRoute element={<InsurancePackage />} />,
   },
];
