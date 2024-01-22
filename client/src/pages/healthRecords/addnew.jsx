import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPolicy, updatePolicy } from "../../apis/insurancePoliciesApis";
import { Select, Option } from "@material-tailwind/react";
import { getAllPolicy, createNewPackage } from "../../apis/policyPackageApis";
import { getListFeeAffects, addnewHR } from "../../apis/customerRequestApis";
import { formatMoney } from "../../helpers/dataHelper";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function AddnewHR() {
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //    const location = useLocation();
  //    const { state } = location;
  //    const status = state?.status || "create";
  //    const id = state?.id || "";
  //    const name = state?.name || "";
  //    const description = state?.description || "";

  //   const [name, setName] = useState("");
  //   const [description, setDescription] = useState("");

  const [load, setLoad] = useState(true);
  const [listHR, setListHR] = useState([]);
  const [listFeeAffect, setListFeeAffect] = useState([]);
  //   const [listBasicPrice, setListBasicPrice] = useState([]);

  const [feeAffectId, setFeeAffectId] = useState(null);
  const [listName, setListName] = useState([]);

  const [description, setDescription] = useState("");
  //   const [maxRefundPerExamination, setMaxRefundPerExamination] = useState(0);
  //   const [maxRefundPerDay, setMaxRefundPerDay] = useState(0);
  //   const [maxRefundPerYear, setMaxRefundPerYear] = useState(0);

  //   const [gender, setGender] = useState("");
  //   const [fromAge, setFromAge] = useState(0);
  //   const [toAge, setToAge] = useState(0);
  //   const [price, setPrice] = useState(0);

  const [feeAffectError, setFeeAffectError] = useState(false);
  const [feeAffectError2, setFeeAffectError2] = useState(false);
  //   const [payoutError, setPayoutError] = useState(false);

  //   const [genderError, setGenderError] = useState(false);
  //   const [fromAgeError, setFromAgeError] = useState(false);
  //   const [toAgeError, setToAgeError] = useState(false);
  //   const [priceError, setPriceError] = useState(false);
  //   const [basicPriceError, setBasicPriceError] = useState(false);

  //   const [selectMode, setSelectMode] = useState("Policy");
  const [listCreateError, setListCreateError] = useState(false);
  //   const [nameError, setNameError] = useState(false);
  //   const [descriptionError, setDescriptionError] = useState(false);

  const handleAdd = () => {
    let hasError = feeAffectId === null;
    console.log(hasError);
    if (hasError) {
      setFeeAffectError(feeAffectId === null);
    } else {
      setFeeAffectError(false);

      const found = listHR.find((HR) => HR.feeAffectID === feeAffectId);
      if (found !== undefined) {
        setFeeAffectError2(true);
      } else {
        let f = listFeeAffect.find((p) => p.feeAffectId === feeAffectId);
        let name = f.feeAffectName;
        setFeeAffectError2(false);
        let newElement = {
          userID: searchParams.get("id"),
          description: description,
          recordDate: new Date(),
          feeAffectID: feeAffectId,
        };
        console.log(newElement);
        setListHR((oldArray) => [...oldArray, newElement]);
        setListName((oldArray) => [...oldArray, name]);
        //   console.log(listName);
      }
    }
  };

  async function sendDate(data) {
    try {
      const temp = await addnewHR(data);
      if (temp !== undefined) {
        toast.success("Create success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigateTo(`/staffs/HealthRecord?id=${searchParams.get("id")}`);
      } else {
        toast.error("Error", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteItemInListPolicy = (index) => {
    let temp = [...listHR];
    let temp2 = [...listName];
    temp.splice(index, 1);
    temp2.splice(index, 1);
    setListHR(temp);
    setListName(temp2);
  };

  const handleSave = () => {
    if (listHR.length === 0) {
      setListCreateError(listHR.length === 0);
    } else {
      setListCreateError(false);
      sendDate(listHR);
    }
  };

  useEffect(() => {
    async function getData() {
      const temp = await getListFeeAffects();
      if (temp !== undefined) {
        setLoad(false);
        setListFeeAffect(temp);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(listHR);
  }, [listHR]);

  useEffect(() => {
    console.log(load);
  }, [load]);

  return (
    <>
      {load === false && (
        <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12 w-full">
          <div className="relative py-3  sm:mx-auto w-3/4">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className=" mx-auto">
                <div className="w-fit ml-auto">
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
                </div>
                <div className="flex items-center space-x-5">
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed text-blue-600 text-4xl">
                      Add new health record
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <form className="mx-auto">
                      <div className="">
                        <div className="pr-3">
                          <Select
                            variant="outlined"
                            label="Fee affect"
                            onChange={(e) => {
                              console.log(e);
                              setFeeAffectId(e);
                            }}
                          >
                            {/* <Option key={1} value="HTML">
                                Material Tailwind HTML
                              </Option>
                              <Option key={2} value="React">
                                Material Tailwind React
                              </Option>
                              <Option key={3} value="Vue">
                                Material Tailwind Vue
                              </Option>
                              <Option key={4} value="Angular">
                                Material Tailwind Angular
                              </Option>
                              <Option key={5} value="Svelte">
                                Material Tailwind Svelte
                              </Option> */}

                            {listFeeAffect?.map((p, index) => {
                              return (
                                <Option key={index} value={p.feeAffectId}>
                                  {p.feeAffectName}
                                </Option>
                              );
                            })}
                          </Select>
                          {feeAffectError && (
                            <div
                              className="pt-2 text-sm text-yellow-800 rounded-lg "
                              role="alert"
                            >
                              <span className="font-medium">
                                Please check again
                              </span>
                            </div>
                          )}
                          {feeAffectError2 && (
                            <div
                              className="pt-2 text-sm text-yellow-800 rounded-lg "
                              role="alert"
                            >
                              <span className="font-medium">
                                Please check policy
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex pt-5">
                          <div className="relative z-0 w-full group mr-3">
                            <input
                              name="payout"
                              id="payout"
                              className="block pt-6  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              required
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                            <label
                              htmlFor="payout"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Description
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-6">
                          <button
                            type="button"
                            onClick={handleAdd}
                            className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-1.5 rounded-md focus:outline-none"
                          >
                            Add
                          </button>
                        </div>
                        <div>
                          <h2 className="mt-4">List</h2>
                          <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                            <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                              <div className="hidden sm:grid sm:grid-cols-3 w-11/12">
                                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                  Index
                                </div>
                                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                  Fee affect name
                                </div>
                                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                  Description
                                </div>
                              </div>
                              <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                              {listHR?.map((detail, index) => (
                                <div className="flex">
                                  <div
                                    key={detail.feeAffectID}
                                    className="sm:grid sm:grid-cols-3 w-11/12"
                                  >
                                    <div className="text-start">{`${
                                      index + 1
                                    }`}</div>

                                    <div className="text-start">{`${listName[index]}`}</div>

                                    <div className="text-start">
                                      {detail.description}
                                    </div>
                                  </div>
                                  <div>
                                    <a
                                      onClick={() =>
                                        handleDeleteItemInListPolicy(index)
                                      }
                                      className="font-large ml-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="items-center  mt-6 mb-10">
                              <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-1.5 rounded-md focus:outline-none"
                              >
                                Save
                              </button>
                              {listCreateError && (
                                <div
                                  className="pt-2 text-sm text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span className="font-medium">
                                    Please add fee affect
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
