import React, { Component } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../pages/insuarancePolices/form";
import { BrowserRouter } from "react-router-dom";

describe("Form component", () => {
   test("renders Form component correctly", () => {
      render(
         <BrowserRouter>
            <Form />
         </BrowserRouter>
      );
   });

   test("updates name and description refs on input change", () => {
      const { getByLabelText } = render(
         <BrowserRouter>
            <Form />
         </BrowserRouter>
      );
      console.log("getByLabelText-Name: ", getByLabelText("Name"));
      const nameInput = getByLabelText("Name");
      const descriptionInput = getByLabelText("Description");

      fireEvent.change(nameInput, { target: { value: "New Name" } });
      fireEvent.change(descriptionInput, {
         target: { value: "New Description" },
      });

      expect(nameInput.value).toBe("New Name");
      expect(descriptionInput.value).toBe("New Description");
   });

   // Add more tests as needed
});
