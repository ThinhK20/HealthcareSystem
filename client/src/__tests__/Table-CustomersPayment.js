import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomersPayment from "../pages/users/payment.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import axios from "axios";
import { getPaymentsByAccountID } from "../apis/paymentApis";

const fakeData = {
  status: "Success",
  data: [
    {
      paymentId: 36,
      requestId: 13,
      createdDate: "2024-01-17T19:53:29.6983161",
      expirationDate: "2024-01-24T19:53:29.6984029",
      price: 3234.0,
      status: true,
      note: "1st payment of 4 payments test edit required on 17/1/2024",
    },
    {
      paymentId: 37,
      requestId: 13,
      createdDate: "2024-04-17T19:53:29.7572592",
      expirationDate: "2024-04-24T19:53:29.7572616",
      price: 3234.0,
      status: false,
      note: "2nd payment of 4 payments test edit required on 17/1/2024",
    },
    {
      paymentId: 38,
      requestId: 13,
      createdDate: "2024-07-17T19:53:29.7622826",
      expirationDate: "2024-07-24T19:53:29.7622853",
      price: 3234.0,
      status: false,
      note: "3rd payment of 4 payments test edit required on 17/1/2024",
    },
    {
      paymentId: 39,
      requestId: 13,
      createdDate: "2024-10-17T19:53:29.7647809",
      expirationDate: "2024-10-24T19:53:29.7647826",
      price: 3234.0,
      status: false,
      note: "4th payment of 4 payments test edit required on 17/1/2024",
    },
  ],
};

jest.mock("../apis/paymentApis.js", () => ({
  ...jest.requireActual("../apis/paymentApis.js"),
  getPaymentsByAccountID: jest.fn(() => fakeData),
}));

describe("CustomersPayment", () => {
  beforeEach(() => {
    // Reset mocks and clear any previous interactions
    jest.clearAllMocks();
    
  });
  it("renders without data", async () => {
    render(
      <BrowserRouter>
        <CustomersPayment />
      </BrowserRouter>
    );
    //You are not authorized
    // Add assertions based on your component's initial state or rendering logic
    expect(screen.getAllByTestId('loading')[0]).toBeInTheDocument();
  });
  it("render all payment when API call succeeds", async () => {
    render(
      <BrowserRouter>
        <CustomersPayment />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "1st payment of 4 payments test edit required on 17/1/2024"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getAllByText("$3,234.00")[0]).toBeInTheDocument();
    });
  });
});
