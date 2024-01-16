import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingWrapper from "../../components/loading/loading";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
   Card,
   CardHeader,
   CardContent,
   Avatar,
   Typography,
   CardMedia,
   CardActions,
} from "@mui/material";
function InsurancePackage() {
   return (
      <>
         <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
            <section className="mb-20 text-gray-800">
               <div className="block rounded-lg shadow-lg bg-white">
                  <div className="flex flex-col">
                     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="overflow-hidden">
                              <div>
                                 <Typography
                                    fontSize={30}
                                    fontWeight={600}
                                    className="text-[#1A1446]  w-fit py-[20px]"
                                 >
                                    Bảo Hiểm Nhân Thọ
                                 </Typography>
                              </div>
                              <table class="min-w-full text-left text-sm font-light">
                                 <thead
                                    class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                                    style={{ background: "#FFD000" }}
                                 >
                                    <tr>
                                       <th scope="col" class="px-6 py-4">
                                          Quyền lợi bảo hiểm
                                       </th>
                                       <th scope="col" class="px-6 py-4">
                                          Cơ bản
                                       </th>
                                       <th scope="col" class="px-6 py-4">
                                          Cao cấp
                                       </th>
                                       <th scope="col" class="px-6 py-4">
                                          Toàn diện
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr class="border-b  dark:border-neutral-500 dark:bg-neutral-700">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium">
                                          1. Chính sách A
                                       </td>
                                    </tr>
                                    <tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                          Mô tả của chính sách A
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                    </tr>
                                    <tr class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                          Mức hoàn tối đa
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                    </tr>
                                 </tbody>
                                 <tbody>
                                    <tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium">
                                          1. Chính sách A
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4 font-medium"></td>
                                       <td class="whitespace-nowrap px-6 py-4 font-medium"></td>
                                       <td class="whitespace-nowrap px-6 py-4 font-medium"></td>
                                    </tr>
                                    <tr class="border-b dark:border-neutral-500 dark:bg-neutral-700">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                          Mô tả của chính sách A
                                       </td>
                                       <td class="whitespace -nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          Hoàn 50%
                                       </td>
                                    </tr>
                                    <tr class="border-b bg-neutral-100 bg-white dark:border-neutral-500 dark:bg-neutral-600">
                                       <td class="whitespace-nowrap px-6 py-4 font-medium pl-10">
                                          Mức hoàn tối đa
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                       <td class="whitespace-nowrap px-6 py-4">
                                          120/ ngày
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
         {/* <ToastContainer />
         <LoadingWrapper open={loading} /> */}
      </>
   );
}

export default InsurancePackage;
