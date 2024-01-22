import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import CustomerRequestForm from "../pages/users/customer-request-form";
import { ToastContainer } from "react-toastify";

jest.mock("node-fetch", () => ({
   __esModule: true,
   default: jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
   }),
}));

describe("CustomerRequestForm", () => {
   test("renders the component", () => {
      render(
         <BrowserRouter>
            <CustomerRequestForm />
         </BrowserRouter>
      );
      expect(
         screen.getByText("Create new register request for insurance")
      ).toBeInTheDocument();
   });

   test("displays policy package information", async () => {
      render(
         <BrowserRouter>
            <CustomerRequestForm />
         </BrowserRouter>
      );

      // Simulate API call delay
      await waitFor(() => {});

      // Assuming you have a specific text from the policy package, adjust the following line accordingly
      expect(screen.getByText("Package Name")).toBeInTheDocument();
      expect(screen.getByText("Package Description")).toBeInTheDocument();
   });

   test("submits form when data is complete", async () => {
      render(
         <BrowserRouter>
            <ToastContainer />
            <CustomerRequestForm />
         </BrowserRouter>
      );

      // Simulate API call delay
      await waitFor(() => {});

      fireEvent.change(
         screen.getByTestId("periodic", { labelledBy: "periodic" }),
         {
            target: { value: "Quarter" },
         }
      );

      fireEvent.submit(screen.getByRole("form"));

      // Wait for the form submission
      await waitFor(() => {});

      // Assert on the success message or navigation
      expect(
         await screen.findByText("Contact to staffs to fill in information")
      ).toBeInTheDocument();
   });

   // Add more tests as needed for other functionalities and interactions
});
