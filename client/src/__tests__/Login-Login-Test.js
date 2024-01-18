import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/login/login"; // Replace with the correct path to your component file
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

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
});
