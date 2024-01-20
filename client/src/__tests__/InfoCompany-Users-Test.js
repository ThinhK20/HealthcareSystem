import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoCompany from "../pages/users/information-company";
import { BrowserRouter } from "react-router-dom";

describe("AboutUs Component", () => {
   it("renders the AboutUs component correctly", () => {
      // Render the component
      const { getByText, getByAltText } = render(
         <BrowserRouter>
            <InfoCompany />
         </BrowserRouter>
      );

      // Check if the important elements are present
      const headingElement = getByText("We are ready to support you.");
      const hotlineElement = getByText("Hotline 1800 599998 (free, 24/7)");
      const emailElement = getByText("Customercare@Healthsolution.vn");
      const officeElement = getByText("Our Offices");
      const mainOfficeElement = getByText("Trụ sở chính");
      const hanoiOfficeElement = getByText("Chi nhánh Hà Nội");

      expect(headingElement).toBeInTheDocument();
      expect(hotlineElement).toBeInTheDocument();

      expect(emailElement).toBeInTheDocument();
      expect(officeElement).toBeInTheDocument();

      expect(mainOfficeElement).toBeInTheDocument();
      expect(hanoiOfficeElement).toBeInTheDocument();
   });
});
