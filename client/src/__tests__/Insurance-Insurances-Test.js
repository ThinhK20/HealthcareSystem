// Import the necessary dependencies for testing
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Insurance from "../pages/insurances/insurance"; // Replace with the correct path to your component file
import { BrowserRouter } from "react-router-dom";

jest.mock("@material-tailwind/react", () => ({
   Input: ({ onChange, label, icon }) => (
      <input
         type="text"
         onChange={onChange}
         placeholder={label}
         aria-label={label}
      />
   ),
}));
test("renders table and pagination", async () => {
   render(
      <BrowserRouter>
         <Insurance />
      </BrowserRouter>
   );
});

describe("Insurance Component", () => {
   it("renders the component without errors", async () => {
      // Render the component
      render(
         <BrowserRouter>
            <Insurance />
         </BrowserRouter>
      );

      // Wait for the component to finish rendering
      await waitFor(() => {
         expect(screen.getByText("Insurance Number")).toBeInTheDocument();
         // Add more assertions based on your actual rendering logic
      });
   });
});
