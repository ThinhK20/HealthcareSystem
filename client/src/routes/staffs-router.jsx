import LayoutRoute from "../shared/layout/layout";
import StaffsPayment from "../pages/staffs/payment";
import StaffRequestDetail from "../pages/staffs/request-detail";

import FormCreateNewStaff from "../pages/staffs/create-staff-account";
import { RefundRequestManagement } from "../pages/staffs/manage-refund-request";
import RefundRequestDetails from "../pages/staffs/refund-request-details";
import TableInsuranceManagement from "../components/register-insurance/register-insurance";
import { ManageAccount } from "../pages/staffs/manage-account";
import StaffCustomerRequestManagement from "../pages/staffs/manage-requests";
import PackagePolicy from "../pages/staffs/package-policy";
import PackagePolicyDetails from "../pages/packagePolicy/detail";
import CreatePackageForm from "../pages/packagePolicy/create";
import EditPackageForm from "../pages/packagePolicy/edit";
import Statistic from "../components/statistic/statistic";
import { IndexFunction } from "../pages/staffs";
import EditInformation from "../pages/staffs/edit-information";
import EditAccount from "../pages/staffs/edit-account";
import ViewInquiry from "../pages/staffs/view-inquiry";
export const StaffRoutes = [
   {
      path: "/staffs",
      element: <LayoutRoute element={<IndexFunction />} />,
   },
   {
      path: "/staffs/edit-information/:id",
      element: <LayoutRoute element={<EditInformation />} />,
   },
   {
      path: "/staffs/edit-account/:id",
      element: <LayoutRoute element={<EditAccount />} />,
   },
   {
      path: "staffs/payment",
      element: <LayoutRoute element={<StaffsPayment />} />,
   },
   {
      path: "staffs/request-detail/:id",
      element: <LayoutRoute element={<StaffRequestDetail />} />,
   },
   {
      path: "staffs/create-staff-account/",
      element: <LayoutRoute element={<FormCreateNewStaff />} />,
   },
   {
      path: "/staffs/refund-requests",
      element: <LayoutRoute element={<RefundRequestManagement />} />,
   },
   {
      path: "/staffs/customer-requests",
      element: <LayoutRoute element={<StaffCustomerRequestManagement />} />,
   },
   {
      path: "/staffs/refund-requests/:id",
      element: <LayoutRoute element={<RefundRequestDetails />} />,
   },
   {
      path: "/staffs/manage-account",
      element: <LayoutRoute element={<ManageAccount />} />,
   },
   {
      path: "/staffs/table-insurance-management",
      element: (
         <LayoutRoute element={<TableInsuranceManagement />}></LayoutRoute>
      ),
   },
   {
      path: "/staffs/package-policy",
      element: <LayoutRoute element={<PackagePolicy />}></LayoutRoute>,
   },
   {
      path: "/staffs/package-policy/:id",
      element: <LayoutRoute element={<PackagePolicyDetails />} />,
   },
   {
      path: "/staffs/package-policy/create",
      element: <LayoutRoute element={<CreatePackageForm />} />,
   },
   {
      path: "/staffs/package-policy/edit/:id",
      element: <LayoutRoute element={<EditPackageForm />} />,
   },
   {
      path: "/staffs/statistic",
      element: <LayoutRoute element={<Statistic />}></LayoutRoute>,
   },
   {
      path: "/staffs/inquiry",
      element: <LayoutRoute element={<ViewInquiry />}></LayoutRoute>,
   },
];
