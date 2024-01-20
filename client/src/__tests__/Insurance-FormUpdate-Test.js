import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import FormUpdate from "../pages/insurances/form-update"; 
import { updateInsurance } from "../apis/insuranceApis";

jest.mock("../apis/insuranceApis", () => ({
   updateInsurance: jest.fn(),
}));

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

test('submits form and calls updateInsurance', async () => {
   
   render(
      <BrowserRouter>
         <FormUpdate />
      </BrowserRouter>
   );
   
   fireEvent.change(screen.getByLabelText('Register Place'), { target: { value: 'New Register Place' } });
   fireEvent.change(screen.getByLabelText('Card Open Date'), { target: { value: '2022-01-01' } });

   fireEvent.click(screen.getByText('Update'));

   // Wait for the login function to be called
   await waitFor(() => {
      expect(updateInsurance).toHaveBeenCalledTimes(1);
   });

   jest.clearAllMocks();
 });