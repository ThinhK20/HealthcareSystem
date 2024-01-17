import React from "react";
import { formatDate, formatMoney } from "../../helpers/dataHelper";
import { useNavigate } from "react-router-dom";
function RowTableUserPayment(props) {
  const navigate = useNavigate();
  const handleClick = () => {};

  return (
    <tr
      className="border-b dborder-gray-600 hover:bg-gray-100 dhover:bg-gray-700"
      onClick={handleClick}
    >
      <td className="px-4 py-2 ">
        <span className="bg-primary-100 text-primary-800 text-[#50505f]  py-0.5 rounded dbg-primary-900 dtext-primary-300 text-[15px] font-[600] ">
          {props.item.note}
        </span>
      </td>
      <td className="pr-4 pl-2 py-2 ">
        <span className=" text-blue-700 text-sm font-medium px-2 py-0.5 rounded ">
          {formatDate(props.item.createdDate)}
        </span>
      </td>
      <td className="px-4 py-2 ">
        <span className=" text-blue-700 text-sm font-medium px-2 py-0.5 rounded">
          {formatDate(props.item.expirationDate)}
        </span>
      </td>
      <td className="px-4 py-2 text-[15px] text-[black] font-[500]">
        {formatMoney(props.item.price)}
      </td>
      <td className="px-4 py-2 text-[15px] text-[black] font-[500] ">
        <div className="flex items-center w-[100%]">
          <div
            className={`w-[15px] h-[15px] mr-[10px] rounded-full ${
              props.item.status
                ? "bg-[green] "
                : Date.parse(props.item.createdDate) <= Date.now() &&
                  Date.parse(props.item.expirationDate) >= Date.now()
                ? "bg-[yellow]"
                : "bg-[red]"
            }`}
          ></div>
          <div>
            {props.item.status
              ? "Completed"
              : Date.parse(props.item.createdDate) <= Date.now() &&
                Date.parse(props.item.expirationDate) >= Date.now()
              ? "Wating payment"
              : "Payment pending"}
          </div>
        </div>
      </td>
      {/* <td className="px-4 py-2 text-[15px] text-[black] font-[500] flex ">
        <span className="mr-[30px] font-[700] text-[#215521]">
          {formatMoney(props.item.price)}
        </span>
      </td> */}
    </tr>
  );
}

export default RowTableUserPayment;
