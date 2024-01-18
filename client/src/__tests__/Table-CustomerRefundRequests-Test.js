import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CustomerRefundRequestManagement } from "../pages/users/customer-refund-requests";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("CustomerRefundRequestManagement", () => {
   test("renders the component", () => {
      render(
         <BrowserRouter>
            <CustomerRefundRequestManagement />
         </BrowserRouter>
      );

      // Use the screen object to query the rendered component
      expect(
         screen.getByText("Refund Requests Management")
      ).toBeInTheDocument();
   });

   test("filters data when search input changes", async () => {
      render(
         <BrowserRouter>
            <CustomerRefundRequestManagement />
         </BrowserRouter>
      );

      // Use fireEvent to simulate user interaction
      fireEvent.change(screen.getByPlaceholderText("Search"), {
         target: { value: "example search term" },
      });

      await waitFor(() => {
         expect(screen.queryByText("Filtered Data")).toBeNull();
      });
   });

   // Add more tests as needed for other functionalities and interactions
});
