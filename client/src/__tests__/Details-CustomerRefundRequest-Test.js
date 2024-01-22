import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // Ensure you have this import
import CustomerRefundRequestDetails from "../pages/users/customer-refund-request-details";
import { BrowserRouter } from "react-router-dom";
import {
   getRefundRequestApiById,
   updateRefundRequestApi,
} from "../apis/refundRequestApis";

import { getAllRefundDetailsByRefundIdApi } from "../apis/refundDetailApis";

// Mock API functions and modules if needed
jest.mock("../apis/refundRequestApis.js", () => ({
   getRefundRequestApiById: jest.fn(() => Promise.resolve({ data: {} })),
   updateRefundRequestApi: jest.fn(() => Promise.resolve()),
}));
jest.mock("../apis/refundDetailApis.js", () => ({
   getAllRefundDetailsByRefundIdApi: jest.fn(() => Promise.resolve([])),
}));

jest.mock("react-toastify", () => ({
   toast: {
      success: jest.fn(),
      error: jest.fn(),
   },
}));

describe("CustomerRefundRequestDetails Component", () => {
   beforeEach(() => {
      // Reset mocks and clear any previous interactions
      jest.clearAllMocks();
   });

   it("renders without crashing", async () => {
      render(
         <BrowserRouter>
            <CustomerRefundRequestDetails />
         </BrowserRouter>
      );
      // Add assertions based on your component's initial state or rendering logic
   });

   it("fetches data and renders correctly", async () => {
      // Mock data for your test
      const mockData = {
         insurance: {
            account: {
               username: "mockUsername",
            },
         },
         hospitalName: "mockHospitalName",
         status: "mockStatus",
         description: "mockDescription",
         fileUrl: "mockFileUrl",
         totalRefundFee: 100,
      };

      // Mock the API responses
      getRefundRequestApiById.mockImplementationOnce(() =>
         Promise.resolve({ data: mockData })
      );
      getAllRefundDetailsByRefundIdApi.mockImplementationOnce(() =>
         Promise.resolve([])
      );

      render(
         <BrowserRouter>
            <CustomerRefundRequestDetails />
         </BrowserRouter>
      );

      // Add assertions based on your component's expected state or rendered content
      await waitFor(() => {
         expect(screen.getByLabelText("Username")).toHaveValue("mockUsername");
         expect(screen.getByLabelText("Status")).toHaveValue("mockStatus");
         expect(screen.getByLabelText("Reasons")).toHaveValue(
            "mockDescription"
         );
      });
   });

   it("handles user interactions and updates state", async () => {
      render(
         <BrowserRouter>
            <CustomerRefundRequestDetails />
         </BrowserRouter>
      );

      // Mock data for your test
      const mockData = {
         insurance: {
            account: {
               username: "mockUsername",
            },
         },
         hospitalName: "mockHospitalName",
         status: "mockStatus",
         description: "mockDescription",
         fileUrl: "mockFileUrl",
         totalRefundFee: 100,
      };

      // Mock the API responses
      getRefundRequestApiById.mockImplementationOnce(() =>
         Promise.resolve({ data: mockData })
      );
      getAllRefundDetailsByRefundIdApi.mockImplementationOnce(() =>
         Promise.resolve([])
      );

      // Simulate user interaction (example: updating the hospital name)
      userEvent.clear(screen.getByLabelText("Hospital Name"));
      userEvent.type(screen.getByLabelText("Hospital Name"), "NewHospitalName");

      // Check if the state is updated
      await waitFor(() => {
         expect(screen.getByLabelText("Hospital Name")).toHaveValue(
            "NewHospitalName"
         );
      });
   });

   // Add more test cases as needed
});
