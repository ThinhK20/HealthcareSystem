import LayoutRoute from "../shared/layout/layout";
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
export const StaffRoutes = [
  {
    path: "/staffs",
    element: (
      <LayoutRoute element={<IndexFunction />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/edit-information/:id",
    element: (
      <LayoutRoute element={<EditInformation />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/edit-account/:id",
    element: (
      <LayoutRoute element={<EditAccount />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "staffs/payment",
    element: (
      <LayoutRoute element={<StaffsPayment />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "staffs/request-detail/:id",
    element: (
      <LayoutRoute element={<StaffRequestDetail />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "staffs/create-staff-account/",
    element: (
      <LayoutRoute element={<FormCreateNewStaff />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/refund-requests",
    element: (
      <LayoutRoute
        element={<RefundRequestManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/insurances",
    element: <LayoutRoute element={<Insurance   allowedRoles={["Normal Staff","Admin"]} />} />,
  },
  {
    path: "/staffs/insurances/edit",
    element: <LayoutRoute element={<FormUpdate />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },
  {
    path: "/staffs/insurances/create",
    element: <LayoutRoute element={<FormCreate />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },

  {
    path: "/staffs/insurancePolices/form",
    element: <LayoutRoute element={<Form />}   allowedRoles={["Normal Staff","Admin"]}/>,
  },
  {
    path: "/staffs/customer-requests",
    element: (
      <LayoutRoute
        element={<StaffCustomerRequestManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/refund-requests/:id",
    element: (
      <LayoutRoute
        element={<RefundRequestDetails />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/manage-account",
    element: (
      <LayoutRoute element={<ManageAccount />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/table-insurance-management",
    element: (
      <LayoutRoute
        element={<TableInsuranceManagement />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/package-policy",
    element: (
      <LayoutRoute element={<PackagePolicy />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/package-policy/:id",
    element: (
      <LayoutRoute
        element={<PackagePolicyDetails />}
          allowedRoles={["Normal Staff","Admin"]}
      />
    ),
  },
  {
    path: "/staffs/package-policy/create",
    element: (
      <LayoutRoute element={<CreatePackageForm />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/package-policy/edit/:id",
    element: (
      <LayoutRoute element={<EditPackageForm />}   allowedRoles={["Normal Staff","Admin"]} />
    ),
  },
  {
    path: "/staffs/statistic",
    element: <LayoutRoute element={<Statistic />}   allowedRoles={["Normal Staff","Admin"]} />,
  },
  {
    path: "/insurancePolicies",
    element: <LayoutRoute element={<TableInsuranceManagement   allowedRoles={["Normal Staff","Admin"]} />} />,
  },
  
];
