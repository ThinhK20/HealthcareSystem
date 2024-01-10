import { Button, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";

const Paging = (props) => {
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

   const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
      props.onPageChange(newPage);
   };
   return (
      <>
         <Pagination
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
         />
      </>
   );
};

export default Paging;
