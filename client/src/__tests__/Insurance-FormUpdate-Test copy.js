import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import FormUpdate from "../pages/insurances/form-update"; // Replace with the correct path to your component file

test("renders the component without errors", async () => {
   render(
      <BrowserRouter>
         <FormUpdate />
      </BrowserRouter>
   );

   // Wait for the component to finish rendering
   await waitFor(() => {
      // Add assertions based on your actual rendering logic
      expect(screen.getByLabelText("Register Place")).toBeInTheDocument();
      expect(screen.getByLabelText("Card Open Date")).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
   });
});

test("updates state on input change and form submission", async () => {
   // Render the component
   render(
      <BrowserRouter>
         <FormUpdate />
      </BrowserRouter>
   );

   // Wait for the component to finish rendering
   await waitFor(() => {
      // Simulate input change for Register Place
      fireEvent.change(screen.getByLabelText("Register Place"), {
         target: { value: "New Register Place" },
      });

      // Simulate input change for Card Open Date
      fireEvent.change(screen.getByLabelText("Card Open Date"), {
         target: { value: "2022-01-18" }, // You need to format the date accordingly
      });
   });

   // Check if the state is updated correctly
   expect(screen.getByLabelText("Register Place").value).toBe(
      "New Register Place"
   );

   // Check if the state for Card Open Date is updated correctly (considering date formatting)
   expect(screen.getByLabelText("Card Open Date").value).toBe("01/18/2022");

   // Simulate form submission
   fireEvent.click(screen.getByText("Update"));

   // You can add expectations based on your form submission logic (e.g., API calls, toast messages)
   // For example, check if the API call was successful or if a toast message appears
   await waitFor(() => {
      // Add your assertions based on the expected behavior after form submission
      expect(/* Your expectation here */).toBe(/* Expected value */);
   });
});
