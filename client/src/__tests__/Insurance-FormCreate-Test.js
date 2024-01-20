import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import FormCreate from "../pages/insurances/form-create"; // Replace with the correct path to your component file

describe("FormCreate Component", () => {
   it("renders the component without errors", () => {
      render(
         <BrowserRouter>
            <FormCreate />
         </BrowserRouter>
      );

      // Add assertions based on your rendering logic
      expect(screen.getByText("Create a new insurance")).toBeInTheDocument();
   });

   it("updates state on input change", async () => {
      render(
         <BrowserRouter>
            <FormCreate />
         </BrowserRouter>
      );

      // Simulate input change
      userEvent.type(
         screen.getByLabelText("Register Place"),
         "New Register Place"
      );

      // Check if the state is updated correctly
      await waitFor(() => {
         expect(screen.getByLabelText("Register Place").value).toBe(
            "New Register Place"
         );
      });
   });

   it("updates state on date picker change", async () => {
      render(
         <BrowserRouter>
            <FormCreate />
         </BrowserRouter>
      );

      // Simulate date picker change
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
      });
      fireEvent.change(screen.getByLabelText("Card Open Date"), date);

      // Check if the state is updated correctly
      await waitFor(() => {
         expect(screen.getByLabelText("Card Open Date").value).toBe(
            formattedDate
         );
      });
   });
});
