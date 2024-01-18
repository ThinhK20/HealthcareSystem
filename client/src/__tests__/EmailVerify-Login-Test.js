import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/login/register"; // Replace with the correct path to your component file
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("../../public/background.svg", () => "SVG-mock");
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
});
