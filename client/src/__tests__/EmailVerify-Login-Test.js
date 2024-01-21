import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import EmailVerify from "../pages/login/emailverify";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { verifyEmail } from "../apis/authenicationApis"; // Update this import path based on your project structure

jest.mock("../apis/authenicationApis", () => ({
   verifyEmail: jest.fn(),
}));
describe("Register Component", () => {
   test("renders Register form", async () => {
      render(
         <BrowserRouter>
            <EmailVerify />
         </BrowserRouter>
      );

      // Ensure that the login form is rendered
      expect(screen.getByLabelText("First code")).toBeInTheDocument();
      expect(screen.getByLabelText("Second code")).toBeInTheDocument();
      expect(screen.getByLabelText("Third code")).toBeInTheDocument();
      expect(screen.getByLabelText("Fourth code")).toBeInTheDocument();

      expect(screen.getByText("Verify")).toBeInTheDocument();
   });
});
