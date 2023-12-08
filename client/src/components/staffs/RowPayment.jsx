import React from "react";
import { formatDate, formatMoney } from '../../helpers/dataHelper'
import { useNavigate  } from 'react-router-dom';
function RowTableStaffsPayment(props) {
    const navigate = useNavigate();
      const handleClick = () => {
    // Chuyển đến trang mới, ví dụ '/payment-details' với ID là props.item.paymentId
    // navigate(`/payment/account/:id${props.item.paymentId}`);
  };

    return (
        <tr className="border-b dborder-gray-600 hover:bg-gray-100 dhover:bg-gray-700"
        onClick={handleClick}
        >
            <td className="px-4 py-2">
                <span className="bg-primary-100 text-primary-800 text-[#50505f] px-2 py-0.5 rounded dbg-primary-900 dtext-primary-300 text-[15px] font-[600] w-[200px]">
                {props.item.paymentId}
                </span>
            </td>
            <td className="pr-4 pl-2 py-2">
                <span className=" text-blue-700 text-sm font-medium px-2 py-0.5 rounded w-[200px]">
                  Request {props.item.requestId}
                </span>
            </td>
            <td className="px-4 py-2">
                <span className=" text-blue-700 text-sm font-medium px-2 py-0.5 rounded w-[200px] text-center">
                    {props.item.customerRequest.accountId}
                </span>
            </td>
            <td className="px-4 py-2 text-[15px] text-[black] font-[500]">
                {formatDate(props.item.createdDate)}
            </td>
            <td className="px-4 py-2 text-[15px] text-[black] font-[500] w-[200px]">
                <div className="w-full flex justify-end">

                {formatDate(props.item.updatedDate)}
                </div>
            </td>
            <td className="py-2 text-[15px] text-[black] font-[500] flex justify-end w-[280px] ">
                <span className="mr-[30px] font-[700] text-[#215521]">{formatMoney(props.item.price)}</span>
            </td>
            <td className="px-4 py-2 text-[15px] text-[black] font-[500] w-[300px]">
                <div className="flex justify-center items-center w-[100%]">
                    <div className={`w-[15px] h-[15px] mr-[10px] rounded-full ${props.item.status ? "bg-[green] ml-[-48px]" : "bg-[red]"}`}></div>
                    <div>{props.item.status ? 'Completed' : 'Payment pending'}</div>
                </div>
            </td>
        </tr>
    );
}

export default RowTableStaffsPayment;
