import React from "react";
import CongratCard from "../../components/card/congratcard";

export function IndexFunction() {
   return (
      <div className="grid lg:grid-cols-3 grid-cols-1  w-full m-auto gap-10">
         <div className="m-auto">
            <CongratCard
               title="Manage Accounts"
               link="/staffs/manage-account"
               content="This section allows you to efficiently manage staff accounts and their related information."
               color="bg-[#90cfe0]"
            />
         </div>
         <div className="m-auto">
            <CongratCard
               title="Manage Payments"
               link="/staffs/payment"
               content="Effortlessly handle payment transactions and related activities with this feature."
               color="bg-[#1570e8]"
            />
         </div>
         <div className="m-auto">
            <CongratCard
               title="Manage Refunds"
               link="/staffs/refund-requests"
               content="Process and track refund requests from customers in a streamlined manner."
               color="bg-[#0928ed]"
            />
         </div>
         <div className="m-auto">
            <CongratCard
               title="Manage Requests"
               link="/staffs/customer-requests"
               content="Stay on top of customer requests and respond promptly with this management tool."
               color="bg-[#6e41e0]"
            />
         </div>
         <div className="m-auto">
            <CongratCard
               title="Manage Insurances"
               link="/staffs/table-insurance-management"
               content="Efficiently organize and manage insurance-related data and processes."
               color="bg-[#b215eb]"
            />
         </div>
         <div className="m-auto">
            <CongratCard
               title="Create Accounts"
               link="/staffs/create-staff-account"
               content="Easily create new staff accounts and set up their profiles using this feature."
               color="bg-[#28ede0]"
            />
         </div>
      </div>
   );
}
