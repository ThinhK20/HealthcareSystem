import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate, formatMoney } from "../../helpers/dataHelper";
import { Button, Typography } from "@material-tailwind/react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@material-tailwind/react";
import {
  accecptRequest,
  getCustomerRequestByIdApi,
  refuseRequest,
} from "../../apis/customerRequestApis";
import { getPaymentsByID } from "../../apis/paymentApis";
const StaffRequestDetail = () => {
  const [data, setData] = useState();
  const [reset, setReset] = useState(false);
  const [dropPayment, SetDropPaymet] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const handleReset = () => {
    setReset(!reset);
  };
  const { id } = useParams();
  useEffect(() => {
    getCustomerRequestByIdApi(id)
      .then((result) => {
        setData(result);
        getPaymentsByID(result.requestID)
          .then((request) => {
            setPaymentDetail(request);
          })
          .catch((error) => {
            console.error("Error fetching payment details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching customer requests:", error);
      });
  }, [reset]);
  const handleAccept = () => {
    accecptRequest(id, 1).then(handleReset);
  };
  const handRefused = () => {
    refuseRequest(id).then(handleReset);
  };
  // const handComplete = () => {
  //   axios
  //     .post(`https://localhost:44384/api/users/CompleteRequest/${id}`)
  //     .then(handleReset);
  // };
  const handleDropPaymet = () => {
    SetDropPaymet(!dropPayment);
  };
  return (
    <>
      <div className="bg-gray-50 dr:bg-slate-900 w-full">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dr:bg-gray-800">
              <div className="flex justify-between">
                <div>
                  <img
                    className=""
                    width={90}
                    src="https://cdn.discordapp.com/attachments/1160172654825840763/1182624713445474314/5fa7ceca-d37d-46c7-9095-412d10fdfdcb-removebg-preview.png?ex=65856017&is=6572eb17&hm=611614dd184c7058387e271965d269332dc9cb820e560f4a4d515bea8bbe787a&"
                    alt=""
                  />

                  <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dr:text-white">
                    Healtih Solutions.
                  </h1>
                </div>
                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dr:text-gray-200">
                    Customer Request #{data?.requestID}
                  </h2>
                  <div className=" text-gray-500 flex mt-3 justify-center">
                    Status:{" "}
                    <span className="font-[600] ml-3">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={data?.status}
                        color={
                          data?.status === "Pending Transfer"
                            ? "blue"
                            : data?.status === "Pending Confirmation"
                            ? "amber"
                            : "green"
                        }
                      />
                    </span>
                  </div>
                  <div className="mt-4 not-italic text-gray-800 dr:text-gray-200"></div>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                    Username request: {data?.account?.username}
                  </h3>
                  <span className="text-lg font-semibold text-gray-800 dr:text-gray-200"></span>
                  <div className="mt-2 not-italic text-gray-500">
                    Confirmation staff : #{data?.staff?.accountId}
                  </div>
                </div>
                <div className="sm:text-end space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">
                        Request Date :
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {formatDate(data?.dateRequest)}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">
                        Accept Date :
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {formatDate(data?.dateAccept)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-[30px] font-[700] leading-none opacity-70"
              >
                Package Request
              </Typography>
              <>
                <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                  <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                    <div className="hidden sm:grid sm:grid-cols-4">
                      <div className="sm:col-span text-xs font-medium text-gray-500 uppercase">
                        Package ID
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase text-center">
                        Name{" "}
                      </div>
                      <div className="text-center w-full text-xs font-medium text-gray-500 uppercase col-span-2">
                        Description
                      </div>
                    </div>
                    <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <div className="sm:col-span text-xs font-medium text-gray-500  uppercase">
                        Package #{data?.policyPackage?.packageid}
                      </div>
                      <div className="text-center text-xs font-medium text-gray-500 uppercase px-[40px]">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={data?.policyPackage?.name}
                          color={
                            data?.policyPackage?.name === "Basic"
                              ? "green"
                              : data?.policyPackage?.name === "Premium"
                              ? "amber"
                              : "blue"
                          }
                        />
                      </div>
                      <div className="pl-[30px] text-start w-full text-xs font-medium text-gray-500 uppercase col-span-2">
                        {data?.policyPackage?.description}
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <Button
                onClick={handleDropPaymet}
                className="w-full h-[30px] mt-6 bg-[white] text-[black] p-[3px]"
              >
                <span className="mr-[5px]">Payment</span>
                {dropPayment ? (
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                )}
              </Button>
              {dropPayment && (
                <>
                  <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                      <div className="hidden sm:grid sm:grid-cols-5">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                          Payment ID
                        </div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">
                          Price
                        </div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">
                          Transfer date
                        </div>
                        <div className="text-end text-xs font-medium text-gray-500 uppercase">
                          Status
                        </div>
                      </div>
                      <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                      {paymentDetail?.map((payment) => (
                        <div
                          key={payment.paymentId}
                          className="sm:grid sm:grid-cols-5"
                        >
                          {/* Item (You can customize this based on your data) */}
                          <div className="sm:col-span-2">{`Payment ${payment.paymentId}`}</div>

                          {/* Qty (You can customize this based on your data) */}
                          <div className="text-start">
                            {formatMoney(payment.price)}
                          </div>

                          {/* Rate (You can customize this based on your data) */}
                          <div className="text-start">
                            {formatDate(payment.updatedDate)}
                          </div>

                          {/* Amount (You can customize this based on your data) */}
                          <div className="text-center">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={payment?.status ? "Paid" : "Pending"}
                              color={payment?.status ? "green" : "amber"}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-end my-[30px]">
                        <Link
                          to={`/staffs/payment?acc=${data?.staff?.accountId}`}
                          className="hover:underline hover:to-blue-800"
                          color="blue"
                        >
                          {" "}
                          View All Transaction{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-end space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2"></div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                  Thank you!
                </h4>
                <p className="text-gray-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">
                    example@site.com
                  </p>
                  <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">
                    +1 (062) 109-9222
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
            </div>

            <div className="mt-6 flex justify-around gap-x-3">
              {data?.status === "Pending Confirmation" && (
                <button
                  onClick={handleAccept}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Accept
                </button>
              )}
              {data?.status === "Pending Confirmation" && (
                <button
                  onClick={handRefused}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Refuse
                </button>
              )}

              {/* {data?.status === "Pending Transfer" && (
                <button
                  onClick={handComplete}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Complete
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StaffRequestDetail;
