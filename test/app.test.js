import React from "react";
import App from "../src/app";
import { render, waitForElement } from "@testing-library/react";
import axios from "../src/axios";

jest.mock("./axios");

test("App shows nothing at first and then renders div after all the async stuff is done", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 2,
            first: "Valérie",
            last: "Deguine",
            url: "/profiledefault.jpg",
        },
    });
    const { container } = render(<App />);

    expect(container.children.length).toBe(0);

    await waitForElement(() => container.querySelector("div"));
});
