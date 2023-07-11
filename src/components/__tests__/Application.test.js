import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "../Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //To test that the saving works we need to click the add button
    fireEvent.click(getByAltText(appointment, "Add"));

    // change the student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //click the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click the save button
    fireEvent.click(getByText(appointment, "Save"));

    //check that the saving status is displayed
    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();

    // wait for the saving status to disappear, now showing student name
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // better to use queryByText vs getByText because it will return null if it doesn't find the element
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => queryByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the form is shown and change name to Lydia Miller-Jones
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. check that the saving status is displayed
    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();

    // 7. check that the new name is displayed
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // 8. check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) => {
      return queryByText(day, "Monday");
    });
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //To test that the saving works we need to click the add button
    fireEvent.click(getByAltText(appointment, "Add"));

    // change the student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //click the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click the save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();

    //check that the saving status is displayed
    await waitForElement(() =>
      getByText(appointment, "Could not save appointment")
    );
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "DELETING...")).toBeInTheDocument();

    await waitForElement(() => {
      return getByText(appointment, "Could not delete appointment");
    });
  });
});
