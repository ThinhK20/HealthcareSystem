import { Button, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import LoadingWrapper from "../../components/loading/loading";

const Paging = (props) => {
   const [loading, setLoading] = useState(false);

   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

   const handlePageChange = (event, newPage) => {
      setTimeout(() => {
         setLoading(false);
      }, 300);
      setLoading(true);
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
         <LoadingWrapper open={loading} />
      </>
   );
};

export default Paging;
