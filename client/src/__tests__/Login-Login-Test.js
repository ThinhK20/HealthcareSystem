import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/login/login"; // Replace with the correct path to your component file
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { login } from "../apis/authenicationApis";

jest.mock("../apis/authenicationApis", () => ({
   login: jest.fn(),
}));
jest.mock("../../public/background.svg", () => "SVG-mock");

describe("Login Component", () => {
   test("renders login form", async () => {
      render(
         <BrowserRouter>
            <Login />
         </BrowserRouter>
      );

      // Ensure that the login form is rendered
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
   });
   test("handles login form submission", async () => {
      // Mock the login API function response
      const mockLoginResponse = {
         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidG90b3RldGUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzA4MTg0NjIyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4NC8ifQ.dIuntPG73MHuSBGH5Ci-LYs8W03N2Pr0NkvxAbsJ7jI",
         user: {
            userId: 1,
            username: "testuser1",
         },
      };
      login.mockResolvedValueOnce(mockLoginResponse);

      // Render the component
      const { getByPlaceholderText, getByText } = render(
         <BrowserRouter>
            <Login />
         </BrowserRouter>
      );

      // Fill in the form with test credentials
      fireEvent.change(getByPlaceholderText("Username"), {
         target: { value: "testuser1" },
      });

      fireEvent.change(getByPlaceholderText("Password"), {
         target: { value: "1111111" },
      });

      // Trigger form submission
      fireEvent.submit(getByText("Sign In"));

      // Wait for the login function to be called
      await waitFor(() => {
         expect(login).toHaveBeenCalledTimes(1);
      });

      jest.clearAllMocks();
   });
});
