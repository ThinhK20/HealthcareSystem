import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmPaymentApi } from "../../apis/paymentApis";
import { ToastContainer, toast } from "react-toastify";


function ConfirmPayment() {
   const [data, setData] = useState([]);
   const [searchParams, setSearchParams] = useSearchParams();
   const initialized = useRef(false)


   const navigate = useNavigate();

   const authFetch = axios.create({
      baseURL: "https://localhost:44384/api",
   });
   const sendData = async () => {
      const token = searchParams.get("token");
      const PayerID = searchParams.get("PayerID");

      const data = await ConfirmPaymentApi(token,PayerID)
      if (data.status === "Success"){
         toast.success("Payment complete !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/users/payment");
            navigate(0);
          }, 3000);
      }
      else{
         toast.error("Error while complete payment. Please contact customer service!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
         //  setTimeout(() => {
         //    navigate("/users/payment");
         //    navigate(0);
         //  }, 3000);
      }

      
   };

   useEffect(() => {
      if (!initialized.current) {
         initialized.current = true
         sendData();
       }
   }, []);
   return (
      <>
         <div className="m-auto">
            <CircularProgress />
         </div>
      </>
   );
}

export default ConfirmPayment;
