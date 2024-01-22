import { Input, TextareaAutosize, Typography, Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListHealthRecord } from "../../apis/customerRequestApis";
import { toast } from "react-toastify";
import { formatMoney } from "../../helpers/dataHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../helpers/dataHelper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function HealthRecords() {
  const [data, setData] = useState(null);
  const [dropDetail, SetDropDetail] = useState(false);
  const [dropBasicPrice, SetDropBasicPricel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getData(id) {
      const temp = await getListHealthRecord(id);
      if (temp === undefined) {
        toast.error("Error", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        temp.sort((a, b) => {
          if (a.phase < b.phase) return -1;
          if (a.phase > b.phase) return 1;

          if (a.indexRecord < b.indexRecord) return -1;
          if (a.indexRecord > b.indexRecord) return 1;

          return 0;
        });
        setData(temp);
      }
    }
    getData(searchParams.get("id"));
  }, []);


  return (
    <>
      <div className="bg-gray-50 dr:bg-slate-900 w-full">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div className="sm:w-11/12 mx-auto">
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dr:bg-gray-800">
              <Link className="mb-5 " to={`/staffs/manage-account`}>
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

              <div>
                <Link
                  type="button"
                  to={`/staffs/AddNewHealthRecord?id=${searchParams.get("id")}`}
                  state={{ status: "create" }}
                  className="  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  <FontAwesomeIcon icon={faPlus} /> New
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200">
                    Health Records
                  </h3>
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
                List Record
              </h3>
              <div className="transition-max-height duration-1000 ease-in-out overflow-hidden mt-1 ">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                  <div className="hidden sm:grid sm:grid-cols-4">
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Index
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Description
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Record Date
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Phase
                    </div>
                  </div>
                  <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                  {data?.map((detail, index) => (
                    <div key={index} className="sm:grid sm:grid-cols-4">
                      <div className="text-start">{`${index + 1}`}</div>
                      <div className="text-start">{`${detail.description}`}</div>

                      <div className="text-start">
                        {formatDate(detail.recordDate)}
                      </div>

                      <div className="text-start">{detail.phase}</div>
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
