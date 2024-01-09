import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createPolicy, updatePolicy } from "../../apis/insurancePoliciesApis";
import { Select, Option } from "@material-tailwind/react";
import {
  getAllPolicy,
  editPackage,
  getAllPackageById,
} from "../../apis/policyPackageApis";
import { formatMoney } from "../../helpers/dataHelper";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

export default function EditPackageForm() {
  const navigateTo = useNavigate();
  const params = useParams();

  const [data, setData] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [load, setLoad] = useState(true);
  const [policy, setPolicy] = useState([]);
  const [listPolicy, setListPolicy] = useState([]);
  const [listBasicPrice, setListBasicPrice] = useState([]);

  const [policyId, setPolicyId] = useState(null);
  const [listName, setListName] = useState([]);

  const [payoutPrice, setPayoutPrice] = useState(0);
  const [maxRefundPerExamination, setMaxRefundPerExamination] = useState(0);
  const [maxRefundPerDay, setMaxRefundPerDay] = useState(0);
  const [maxRefundPeYear, setMaxRefundPeYear] = useState(0);

  const [gender, setGender] = useState("");
  const [fromAge, setFromAge] = useState(0);
  const [toAge, setToAge] = useState(0);
  const [price, setPrice] = useState(0);

  const [policyError, setPolicyError] = useState(false);
  const [policyError2, setPolicyError2] = useState(false);
  const [payoutError, setPayoutError] = useState(false);

  const [genderError, setGenderError] = useState(false);
  const [fromAgeError, setFromAgeError] = useState(false);
  const [toAgeError, setToAgeError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [basicPriceError, setBasicPriceError] = useState(false);

  const [selectMode, setSelectMode] = useState("Policy");
  const [listCreateError, setListCreateError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleAdd = () => {
    console.log(payoutPrice);
    let hasError = policyId === null || payoutPrice <= 0 || payoutPrice > 100;
    if (hasError) {
      setPolicyError(policyId === null);
      setPayoutError(payoutPrice <= 0 || payoutPrice > 100);
    } else {
      setPolicyError(false);
      setPayoutError(false);

      const found = listPolicy.find((policy) => policy.PolicyId === policyId);
      if (found !== undefined) {
        setPolicyError2(true);
      } else {
        let f = policy.find((p) => p.policyID === policyId);
        let name = f.name;
        setPolicyError2(false);
        let newElement = {
          PackageID: data.packageid,
          PolicyId: policyId,
          PayoutPrice: payoutPrice / 100,
          MaxRefundPerExamination:
            maxRefundPerExamination === 0 ? null : maxRefundPerExamination,
          MaxRefundPerDay: maxRefundPerDay === 0 ? null : maxRefundPerDay,
          MaxRefundPeYear: maxRefundPeYear === 0 ? null : maxRefundPeYear,
        };
        setListPolicy((oldArray) => [...oldArray, newElement]);
        setListName((oldArray) => [...oldArray, name]);
      }
    }
  };

  const handleAdd2 = () => {
    let hasError =
      gender === "" ||
      toAge <= 0 ||
      fromAge <= 0 ||
      price <= 0 ||
      fromAge > toAge;
    if (hasError) {
      setGenderError(gender === "");
      setToAgeError(toAge <= 0 || fromAge > toAge);
      setFromAgeError(fromAge <= 0 || fromAge > toAge);
      setPriceError(price <= 0);
    } else {
      setGenderError(false);
      setToAgeError(false);
      setFromAgeError(false);
      setPriceError(false);
      let found = listBasicPrice.find(
        (element) =>
          (element.fromAge <= fromAge &&
            element.toAge >= fromAge &&
            element.gender === gender) ||
          (element.fromAge <= toAge &&
            element.toAge >= toAge &&
            element.gender === gender) ||
          (element.fromAge >= fromAge &&
            element.toAge <= toAge &&
            element.gender === gender)
      );

      console.log(found);
      if (found !== undefined) {
        setBasicPriceError(true);
      } else {
        setBasicPriceError(false);
        let newElement = {
          PackageID: data.packageid,
          FromAge: fromAge,
          ToAge: toAge,
          Gender: gender,
          Price: price,
        };
        let temp = [...listBasicPrice];
        temp.push(newElement);
        temp.sort((a, b) => {
          // Compare based on firstValue
          if (a.Gender < b.Gender) return -1;
          if (a.Gender > b.Gender) return 1;

          // If firstValue is equal, compare based on secondValue
          if (a.FromAge < b.FromAge) return -1;
          if (a.FromAge > b.FromAge) return 1;

          // If both firstValue and secondValue are equal
          return 0;
        });
        setListBasicPrice(temp);
      }
    }
  };

  async function sendData(data) {
    try {
      const temp = await editPackage(data);
      if (temp.status == "Success") {
        toast.success("Edit success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigateTo("/staffs/package-policy/");
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
    let temp = [...listPolicy];
    let temp2 = [...listName];
    temp.splice(index, 1);
    temp2.splice(index, 1);
    setListPolicy(temp);
    setListName(temp2);
  };
  const handleDeleteItemInListBasicPrice = (index) => {
    let temp = [...listBasicPrice];
    temp.splice(index, 1);
    setListBasicPrice(temp);
  };

  const handleEdit = () => {
    if (
      listBasicPrice.length === 0 ||
      listPolicy.name === 0 ||
      name === "" ||
      description === ""
    ) {
      setNameError(name === "");
      setDescriptionError(description === "");
      setListCreateError(listBasicPrice.length === 0 || listPolicy.name === 0);
    } else {
      setNameError(false);
      setDescriptionError(false);
      setListCreateError(false);
      let temp = listBasicPrice;
      temp.forEach((element, index) => {
        element.IndexId = index + 1;
      });
      let data1 = {
        Packageid: data.packageid,
        Name: name,
        Description: description,
        PackageDetails: listPolicy,
        BasicPrices: temp,
      };
      console.log(data1);
      sendData(data1);
    }
  };

  useEffect(() => {
    async function getData() {
      const temp = await getAllPolicy();
      setPolicy(temp);
    }
    async function getData2() {
      const temp = await getAllPackageById(params.id);
      setData(temp);
    }
    getData();
    getData2();
  }, []);

  //   useEffect(() => {
  //     console.log(listPolicy);
  //   }, [listPolicy]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log(data);
      const temp = data.packageDetails.map((element) => ({
        PackageID: element.packageID,
        PolicyId: element.policyID,
        PayoutPrice: element.payoutPrice,
        MaxRefundPerExamination:
          element.maxRefundPerExamination === 0
            ? null
            : element.maxRefundPerExamination,
        MaxRefundPerDay:
          element.maxRefundPerDay === 0 ? null : element.maxRefundPerDay,
        MaxRefundPeYear:
          element.maxRefundPeYear === 0 ? null : element.maxRefundPeYear,
      }));
      console.log(temp);
      setListPolicy(temp);
      const temp2 = data.basicPrices.map((element) => ({
        PackageID: data.packageid,
        FromAge: element.fromAge,
        ToAge: element.toAge,
        Gender: element.gender,
        Price: element.price,
      }));
      console.log("AAAA", temp2);
      temp2.sort((a, b) => {
        // Compare based on firstValue
        if (a.Gender < b.Gender) return -1;
        if (a.Gender > b.Gender) return 1;

        // If firstValue is equal, compare based on secondValue
        if (a.FromAge < b.FromAge) return -1;
        if (a.FromAge > b.FromAge) return 1;

        // If both firstValue and secondValue are equal
        return 0;
      });
      console.log("BBBBB", temp2);

      setListBasicPrice(temp2);
      let name = data.packageDetails.map((x) => x.insurancePolicy.name);
      setListName(name);
      setName(data.name);
      setDescription(data.description);
    }
  }, [data]);

  return (
    <>
      {load === true && (
        <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12 w-full">
          <div className="relative py-3  sm:mx-auto w-3/4">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className=" mx-auto">
              <Link className="mb-5 " to={`/staffs/package-policy`}>
                    <button
                      type="button"
                      class=" ml-auto w-full flex items-center justify-center  px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto "
                    >
                      <svg
                        class="w-5 h-5 rtl:rotate-180"
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
                <div className="flex items-center space-x-5">
                  <div className="block font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed text-blue-600 text-4xl">
                      Edit package #{data?.packageid}
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <form className="mx-auto">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          defaultValue={data?.name}
                        />
                        <label
                          htmlFor="name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Name
                        </label>
                        {nameError && (
                          <div
                            class="pt-2 text-sm text-yellow-800 rounded-lg "
                            role="alert"
                          >
                            <span class="font-medium">Please check name</span>
                          </div>
                        )}
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="description"
                          id="description"
                          className="block pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          required
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          defaultValue={data?.description}
                        />
                        <label
                          htmlFor="description"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Description
                        </label>
                        {descriptionError && (
                          <div
                            class="pt-2 text-sm text-yellow-800 rounded-lg "
                            role="alert"
                          >
                            <span class="font-medium">
                              Please check description
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="items-center  mt-6 mb-10">
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-1.5 rounded-md focus:outline-none"
                        >
                          Create
                        </button>
                        {listCreateError && (
                          <div
                            class="pt-2 text-sm text-yellow-800 rounded-lg "
                            role="alert"
                          >
                            <span class="font-medium">
                              Please add policy or basic price
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="w-full mb-4">
                        <button
                          type="button"
                          className={`w-1/2 ${
                            selectMode === "Policy" ? "bg-zinc-300" : ""
                          }`}
                          onClick={() => {
                            setSelectMode("Policy");
                          }}
                        >
                          Add Policy
                        </button>
                        <button
                          type="button"
                          className={`w-1/2 ${
                            selectMode === "Price" ? "bg-zinc-300" : ""
                          }`}
                          onClick={() => {
                            setSelectMode("Price");
                          }}
                        >
                          Add Basic Price
                        </button>
                      </div>
                      {selectMode === "Policy" && (
                        <div className="">
                          <div className="pr-3">
                            <Select
                              variant="outlined"
                              label="Policy name"
                              onChange={(e) => {
                                console.log(e);
                                setPolicyId(e);
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

                              {policy.map((p, index) => {
                                return (
                                  <Option key={index} value={p.policyID}>
                                    {p.name}
                                  </Option>
                                );
                              })}
                            </Select>
                            {policyError && (
                              <div
                                class="pt-2 text-sm text-yellow-800 rounded-lg "
                                role="alert"
                              >
                                <span class="font-medium">
                                  Please check policy
                                </span>
                              </div>
                            )}
                            {policyError2 && (
                              <div
                                class="pt-2 text-sm text-yellow-800 rounded-lg "
                                role="alert"
                              >
                                <span class="font-medium">
                                  Please check policy
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex pt-5">
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="payout"
                                id="payout"
                                className="block pt-6  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                                onChange={(e) => {
                                  setPayoutPrice(Number(e.target.value));
                                }}
                                min={1}
                                max={100}
                              />
                              <label
                                htmlFor="payout"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Percent Payout (%)
                              </label>
                              {payoutError && (
                                <div
                                  class="pt-2 text-xs text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span class="font-medium">
                                    Please check payout price
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="exam"
                                id="exam"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setMaxRefundPerExamination(
                                    Number(e.target.value)
                                  );
                                }}
                              />
                              <label
                                htmlFor="exam"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Max Refund Per Examination($)
                              </label>
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="day"
                                id="day"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setMaxRefundPerDay(Number(e.target.value));
                                }}
                              />
                              <label
                                htmlFor="day"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Max Refund Per Day($)
                              </label>
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="year"
                                id="year"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setMaxRefundPeYear(Number(e.target.value));
                                }}
                              />
                              <label
                                htmlFor="year"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Max Refund Per Year($)
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
                            <h2 className="mt-4">List Policy</h2>
                            <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                                <div className="hidden sm:grid sm:grid-cols-5 w-11/12">
                                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                    Name
                                  </div>
                                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                    Percent Payout
                                  </div>
                                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                    Max refund
                                    <br />
                                    per examination
                                  </div>
                                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                    Max refund
                                    <br />
                                    per day
                                  </div>
                                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                                    Max refund
                                    <br />
                                    per year
                                  </div>
                                </div>
                                <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>

                                {listPolicy?.map((detail, index) => (
                                  <div className="flex">
                                    <div
                                      key={detail.PolicyId}
                                      className="sm:grid sm:grid-cols-5 w-11/12"
                                    >
                                      <div className="text-start">{`${listName[index]}`}</div>

                                      <div className="text-start">
                                        {parseInt(detail.PayoutPrice * 100)}%
                                      </div>

                                      <div className="text-start">
                                        {detail.MaxRefundPerExamination !== 0 &&
                                        detail.MaxRefundPerExamination !== null
                                          ? formatMoney(
                                              detail.MaxRefundPerExamination
                                            )
                                          : "No limit"}
                                      </div>

                                      <div className="text-start">
                                        {detail.MaxRefundPerDay !== 0 &&
                                        detail.MaxRefundPerDay !== null
                                          ? formatMoney(detail.MaxRefundPerDay)
                                          : "No limit"}
                                      </div>

                                      <div className="text-start">
                                        {detail.MaxRefundPeYear !== 0 &&
                                        detail.MaxRefundPeYear !== null
                                          ? formatMoney(detail.MaxRefundPeYear)
                                          : "No limit"}
                                      </div>
                                    </div>
                                    <div>
                                      <a
                                        onClick={() =>
                                          handleDeleteItemInListPolicy(index)
                                        }
                                        href="#!"
                                        className="font-large ml-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectMode === "Price" && (
                        <div className="">
                          <div className="flex pt-5">
                            <div className="relative z-0 w-full group mr-3">
                              <Select
                                variant="outlined"
                                label="Gender"
                                onChange={(e) => {
                                  console.log(e);
                                  setGender(e);
                                }}
                              >
                                <Option key={1} value="Male">
                                  Male
                                </Option>
                                <Option key={2} value="Female">
                                  Female
                                </Option>
                              </Select>
                              {genderError && (
                                <div
                                  class="pt-2 text-sm text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span class="font-medium">
                                    Please check gender
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="fromAge"
                                id="fromAge"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setFromAge(Number(e.target.value));
                                }}
                              />
                              <label
                                htmlFor="fromAge"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                From Age
                              </label>
                              {fromAgeError && (
                                <div
                                  class="pt-2 text-sm text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span class="font-medium">
                                    Please check value
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="toAge"
                                id="toAge"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setToAge(Number(e.target.value));
                                }}
                              />
                              <label
                                htmlFor="toAge"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                To Age
                              </label>
                              {toAgeError && (
                                <div
                                  class="pt-2 text-sm text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span class="font-medium">
                                    Please check value
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="relative z-0 w-full group mr-3">
                              <input
                                type="number"
                                name="price"
                                id="price"
                                className="block pt-6 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none da:text-white da:border-gray-600 da:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                onChange={(e) => {
                                  setPrice(Number(e.target.value));
                                }}
                              />
                              <label
                                htmlFor="price"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 da:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:da:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Price
                              </label>
                              {priceError && (
                                <div
                                  class="pt-2 text-sm text-yellow-800 rounded-lg "
                                  role="alert"
                                >
                                  <span class="font-medium">
                                    Please check value
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          {basicPriceError && (
                            <div
                              class="pt-2 text-sm text-yellow-800 rounded-lg text-center "
                              role="alert"
                            >
                              <span class="font-medium">
                                Please check value
                              </span>
                            </div>
                          )}
                          <div className="items-center space-x-4 mt-6">
                            <button
                              type="button"
                              onClick={handleAdd2}
                              className="bg-blue-500 flex justify-center items-center w-full text-white px-2 py-1.5 rounded-md focus:outline-none"
                            >
                              Add
                            </button>
                          </div>
                          <div>
                            <h2 className="mt-4">List Basic Price</h2>
                            <div className="transition-max-height duration-1000 ease-in-out overflow-hidden ">
                              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                                <div className="hidden sm:grid sm:grid-cols-5">
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

                                {listBasicPrice.map((detail, index) => (
                                  <div
                                    key={index}
                                    className="sm:grid sm:grid-cols-5"
                                  >
                                    <div className="text-start">{`${detail.Gender}`}</div>

                                    <div className="text-start">
                                      {detail.FromAge}
                                    </div>

                                    <div className="text-start">
                                      {detail.ToAge}
                                    </div>

                                    <div className="text-start">
                                      {formatMoney(detail.Price)}
                                    </div>
                                    <div>
                                      <a
                                        onClick={() =>
                                          handleDeleteItemInListBasicPrice(
                                            index
                                          )
                                        }
                                        href="#!"
                                        className="font-large ml-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                  {/* <div className="pt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  {title_btn}
                </button>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
