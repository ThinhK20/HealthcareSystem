import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Navbar } from "../components/header/navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { getAccountByUserID } from "../apis/accountApis.js";
import { getAccountByAccountId } from "../apis/accountApis.js";
import { getCookie } from "../helpers/getCookie.js";

jest.mock("../helpers/getCookie.js", () => {
  const originalModule = jest.requireActual("../helpers/getCookie.js");
  let mockValue = undefined;
  return {
    ...originalModule,
    getCookie: jest.fn(() => mockValue),
    setMockValue: (value) => {
      mockValue = value;
    },
  };
});

// jest.mock("../helpers/getCookie.js", () => ({
//     ...jest.requireActual("../helpers/getCookie.js"),
//     getCookie: jest.fn(() => undefined),
//   }));

jest.mock("../apis/accountApis.js", () => {
  const originalModule = jest.requireActual("../apis/accountApis.js");
  let mockValue = null;
  let mockValue2 = null;
  return {
    ...originalModule,
    getAccountByAccountId: jest.fn(() => mockValue),
    getAccountByUserID: jest.fn(() => mockValue2),
    setMockValue: (value) => {
      mockValue = value;
    },
    setMockValue2: (value) => {
      mockValue2 = value;
    },
  };
});

describe("NavBarTest", () => {
  beforeEach(() => {
    // Reset mocks and clear any previous interactions
    jest.clearAllMocks();
  });
  it("renders without login", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    // Add assertions based on your component's initial state or rendering logic
    // const mockFn = require("../helpers/getCookie.js").getCookie;

    await waitFor(() => {
      expect(screen.getByTestId("notLogin")).toBeInTheDocument();
    });
  });
  it("render with role is user", async () => {
    require("../helpers/getCookie.js").setMockValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidG90b3RldGUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzA4MzMyMjAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4NC8ifQ.pNEpzbCBwhMcsi4xvE1kBfLV_C7y_93QeUUSL2SmmZA"
    );
    require("../apis/accountApis.js").setMockValue({
      role: "User",
    });
    require("../apis/accountApis.js").setMockValue2(14);
    const mockFn = require("../apis/accountApis.js").getAccountByAccountId;

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("login")).toBeInTheDocument();
      expect(screen.getAllByTestId("request")[0]).toBeInTheDocument();
      expect(screen.queryByTestId("manage")).not.toBeInTheDocument();
    });
  });
  it("render with role is admin", async () => {
    require("../helpers/getCookie.js").setMockValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4xIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDgzNTEzMzMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0Mzg0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0Mzg0LyJ9.Ik5VWAHSKlIGl1lKJHfspx2GoD3u0T92j7yrvCIHVKA"
    );
    require("../apis/accountApis.js").setMockValue({
      role: "Admin",
    });
    require("../apis/accountApis.js").setMockValue2(15);
    const mockFn = require("../apis/accountApis.js").getAccountByAccountId;

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("login")).toBeInTheDocument();
      expect(screen.queryByTestId("request")).not.toBeInTheDocument();
      expect(screen.queryAllByTestId("manage")[0]).toBeInTheDocument();
    });
  });
});
