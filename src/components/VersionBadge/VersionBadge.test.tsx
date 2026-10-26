import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VersionBadge } from "./VersionBadge";

describe("VersionBadge", () => {
  it("shows the environment, version and commit", () => {
    render(<VersionBadge env="staging" version="1.2.0" commit="abc1234" />);

    expect(screen.getByTestId("env")).toHaveTextContent("staging");
    expect(screen.getByText("v1.2.0")).toBeInTheDocument();
    expect(screen.getByText("abc1234")).toBeInTheDocument();
  });
});
