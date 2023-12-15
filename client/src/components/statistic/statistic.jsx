import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AccountType } from "../../enums/account-type";
import { getAllRefundRequestsApi } from "../../apis/refundRequestApis";

export default function Statistic() {
   const [accounts, setAccount] = useState([]);
   const [refundRequests, setRefundRequests] = useState([]);
   const [payments, setPayments] = useState([]);

   const accountTypes = useMemo(() => {
      if (!accounts || accounts.length === 0) return null;
      const customerAccounts = accounts.filter(
         (a) => a.role === AccountType.Customer
      );
      const staffAccounts = accounts.filter(
         (a) => a.role === AccountType.Staff
      );

      return {
         customers: customerAccounts,
         staffs: staffAccounts,
      };
   }, [accounts]);

   const revenues = useMemo(() => {
      if (!refundRequests || refundRequests.length === 0) return null;
      if (!payments || payments.length === 0) return null;

      let salesAmount = 0;
      let cost = 0;
      refundRequests.forEach((rr) => (cost += rr.price));
      payments.forEach((p) => (salesAmount += p.price));
      return {
         salesAmount,
         cost,
      };
   }, [refundRequests, payments]);

   useEffect(() => {
      axios.get("https://localhost:44384/get-all-account").then((result) => {
         setAccount(result.data);
      });

      axios
         .get(`https://localhost:44384/api/Payments/GetAllPaymentRequests`)
         .then((response) => {
            setPayments(response.data);
         });

      getAllRefundRequestsApi().then((res) => {
         setRefundRequests(res.data);
      });
   }, []);

   console.log(accountTypes?.customers.map((c) => c.accountId));
   return (
      <>
         <BarChart
            width={500}
            height={300}
            series={[
               { data: [revenues?.cost], label: "Cost", stack: "stack1" },
               {
                  data: [revenues?.salesAmount],
                  label: "Sales Amount",
                  stack: "stack1",
               },
            ]}
            xAxis={[{ data: ["Revenue"], scaleType: "band" }]}
         />

         <PieChart
            series={[
               {
                  data: [
                     {
                        id: 0,
                        value: accountTypes?.customers?.length,
                        label: "Customers",
                     },
                     {
                        id: 1,
                        value: accountTypes?.staffs?.length,
                        label: "Staffs",
                     },
                  ],
               },
            ]}
            width={400}
            height={200}
         />
      </>
   );
}
