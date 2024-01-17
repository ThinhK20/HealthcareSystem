import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableInsuranceManagement from "../pages/insuarancePolices/table-insurance-management";
import { BrowserRouter } from "react-router-dom";

describe("TableInsuranceManagement Component", () => {
   test("renders table and pagination", async () => {
      render(
         <BrowserRouter>
            <TableInsuranceManagement />
         </BrowserRouter>
      );

      const { getByLabelText } = render(
         <BrowserRouter>
            <TableInsuranceManagement />
         </BrowserRouter>
      );
      expect(getByText("Insurance Policy ID")).toBeInTheDocument();
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("Description")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Yes")).toBeInTheDocument();

      // You may add more specific assertions based on your component's structure
   });

   test("handles page change", async () => {
      render(
         <BrowserRouter>
            <TableInsuranceManagement />
         </BrowserRouter>
      );
      const { getByLabelText } = render(
         <BrowserRouter>
            <TableInsuranceManagement />
         </BrowserRouter>
      );

      // Mock the getAll function to return some dummy data
      jest.spyOn(global, "getAllPolicies").mockResolvedValueOnce([
         { policyID: 1, name: "Policy 1", description: "Description 1" },
         { policyID: 2, name: "Policy 2", description: "Description 2" },
         // Add more data as needed
      ]);

      // Simulate an API call to fetch data
      fireEvent.click(getByText("New"));

      // Wait for the data to be loaded
      await waitFor(() => {
         // You can add assertions to check if the data is displayed on the table
         expect(getByText("Policy 1")).toBeInTheDocument();
         expect(getByText("Policy 2")).toBeInTheDocument();
      });

      // Simulate a page change
      fireEvent.click(getByText("2"));

      // Wait for the new page to be loaded
      await waitFor(() => {
         // Add assertions for the updated data on the table after page change
         expect(getByText("Updated Policy 3")).toBeInTheDocument();
         // Add more assertions as needed
      });
   });

   // Add more tests as needed for other functionalities in your component
});
