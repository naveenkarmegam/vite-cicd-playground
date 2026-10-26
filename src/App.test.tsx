import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("counts clicks", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Clicked 0 times" }));

    expect(
      screen.getByRole("button", { name: "Clicked 1 times" })
    ).toBeInTheDocument();
  });

  it("shows local as the environment when not deployed", () => {
    render(<App />);

    expect(screen.getByTestId("env")).toHaveTextContent("local");
  });
});
