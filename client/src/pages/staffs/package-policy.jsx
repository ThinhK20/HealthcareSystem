import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllPackage,
  InActivePackage,
  ActivePackage,
} from "../../apis/policyPackageApis";

function PackagePolicy() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await getAllPackage();
    console.log(data);
    setData(data);
  };

  const handleInActive = async (id, index) => {
    const temp = await InActivePackage(id);
    if (temp.status == "Success") {
      toast.success("InActive success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      let temp2 = [...data];
      temp2[index].status = "InActive";
      setData(temp2);
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
  };
  const handleActive = async (id, index) => {
    const temp = await ActivePackage(id);
    if (temp.status == "Success") {
      toast.success("Active success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      let temp2 = [...data];
      temp2[index].status = "Active";
      setData(temp2);
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
  };
  //    const handleDelete = async (index) => {
  //       console.log(index);
  //       const api = await deletePolicy(index);
  //       console.log(11111111, api);
  //       const updatedData = data.filter((item) => item.policyID !== index);
  //       toast.success("Deleted successfully !");
  //       setData(updatedData);
  //    };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
        <Link
          type="button"
          to={`/staffs/package-policy/create`}
          state={{ status: "create" }}
          className="  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <FontAwesomeIcon icon={faPlus} /> New
        </Link>

        <section className="mb-20 text-gray-800">
          <div className="block rounded-lg shadow-lg bg-white">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full mb-0">
                      <thead className="border-b rounded-t-lg text-left">
                        <tr>
                          <th
                            scope="col"
                            className="rounded-tl-lg text-medium text-blue-600 font-medium px-6 py-4"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="text-medium text-blue-600 font-medium px-6 py-4"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-medium text-blue-600 font-medium px-6 py-4"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="text-medium text-blue-600 font-medium px-6 py-4"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="rounded-tr-lg text-medium text-blue-600 font-medium px-6 py-4"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "border-b bg-gray-100"
                                : "border-b"
                            }
                          >
                            <th
                              className="text-sm font-medium px-6 py-4 whitespace-nowrap text-left"
                              scope="row"
                            >
                              {index + 1}
                            </th>
                            <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                              {item.name}
                            </td>
                            <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                              {item.description}
                            </td>
                            <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left text-gray-500">
                              {item.status}
                            </td>
                            <td className="text-large font-normal px-6 py-4 whitespace-nowrap text-right flex ">
                              <Link
                                to={`/staffs/package-policy/${item.packageid}`}
                                state={{
                                  status: "update",
                                  id: item.packageid,
                                  name: item.name,
                                  description: item.description,
                                }}
                                className="font-large text-black-600 hover:text-black-700 focus:text-black-700 active:text-black-800 transition duration-300 ease-in-out"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Link>
                              <Link
                                to={`/staffs/package-policy/edit/${item.packageid}`}
                                className="font-large ml-4 text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                              {item.status === "Active" ? (
                                <div
                                  onClick={() =>
                                    handleInActive(item.packageid, index)
                                  }
                                  href=""
                                  className="cursor-pointer font-large ml-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                >
                                  <FontAwesomeIcon icon={faBan} />
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    handleActive(item.packageid, index)
                                  }
                                  href=""
                                  className="cursor-pointer font-large ml-4 text-green-600 hover:text-green-700 focus:text-green-700 active:text-green-800 transition duration-300 ease-in-out"
                                >
                                  <FontAwesomeIcon icon={faCheck} />
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PackagePolicy;
