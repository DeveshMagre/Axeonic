import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserDetails } from "../components/UserDetails";

describe("UserDetails Component", () => {
  test("renders user details", () => {
    const mockUser = { name: "Alice", username: "alice123", email: "alice@example.com" };

    render(
      <MemoryRouter initialEntries={[{ state: { user: mockUser } }]}>
        <UserDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  test("shows 'User not found' if no data", () => {
    render(
      <MemoryRouter initialEntries={[{ state: {} }]}>
        <UserDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("User not found.")).toBeInTheDocument();
  });
});
