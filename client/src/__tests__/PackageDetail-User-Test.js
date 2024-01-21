import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InsurancePackage from "../pages/insurancePackage/insurance-package.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";
import { getAllPackageById } from "../apis/policyPackageApis.js";

const fakeData = {
   packageid: 20,
   name: "test edit",
   description: "test",
   status: "Active",
   packageDetails: [
      {
         packageID: 20,
         policyID: 1,
         payoutPrice: 0.36,
         maxRefundPerExamination: -1.0,
         maxRefundPerDay: -1.0,
         maxRefundPeYear: -1.0,
         insurancePolicy: {
            policyID: 1,
            name: "Test1",
            description: "1111",
            packageDetailsDomain: [],
            refundRequestsDomain: [],
         },
      },
      {
         packageID: 20,
         policyID: 2,
         payoutPrice: 0.54,
         maxRefundPerExamination: -1.0,
         maxRefundPerDay: -1.0,
         maxRefundPeYear: -1.0,
         insurancePolicy: {
            policyID: 2,
            name: "Test2",
            description: "1111",
            packageDetailsDomain: [],
            refundRequestsDomain: [],
         },
      },
      {
         packageID: 20,
         policyID: 4,
         payoutPrice: 0.15,
         maxRefundPerExamination: -1.0,
         maxRefundPerDay: -1.0,
         maxRefundPeYear: -1.0,
         insurancePolicy: {
            policyID: 4,
            name: "Test4",
            description: "1111",
            packageDetailsDomain: [],
            refundRequestsDomain: [],
         },
      },
   ],
   basicPrices: [
      {
         packageID: 20,
         indexId: 1,
         fromAge: 1,
         toAge: 20,
         gender: "Female",
         price: 1200.0,
      },
      {
         packageID: 20,
         indexId: 2,
         fromAge: 1,
         toAge: 20,
         gender: "Male",
         price: 1100.0,
      },
      {
         packageID: 20,
         indexId: 3,
         fromAge: 21,
         toAge: 25,
         gender: "Female",
         price: 1000.0,
      },
   ],
};

jest.mock("../apis/policyPackageApis.js", () => ({
   ...jest.requireActual("../apis/policyPackageApis.js"),
   getAllPackageById: jest.fn(() => fakeData),
}));


describe("PackageDetailUser", () => {
   beforeEach(() => {
      // Reset mocks and clear any previous interactions
      jest.clearAllMocks();
   });
   it("renders without data", async () => {
      render(
         <BrowserRouter>
            <InsurancePackage />
         </BrowserRouter>
      );
      // Add assertions based on your component's initial state or rendering logic
      expect(screen.getByTestId('loading')).toBeInTheDocument();
   });
   it("render all payment when API call succeeds", async () => {
      render(
         <BrowserRouter>
            <InsurancePackage />
         </BrowserRouter>
      );

      await waitFor(() => {
         expect(screen.getByText("2.", {exact:false})).toHaveTextContent('2. Test2: 1111');
         expect(screen.getByText("54%")).toBeInTheDocument();
         expect(screen.getByText("$1,100.00")).toBeInTheDocument();
      });
   });
});
