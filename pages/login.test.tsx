import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Login from "./login";

describe("testing the login page", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("renders the login form input fields", () => {
    expect(screen.getByPlaceholderText(/username/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/password/i)).toBeDefined();
  });
});
