import React from "react";
import profilepic from "../src/profilepic";
import { render, fireEvent } from "@testing-library/react";
import { TestScheduler } from "jest";
import ProfilePic from "../src/profilepic";

test("renders img with src set to url prop", () => {
    const { container } = render(<ProfilePic url="/whatever.png" />);
    expect(container.querySelector(".profilepic").getAttribute("src")).toBe(
        "/whatever.png"
    );
});

test("renders img with src set to profiledefault.jpg when no url prop is present", () => {
    const { container } = render(<ProfilePic />);
    expect(container.querySelector(".profilepic").getAttribute("src")).toBe(
        "/profiledefault.jpg"
    );
});

// on click testing
test("onClick prop gets called when img is clicked", () => {
    const mocktoggleModal = jest.fn();
    const { container } = render(<ProfilePic toggleModal={mocktoggleModal} />);
});

test("onClick prop gets called when img is clicked", () => {
    const mocktoggleModal = jest.fn();
    const { container } = render(<ProfilePic toggleModal={mocktoggleModal} />);
    fireEvent.click(container.querySelector(".profileepic"));
    fireEvent.click(container.querySelector(".profileepic"));
    expect(mocktoggleModal.mock.calls.length).toBe(2);
});
