import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

function ConfirmPayment() {
   const [data, setData] = useState([]);
   const searchParams = useSearchParams();
   const navigate = useNavigate();

   const authFetch = axios.create({
      baseURL: "https://localhost:44384/api",
   });
   const sendData = async () => {
      const token = searchParams.get("token");
      const PayerID = searchParams.get("PayerID");

      const data = await authFetch.get(
         `/Payments/ConfirmPayment?token=${token}&PayerID=${PayerID}`
      );
      setData(data.data);
      navigate("/payment/checkout");
   };

   useEffect(() => {
      sendData();
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
