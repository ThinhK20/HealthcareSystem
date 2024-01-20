import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutUs from "../pages/users/about-us";
import { BrowserRouter } from "react-router-dom";

describe("AboutUs Component", () => {
   it("renders the AboutUs component correctly", () => {
      // Render the component
      const { getByText, getByAltText } = render(
         <BrowserRouter>
            <AboutUs />
         </BrowserRouter>
      );

      const headingElement = getByText("Get To Know HEALTH SOLUTIONS");
      const groupInfoElement = getByText("Health Solutions Group");
      const vietnamInfoElement = getByText("About Health Solutions in Vietnam");

      expect(headingElement).toBeInTheDocument();
      expect(groupInfoElement).toBeInTheDocument();

      expect(vietnamInfoElement).toBeInTheDocument();
   });
});
