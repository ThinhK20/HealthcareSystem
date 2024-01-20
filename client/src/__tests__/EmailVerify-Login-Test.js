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
   test("calls verifyEmail API once on form submission", async () => {
      // Mock the API response
      const mockVerifyEmailResponse = "Successfully";
      verifyEmail.mockResolvedValueOnce(mockVerifyEmailResponse);

      // Mock location state
      const locationState = {
         status: "Disable",
         emailVerification: "1234",
         userid: 1,
      };

      // Render the component with location state
      const { getByPlaceholderText, getByText, getByLabelText } = render(
         <BrowserRouter>
            <EmailVerify location={{ state: locationState }} />
         </BrowserRouter>
      );

      fireEvent.change(getByLabelText("First code"), {
         target: { value: "1" },
      });
      fireEvent.change(getByLabelText("Second code"), {
         target: { value: "2" },
      });
      fireEvent.change(getByLabelText("Third code"), {
         target: { value: "3" },
      });
      fireEvent.change(getByLabelText("Fourth code"), {
         target: { value: "4" },
      });

      fireEvent.submit(getByText("Verify"));

      await waitFor(() => {
         expect(verifyEmail).toHaveBeenCalledTimes(1);
      });

      jest.clearAllMocks();
   });
});
