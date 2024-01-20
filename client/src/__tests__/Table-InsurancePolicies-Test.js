import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableInsuranceManagement from "../pages/insuarancePolices/table-insurance-management";
import { BrowserRouter } from "react-router-dom";
import Form from "../pages/insuarancePolices/form";

describe("TableInsuranceManagement Component", () => {
   test("renders table and pagination", async () => {
      render(
         <BrowserRouter>
            <TableInsuranceManagement />
         </BrowserRouter>
      );
   });
});
