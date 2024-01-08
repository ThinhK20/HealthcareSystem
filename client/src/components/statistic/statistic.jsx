/* eslint-disable no-unused-vars */
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { AccountType } from "../../enums/account-type";
import { getAllRefundRequestsApi } from "../../apis/refundRequestApis";
import { getAccounts } from "../../apis/accountApis";
import { getPayments } from "../../apis/paymentApis";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";

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
      payments?.forEach?.((p) => (salesAmount += p.price));
      refundRequests?.forEach((r) => (cost += r.totalRefundFee));
      return {
         salesAmount,
         cost,
      };
   }, [refundRequests, payments]);

   const groupRevenuesByMonth = useMemo(() => {
      if (!refundRequests || refundRequests.length === 0) return null;
      if (!payments || payments.length === 0) return null;

      const groupPaymentsByMonth = {};
      const groupRefundRequestsByMonth = {};
      const months = [];
      payments?.forEach?.((p) => {
         const month = new Date(p.createdDate)?.getMonth() + 1;
         if (!months?.includes(month)) months?.push(month);
         if (!groupPaymentsByMonth[month]) {
            groupPaymentsByMonth[month] = [p];
         } else groupPaymentsByMonth[month].push(p);
      });

      refundRequests?.forEach?.((r) => {
         const month = new Date(r.dateSend).getMonth() + 1; // TODO: use dateRefund instead
         if (!months.includes(month)) months.push(month);
         if (!groupRefundRequestsByMonth[month]) {
            groupRefundRequestsByMonth[month] = [r];
         } else groupRefundRequestsByMonth[month].push(r);
      });

      const salesAmounts = Object.entries(groupPaymentsByMonth).map(
         ([_, values]) => {
            let salesAmount = 0;
            values.forEach((value) => (salesAmount += value.price));
            return salesAmount;
         }
      );

      const costs = Object.entries(groupRefundRequestsByMonth).map(
         ([_, values]) => {
            let cost = 0;
            values.forEach((value) => (cost += value.totalRefundFee));
            return cost;
         }
      );

      return { salesAmounts, costs, months: months.sort((a, b) => a - b) };
   }, [refundRequests, payments]);

   useEffect(() => {
      Promise.all([getAccounts(), getPayments(), getAllRefundRequestsApi()])
         .then((values) => {
            setAccount(values[0]);
            setPayments(values[1]);
            setRefundRequests(values[2].data);
         })
         .catch((err) => toast.error(err));
   }, []);

   return (
      <div>
         <Typography variant="h3" className="w-full block mb-8">
            Statistic Dashboard
         </Typography>
         <div className="flex items-center flex-wrap gap-20">
            <BarChart
               width={500}
               layout="vertical"
               height={300}
               series={[
                  {
                     data: [revenues?.cost],
                     label: "Cost",
                     stack: "stack1",
                     id: "costId",
                  },
                  {
                     data: [revenues?.salesAmount],
                     label: "Sales Amount",
                     stack: "stack2",
                     id: "salesAmountId",
                  },
               ]}
               xAxis={[
                  { data: ["Total Cost & Sales Amount"], scaleType: "band" },
               ]}
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
            {groupRevenuesByMonth && (
               <LineChart
                  width={500}
                  height={300}
                  xAxis={[
                     { data: groupRevenuesByMonth?.months, scaleType: "point" },
                  ]}
                  series={[
                     { data: groupRevenuesByMonth?.costs, label: "Cost" },
                     {
                        data: groupRevenuesByMonth?.salesAmounts,
                        label: "Sales Amount",
                     },
                  ]}
               />
            )}
         </div>
      </div>
   );
}
