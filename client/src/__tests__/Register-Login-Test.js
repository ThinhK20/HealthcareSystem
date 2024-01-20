import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/login/register"; // Replace with the correct path to your component file
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { register } from "../apis/authenicationApis";

jest.mock("../../public/background.svg", () => "SVG-mock");
jest.mock("../apis/authenicationApis", () => ({
   register: jest.fn(),
}));

describe("Register Component", () => {
   test("renders Register form", async () => {
      render(
         <BrowserRouter>
            <Register />
         </BrowserRouter>
      );

      // Ensure that the login form is rendered
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();

      expect(
         screen.getByPlaceholderText("Confirm Password")
      ).toBeInTheDocument();

      expect(screen.getByText("Sign Up")).toBeInTheDocument();
   });
   test("calls register API once on form submission", async () => {
      const mockRegisterResponse = {
         emailVerification: "mocked-email-verification",
         status: "mocked-status",
         userId: 123,
      };
      register.mockResolvedValueOnce(mockRegisterResponse);

      // Render the component
      const { getByPlaceholderText, getByText } = render(
         <BrowserRouter>
            <Register />
         </BrowserRouter>
      );

      // Fill in the form with test credentials
      fireEvent.change(getByPlaceholderText("Username"), {
         target: { value: "testuser" },
      });

      fireEvent.change(getByPlaceholderText("Password"), {
         target: { value: "password123" },
      });

      fireEvent.change(getByPlaceholderText("Confirm Password"), {
         target: { value: "password123" },
      });

      fireEvent.change(getByPlaceholderText("Email"), {
         target: { value: "test@example.com" },
      });

      // Trigger form submission
      fireEvent.submit(getByText("Sign Up"));

      // Wait for the API call to be made
      await waitFor(() => expect(register).toHaveBeenCalled());

      // Validate that the API is called once
      expect(register).toHaveBeenCalledTimes(1);
   });
});
