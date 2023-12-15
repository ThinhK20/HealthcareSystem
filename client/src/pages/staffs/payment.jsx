import { useState, useEffect } from "react";
import RowTableStaffsPayment from "../../components/staffs/RowPayment";
import { getPayments } from "../../apis/paymentApis";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { formatMoney } from "../../helpers/dataHelper";
const StaffsPayment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const acc = searchParams.get("acc");
  const [stagePayment, setStagaPayment] = useState([]);
  const [Payments, SetPayments] = useState([]);
  const [reset, SetReset] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [status, SetStatus] = useState(0);
  const [filterByAccountId, setFilterByAccountId] = useState(false);
  const [filterByPaymentId, setFilterByPaymentId] = useState(false);
  const [filterByRequestId, setFilterByRequestId] = useState(false);

  const handleReset = () => {
    SetReset(!reset);
  };

  const findOrders = (value) => {
    setSearchValue(value);
  };
  const filterStatus = () => {
    if (status === 2) {
      setStagaPayment(Payments);
      SetStatus(() => 0);
    } else if (status === 1) {
      setStagaPayment(Payments?.filter((item) => item.status === true));
      SetStatus(() => status + 1);
    } else if (status === 0) {
      setStagaPayment(Payments?.filter((item) => item.status === false));
      SetStatus(() => status + 1);
    }
  };

  useEffect(() => {
    getPayments().then((response) => {
      SetPayments(response);
      setStagaPayment(response);
      console.log(response);
    });
    if (acc != null) {
      setFilterByAccountId(true);
      setSearchValue(acc);
    }
  }, [reset]);

  const filteredPayments = stagePayment?.filter((item) => {
    const searchLower = searchValue.toLowerCase();
    const matchesSearch =
      item.requestId.toString().toLowerCase().includes(searchLower) ||
      item.paymentId.toString().toLowerCase().includes(searchLower) ||
      item.customerRequest.accountId
        .toString()
        .toLowerCase()
        .includes(searchLower);

    const matchesFilter =
      (!filterByAccountId ||
        item.customerRequest.accountId
          .toString()
          .toLowerCase()
          .includes(searchLower)) &&
      (!filterByPaymentId ||
        item.paymentId.toString().toLowerCase().includes(searchLower)) &&
      (!filterByRequestId ||
        item.requestId.toString().toLowerCase().includes(searchLower));

    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredPayments?.reduce(
    (acc, payment) => acc + payment.price,
    0
  );

  // Số tiền đang chờ chuyển (có thể giả định là số tiền của các khoản thanh toán có status là false)
  const pendingAmount = filteredPayments?.reduce((acc, payment) => {
    return payment.status === false ? acc + payment.price : acc;
  }, 0);

  // Số tiền đã chuyển (có thể giả định là số tiền của các khoản thanh toán có status là true)
  const transferredAmount = filteredPayments?.reduce((acc, payment) => {
    return payment.status === true ? acc + payment.price : acc;
  }, 0);
  return (
    <>
      <div className="w-[100%]">
        <div></div>
        <div className=" h-[80px] border-solid border-[black] border-b-[2px] flex justify-between">
          <div className="h-[80px] text-[24px] font-[600] mt-[10px] ml-[20px]">
            Payment Management
          </div>
        </div>
        <div className="w-[90%] m-auto">
          <div className="font-mono">
            {" "}
            The total amount is ={" "}
            <span className="font-[700] text-[blue]">
              {formatMoney(totalAmount)}
            </span>
          </div>
          <div className="font-mono">
            {" "}
            The amount transferred is ={" "}
            <span className="font-[700] text-[green]">
              {formatMoney(transferredAmount)}
            </span>{" "}
          </div>
          <div className="font-mono">
            {" "}
            The amount waiting for transfer ={" "}
            <span className="font-[700] text-[red]">
              {formatMoney(pendingAmount)}
            </span>{" "}
          </div>
        </div>
        <div className="bg-[white] h-[calc(100%_-_180px)]">
          <section className="bg-white dbg-gray-900 py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 mt-[10px]">
              <div className="relative overflow-hidden bg-white shadow-md dbg-gray-800 ">
                <div className="h-[40px] w-[500px] mb-[20px]">
                  <input
                    type="text"
                    placeholder="Enter Find Payments By AccountID,Username or Phone"
                    value={searchValue}
                    onChange={(e) => findOrders(e.target.value)}
                    className="p-[5px] h-[40px] w-[500px] bg-gray-200 rounded-[10px] border-[1px] border-[gray]"
                  />
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterByAccountId}
                      onChange={() => setFilterByAccountId(!filterByAccountId)}
                      className="mr-2"
                    />
                    Account ID
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterByPaymentId}
                      onChange={() => setFilterByPaymentId(!filterByPaymentId)}
                      className="mr-2"
                    />
                    Payment ID
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterByRequestId}
                      onChange={() => setFilterByRequestId(!filterByRequestId)}
                      className="mr-2"
                    />
                    Request ID
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dtext-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dbg-gray-700 dtext-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3 w-[200px]">
                          Payment ID
                        </th>
                        <th scope="col" className="px-4 py-3 w-[200px]">
                          Request ID
                        </th>
                        <th scope="col" className="px-4 py-3 w-[200px]">
                          Customer ID
                        </th>
                        <th scope="col" className="px-4 py-3 min-w-[120px]">
                          <div className="w-[100%] flex justify-end">
                            Created Date
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <div className="w-[100%] flex justify-end">
                            Paymented Date
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-3 w-[280px]">
                          <div className="w-[100%] flex justify-end">
                            <div className=" mr-[20px]">Price</div>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 flex justify-center w-[300px]"
                        >
                          <button
                            onClick={filterStatus}
                            className="flex justify-center items-center"
                          >
                            <FunnelIcon className="h-6 w-6 text-gray-500" />
                            <div className="">Status</div>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments?.map((item) => {
                        return (
                          <RowTableStaffsPayment
                            item={item}
                            key={item.paymentId}
                            handleReset={handleReset}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default StaffsPayment;
