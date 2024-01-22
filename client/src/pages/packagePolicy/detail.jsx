import {
  Input,
  TextareaAutosize,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPackageById } from "../../apis/policyPackageApis";
import { toast } from "react-toastify";
import { formatMoney } from "../../helpers/dataHelper";
import { Chip } from "@material-tailwind/react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../helpers/dataHelper";

export default function PackagePolicyDetails() {
  const [data, setData] = useState({});
  const params = useParams();
  const [dropDetail, SetDropDetail] = useState(false);
  const [dropBasicPrice, SetDropBasicPricel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const temp = await getAllPackageById(params.id);
      console.log(temp);
      setData(temp);
    }
    getData();
  }, []);

  const handleDropDetail = () => {
    SetDropDetail(!dropDetail);
  };
  const handleDropBasicPrice = () => {
    SetDropBasicPricel(!dropBasicPrice);
  };

  const backToManagement = () => {
    navigate("/staffs/refund-requests");
  };

  return (
    <>
      <div className="bg-gray-50 dr:bg-slate-900 w-full">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 mx-auto">
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dr:bg-gray-800">
              <Link className="mb-5 " to={`/staffs/package-policy`}>
                <button
                  type="button"
                  className=" ml-auto w-full flex items-center justify-center  px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto "
                >
                  <svg
                    className="w-5 h-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <span>Go back</span>
                </button>
              </Link>
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
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dr:text-gray-200 m-auto">
                    Package #{data?.packageid}
                  </h2>
                  <div className=" text-gray-500 flex mt-3 justify-center">
                    Status:{" "}
                    <span className="font-[600] ml-3">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={data?.status}
                        color={data?.status === "Active" ? "blue" : "red"}
                      />
                    </span>
                  </div>
                  <div className="mt-4 not-italic text-gray-800 dr:text-gray-200"></div>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                    Package name: {data?.name}
                  </h3>
                  <span className="text-lg font-semibold text-gray-800 dr:text-gray-200"></span>
                  <div className="mt-2 not-italic text-gray-500">
                    Description : {data?.description}
                  </div>
                </div>
                {/* <div className="sm:text-end space-y-2">
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
                </div> */}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200 mt-5">
                List Policy
              </h3>
              <div className="transition-max-height duration-1000 ease-in-out overflow-hidden mt-1 ">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                  <div className="hidden sm:grid sm:grid-cols-4">
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Index
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Name
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Percent Payout(%)
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Max refund per request
                    </div>
                    
                  </div>
                  <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                  {data?.packageDetails?.map((detail, index) => (
                    <div
                      key={detail.policyID}
                      className="sm:grid sm:grid-cols-4"
                    >
                      <div className="text-start">{`${index + 1}`}</div>
                      <div className="text-start">{`${detail.insurancePolicy.name}`}</div>

                      <div className="text-start">
                        {Number.parseInt(detail.payoutPrice * 100)}%
                      </div>

                      <div className="text-start">
                        {detail.maxRefundPerExamination !== 0
                          ? formatMoney(detail.maxRefundPerExamination)
                          : "No limit"}
                      </div>

                      
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200 mt-5">
                List Basic Price
              </h3>
              <div className="transition-max-height duration-1000 ease-in-out overflow-hidden mt-1 ">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                  <div className="hidden sm:grid sm:grid-cols-5">
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Index
                    </div>

                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Gender
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      From age
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      To age
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Price
                    </div>
                  </div>
                  <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                  {data?.basicPrices?.map((detail, index) => (
                    <div
                      key={detail.indexId}
                      className="sm:grid sm:grid-cols-5"
                    >
                      <div className="text-start">{`${index + 1}`}</div>
                      <div className="text-start">{`${detail.gender}`}</div>

                      <div className="text-start">{detail.fromAge}</div>

                      <div className="text-start">{detail.toAge}</div>

                      <div className="text-start">
                        {formatMoney(detail.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
