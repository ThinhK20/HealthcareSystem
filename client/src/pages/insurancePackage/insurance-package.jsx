import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faL } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingWrapper from "../../components/loading/loading";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getAllPackageById } from "../../apis/policyPackageApis";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardMedia,
  CardActions,
} from "@mui/material";
import LoadingData from "../../components/loading/loadingData";
import { formatMoney } from "../../helpers/dataHelper";

function InsurancePackage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [load, setLoad] = useState({});

  const initialized = useRef(false);

  const getData = async (packageId) => {
    const data = await getAllPackageById(packageId);
    data.basicPrices.sort((a, b) => {
      // Compare based on firstValue
      if (a.gender < b.gender) return -1;
      if (a.gender > b.gender) return 1;

      // If firstValue is equal, compare based on secondValue
      if (a.fromAge < b.fromAge) return -1;
      if (a.fromAge > b.fromAge) return 1;

      // If both firstValue and secondValue are equal
      return 0;
    });
    console.log(data);
    setData(data === undefined ? {} : data);
  };

  useEffect(() => {
    const packageId = searchParams.get("packageId");

    getData(packageId);
  }, []);

  // useEffect(() => {
  //   if (data !== null) {
  //     data.basicPrices.sort((a, b) => {
  //       // Compare based on firstValue
  //       if (a.gender < b.gender) return -1;
  //       if (a.gender > b.gender) return 1;

  //       // If firstValue is equal, compare based on secondValue
  //       if (a.fromAge < b.fromAge) return -1;
  //       if (a.fromAge > b.fromAge) return 1;

  //       // If both firstValue and secondValue are equal
  //       return 0;
  //     });
  //     setLoad(true);
  //   }
  // }, [data]);

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <div className="container   mx-auto px-4 md:px-6 lg:px-12">
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg  bg-white">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <div>
                        <Typography
                          fontSize={30}
                          fontWeight={600}
                          className="text-[#1A1446]  w-fit py-[2px]"
                        >
                          Package {data?.name} detail
                        </Typography>
                      </div>
                      <table className="min-w-full text-left text-sm font-light shadow-lg">
                        <thead
                          className="border-b bg-white font-medium "
                          style={{ background: "#FFD000" }}
                        >
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              Policy name
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Refund info
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.packageDetails?.map((detail, index) => {
                            return (
                              <>
                                <tr className="border-b bg-neutral-100  ">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {index + 1}. {detail.insurancePolicy.name}:
                                    <span className="font-extralight">
                                      {" "}
                                      {detail.insurancePolicy.description}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr className="border-b  ">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    Percent refund
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {detail.payoutPrice * 100}%
                                  </td>
                                </tr>
                                <tr className="border-b bg-white ">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    Max refund per request
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {detail.maxRefundPerExamination > -1
                                      ? formatMoney(
                                          detail.maxRefundPerExamination
                                        )
                                      : "No limit"}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                      {/* ====================================== */}
                      <div>
                        <Typography
                          fontSize={30}
                          fontWeight={600}
                          className="text-[#1A1446]  w-fit py-[2px] pt-[60px]"
                        >
                          Price of package {data.name} *
                        </Typography>
                      </div>
                      <table className="min-w-full text-left text-sm font-light shadow-lg">
                        <thead
                          className="border-b bg-white font-medium "
                          style={{ background: "#FFD000" }}
                        >
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              Gender
                            </th>
                            <th scope="col" className="px-6 py-4">
                              From age
                            </th>
                            <th scope="col" className="px-6 py-4">
                              To age
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.basicPrices?.map((detail, index) => {
                            const classes =
                              index % 2 === 0
                                ? "border-b"
                                : "border-b bg-neutral-100";

                            return (
                              <>
                                <tr className={classes}>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {detail.gender}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {detail.fromAge}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {detail.toAge}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                    {formatMoney(detail.price)}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                        <span>
                          (*): Price does not include additional fees based on
                          the subscriber's health
                        </span>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          <LoadingData></LoadingData>
        </>
      )}
    </>
  );
}

export default InsurancePackage;
