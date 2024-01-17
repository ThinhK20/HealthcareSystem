import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePolicy, getAll } from "../../apis/insurancePoliciesApis";
import LoadingWrapper from "../../components/loading/loading";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "../../components/pagination/pagination";

function TableInsuranceManagement() {
   const [data, setData] = useState([]);
   const [confirm, setConfirm] = useState(0);
   const [idDelete, setIdDelete] = useState(-1);
   const [loading, setLoading] = useState(false);
   const [searchInput, setSearchInput] = useState("");
   const [newPage, setNewPage] = useState(0);
   const [dataFilter, setDataFilter] = useState([]);
   const [dataAfterFilter, setDataAfterFilter] = useState([]);

   const itemsPerPage = 1;
   const handlePageChange = (newPage) => {
      const startIndex = (newPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      if(searchInput.length == 0 ){
         setData(dataFilter.slice(startIndex, endIndex));

      }
      else{
         setData(dataAfterFilter.slice(startIndex, endIndex));

      }
      setNewPage(newPage)
   };

   const getData = async () => {
      setLoading(true);
      const data = await getAll();
      console.log(11111111, data.data);
      setData(data.slice(0, itemsPerPage));
      setDataFilter(data);
      setLoading(false);
   };
   const handleDelete = async (index) => {
      setConfirm(0);
      console.log(index);
      const api = await deletePolicy(index);
      console.log(11111111, api);
      const updatedData = data.filter((item) => item.policyID !== index);
      toast.success("Deleted successfully !");
      setData(updatedData);
   };
   useEffect(() => {
      getData();
   }, []);
   useEffect(() => {

      const startIndex = (newPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      console.log("Start: ", startIndex, "End: ", endIndex)
      const newdata = dataFilter.filter(
         (item) =>
            item.name.toLowerCase().includes(searchInput) ||
            item.description.toLowerCase().includes(searchInput)
      )
      setData(
         newdata.slice(startIndex , endIndex)
      );
      setDataAfterFilter(newdata)
   }, [searchInput]);
   return (
      <>
         <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
            <div className="flex justify-between">
               <div>
                  <Link
                     type="button"
                     to={`/staffs/insurancePolices/form`}
                     state={{ status: "create" }}
                     className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                     <FontAwesomeIcon icon={faPlus} /> New
                  </Link>
               </div>
               <div className="w-full max-w-[24rem]">
                  <Input
                     onChange={(e) => setSearchInput(e.target.value)}
                     label="Search by Name or Description"
                     icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
               </div>
            </div>

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
                                          Insuarance Policy ID
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
                                          <td className="text-large font-normal px-6 py-4 whitespace-nowrap text-right">
                                             <Link
                                                to={`/insuarancePolices/form`}
                                                state={{
                                                   status: "update",
                                                   id: item.policyID,
                                                   name: item.name,
                                                   description:
                                                      item.description,
                                                }}
                                                className="font-large text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out"
                                             >
                                                <FontAwesomeIcon
                                                   icon={faEdit}
                                                />
                                             </Link>
                                             <a
                                                onClick={() => {
                                                   setConfirm(1);
                                                   setIdDelete(item.policyID);
                                                }}
                                                href="#!"
                                                className="font-large ml-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 transition duration-300 ease-in-out"
                                             >
                                                <FontAwesomeIcon
                                                   icon={faTrash}
                                                />
                                             </a>
                                             {confirm === 1 && (
                                                <>
                                                   <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                                                      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
                                                         <button
                                                            onClick={() =>
                                                               setConfirm(0)
                                                            }
                                                         >
                                                            <svg
                                                               xmlns="http://www.w3.org/2000/svg"
                                                               className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right"
                                                               viewBox="0 0 320.591 320.591"
                                                            >
                                                               <path
                                                                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                                                  data-original="#000000"
                                                               ></path>
                                                               <path
                                                                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                                                  data-original="#000000"
                                                               ></path>
                                                            </svg>
                                                         </button>
                                                         <div className="my-8 text-center">
                                                            <svg
                                                               xmlns="http://www.w3.org/2000/svg"
                                                               className="w-16 fill-red-500 inline"
                                                               viewBox="0 0 24 24"
                                                            >
                                                               <path
                                                                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                                  data-original="#000000"
                                                               />
                                                               <path
                                                                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                                  data-original="#000000"
                                                               />
                                                            </svg>
                                                            <h4 className="text-lg font-semibold mt-6">
                                                               Are you sure you
                                                               want to delete
                                                               it?
                                                            </h4>
                                                         </div>
                                                         <div className="flex flex-col space-y-2">
                                                            <button
                                                               type="button"
                                                               onClick={() =>
                                                                  handleDelete(
                                                                     idDelete
                                                                  )
                                                               }
                                                               className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
                                                            >
                                                               Delete
                                                            </button>
                                                            <button
                                                               type="button"
                                                               onClick={() =>
                                                                  setConfirm(0)
                                                               }
                                                               className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                                                            >
                                                               Cancel
                                                            </button>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </>
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
            <div className="flex justify-center items-center text-center">
               <Pagination
                  totalItems={searchInput.length == 0 ? dataFilter.length : dataAfterFilter.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
               />
            </div>
         </div>
         <LoadingWrapper open={loading} />
      </>
   );
}

export default TableInsuranceManagement;
