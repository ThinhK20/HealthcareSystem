
import StaffsPayment from "../pages/staffs/payment";
import StaffRequestDetail from "../pages/staffs/request-detail";
import FormCreateNewStaff from "../pages/staffs/create-staff-account";
import { RefundRequestManagement } from "../pages/staffs/manage-refund-request";
import RefundRequestDetails from "../pages/staffs/refund-request-details";
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
import Form from "../pages/insuarancePolices/form";
import TableInsuranceManagement from "../pages/insuarancePolices/table-insurance-management";
import Insurance from "../pages/insurances/insurance";
import FormUpdate from "../pages/insurances/form-update";
import FormCreate from "../pages/insurances/form-create";
import ProtectLayoutRoute from "../shared/layout/Protect";
export const StaffRoutes = [
  {
    path: "/staffs",
    element: (
      <ProtectLayoutRoute element={<IndexFunction />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/edit-information/:id",
    element: (
      <ProtectLayoutRoute element={<EditInformation />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/edit-account/:id",
    element: (
      <ProtectLayoutRoute element={<EditAccount />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/payment",
    element: (
      <ProtectLayoutRoute element={<StaffsPayment />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/request-detail/:id",
    element: (
      <ProtectLayoutRoute element={<StaffRequestDetail />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/create-staff-account/",
    element: (
      <ProtectLayoutRoute element={<FormCreateNewStaff />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/refund-requests",
    element: (
      <ProtectLayoutRoute
        element={<RefundRequestManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/insurances/edit",
    element: <ProtectLayoutRoute element={<FormUpdate />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },
  {
    path: "/staffs/insurances/create",
    element: <ProtectLayoutRoute element={<FormCreate />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },

  {
    path: "/staffs/insurancePolices/form",
    element: <ProtectLayoutRoute element={<Form />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },
  {
    path: "/staffs/customer-requests",
    element: (
      <ProtectLayoutRoute
        element={<StaffCustomerRequestManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/refund-requests/:id",
    element: (
      <ProtectLayoutRoute
        element={<RefundRequestDetails />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/manage-account",
    element: (
      <ProtectLayoutRoute element={<ManageAccount />} allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/table-insurance-management",
    element: (
      <ProtectLayoutRoute
        element={<TableInsuranceManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/package-policy",
    element: (
      <ProtectLayoutRoute element={<PackagePolicy />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/package-policy/:id",
    element: (
      <ProtectLayoutRoute
        element={<PackagePolicyDetails />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/package-policy/create",
    element: (
      <ProtectLayoutRoute element={<CreatePackageForm />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/package-policy/edit/:id",
    element: (
      <ProtectLayoutRoute element={<EditPackageForm />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/statistic",
    element: <ProtectLayoutRoute element={<Statistic />}   allowedRoles={["Normal Staff","Admin"]} />,
  },
  {
    path: "/insurancePolicies",
    element: <ProtectLayoutRoute element={<TableInsuranceManagement   allowedRoles={["Normal Staff","Admin"]} />} />,
  },
  {
    path: "/insurances",
    element: <ProtectLayoutRoute element={<Insurance   allowedRoles={["Normal Staff","Admin"]} />} />,
  },
];
