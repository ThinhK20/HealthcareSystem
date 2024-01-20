import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Chip,
  Select,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@material-tailwind/react";
import { Option } from "@material-tailwind/react";
import ChipDropDown from "../../components/chipdropdown/chipdropdown";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faEye,
  faFilter,
  faL,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingData from "../../components/loading/loadingData";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Paging from "../../components/pagination/pagination";

import { getAll, solveInquiry } from "../../apis/customerInquiryApi";
import { formatDate } from "../../helpers/dataHelper";

const TABLE_HEAD = [
  "Date sent ",
  "Full Name",
  "Email ",
  "Phone",
  "Question",
  "Staff solve",
  "Status",
];
const ITEM_PER_PAGE = 5;

export default function ViewInquiry() {
  const [load, setLoad] = useState(false);
  const [inquiry, setInquiry] = useState();
  const [tableRows, setTableRows] = useState([]);
  const [filterTableRows, setFilterTableRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isStatus, setIsStatus] = useState(0);
  const [paginationIndex, setPaginationIndex] = useState({
    startIndex: 0,
    endIndex: ITEM_PER_PAGE,
  });
  useEffect(() => {
    async function getData() {
      const temp = await getAll();
      if (temp.status === "Success") {
        setInquiry(temp.data);
        console.log(temp.status);
        setLoad(true);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setTableRows(() => {
      const newRows = inquiry?.map((inquiry) => ({
        inquiryID: inquiry.inquiryID,
        fullname: inquiry.fullName,
        phone: inquiry.phone,
        email: inquiry.email,
        dateQuestion: inquiry.dateQuestion,
        question: inquiry.question,
        status: inquiry.status,
        staffName: inquiry.staffName,
      }));
      return newRows;
    });
    setFilterTableRows(() => {
      const newRows = inquiry?.map((inquiry) => ({
        inquiryID: inquiry.inquiryID,
        fullname: inquiry.fullName,
        phone: inquiry.phone,
        email: inquiry.email,
        dateQuestion: inquiry.dateQuestion,
        question: inquiry.question,
        status: inquiry.status,
        staffName: inquiry.staffName,
      }));
      return newRows?.slice(0, ITEM_PER_PAGE);
    });
  }, [inquiry]);

  //   useEffect(() => {
  //     setFilterTableRows(() => {
  //       return filterTableRowsByStatus(tableRows, true);
  //     });
  //   }, [searchInput, isStatus, paginationIndex]);

  function onFilter() {
    setIsStatus((oldState) => {
      let newState = oldState + 1;
      if (newState >= 3) newState = 0;
      return newState;
    });
  }

  useEffect(()=>{
    console.log(filterTableRows)
  },[filterTableRows])

  //   function filterTableRowsByStatus(rowsData, isPaging = false) {
  //     switch (isStatus) {
  //       case 0:
  //         return !isPaging
  //           ? rowsData?.filter((r) =>
  //               r.username.toLowerCase().includes(searchInput.toLowerCase())
  //             )
  //           : rowsData
  //               ?.filter((r) =>
  //                 r.username.toLowerCase().includes(searchInput.toLowerCase())
  //               )
  //               ?.slice(paginationIndex.startIndex, paginationIndex.endIndex);
  //       case 1:
  //         return !isPaging
  //           ? rowsData?.filter(
  //               (r) =>
  //                 r.status === "Active" &&
  //                 r.username.toLowerCase().includes(searchInput.toLowerCase())
  //             )
  //           : rowsData
  //               ?.filter(
  //                 (r) =>
  //                   r.status === "Active" &&
  //                   r.username.toLowerCase().includes(searchInput.toLowerCase())
  //               )
  //               ?.slice(paginationIndex.startIndex, paginationIndex.endIndex);
  //       case 2:
  //         return !isPaging
  //           ? rowsData?.filter(
  //               (r) =>
  //                 r.status === "Deleted" &&
  //                 r.username.toLowerCase().includes(searchInput.toLowerCase())
  //             )
  //           : rowsData
  //               ?.filter(
  //                 (r) =>
  //                   r.status === "Deleted" &&
  //                   r.username.toLowerCase().includes(searchInput.toLowerCase())
  //               )
  //               ?.slice(paginationIndex.startIndex, paginationIndex.endIndex);
  //     }
  //   }

  function onPageChange(newPage) {
    const startIndex = (newPage - 1) * ITEM_PER_PAGE;
    const endIndex = startIndex + ITEM_PER_PAGE;
    setPaginationIndex(() => ({
      startIndex,
      endIndex,
    }));
  }

  const updateFieldChanged = async (index, value, inquiryID) => {
    console.log(index, value, inquiryID);
    let newArr = [...filterTableRows];
    newArr[index].status = value;
    if (value === "Solve") {
      const data1 = {
        inquiryId: inquiryID,
        staffId: localStorage.getItem("accountId"),
      };
      console.log(data1)
      newArr[index].staffName = localStorage.getItem("fullname")
      const result = await solveInquiry(data1);
    }
    setFilterTableRows(newArr);
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Inquiry Management
              </Typography>
              {/* <Typography color="gray" className="mt-1 font-normal">
                There are a total of <strong>{accounts?.length}</strong>{" "}
                customers in the system, and here are the details:
              </Typography> */}
            </div>

            <div className="flex w-full shrink-0 gap-4 md:w-max z-40">
              <div
                onClick={onFilter}
                className="flex items-center gap-1 py-2 px-4 hover:bg-gray-300 cursor-pointer rounded"
              >
                <FontAwesomeIcon icon={faFilter} />
                <span>Status</span>
              </div>
              <div className="w-full md:w-72">
                <Input
                  onChange={(e) => setSearchInput(e.target.value)}
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className=" px-0">
          {filterTableRows?.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filterTableRows?.map((tableRow, index) => {
                  const isLast = index === filterTableRows?.length - 1;
                  const classes = isLast
                    ? "p-4  "
                    : "p-4 border-b border-blue-gray-50 ";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3  ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatDate(tableRow.dateQuestion)}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tableRow.fullname}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tableRow.email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tableRow.phone}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tableRow.question}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tableRow.staffName === null
                              ? "No one"
                              : tableRow.staffName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        {tableRow.status === "Not Solve" ? (
                          <ChipDropDown
                            items={["Solve"]}
                            selectedItem={tableRow.status}
                            onChanged={updateFieldChanged}
                            index={index}
                            inquiryID={tableRow.inquiryID}
                          />
                        ) : (
                          <ChipDropDown
                            items={["Solved"]}
                            selectedItem={tableRow.status}
                            disable={true}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <LoadingData></LoadingData>
            </>
          )}
        </CardBody>
        {/* <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Paging
            totalItems={filterTableRowsByStatus(tableRows)?.length}
            itemsPerPage={ITEM_PER_PAGE}
            onPageChange={onPageChange}
          />
        </CardFooter> */}
      </Card>
    </div>
  );
}
