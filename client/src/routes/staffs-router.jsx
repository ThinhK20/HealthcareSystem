import LayoutRoute from "../shared/layout/layout";
import StaffsPayment from "../pages/staffs/payment";
import StaffRequestDetail from "../pages/staffs/request-detail";
import FormCreateNewStaff from "../pages/staffs/createStaffAccount";
import { RefundRequestManagement } from "../pages/staffs/manage-refund-request";
import RefundRequestDetails from "../pages/staffs/refund-request-details";
import TableInsuranceManagement from "../components/insuarancePolices/table-insurance-management";
import { ManageAccount } from "../pages/staffs/manage-account";
export const StaffRoutes = [
    { path: "staffs/payment", element: <LayoutRoute element={<StaffsPayment />} /> },
    { path: "staffs/request-detail/:id", element: <LayoutRoute element={<StaffRequestDetail />} /> },
    { path: "staffs/create-staff-account/", element: <LayoutRoute element={<FormCreateNewStaff />} /> },
    { path: "/staffs/refund-requests", element: <LayoutRoute element={<RefundRequestManagement />} /> },
    { path: "/staffs/refund-requests/:id", element: <LayoutRoute element={<RefundRequestDetails />} /> },
    { path: "/staffs/manage-account", element: <LayoutRoute element={<ManageAccount />} /> },
    {path: "staffs/table-insurance-management",element:  <LayoutRoute element={<TableInsuranceManagement />}></LayoutRoute>},
  ];