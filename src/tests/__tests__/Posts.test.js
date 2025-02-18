import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Posts } from "../components/Posts";
import { getUsers, deleteUser } from "../api/PostApi";

jest.mock("../api/PostApi", () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

describe("Posts Component", () => {
  beforeEach(() => {
    getUsers.mockResolvedValue({
      data: [
        { id: 1, name: "John Doe", username: "john123", email: "john@example.com" },
      ],
    });
  });

  test("fetches and displays user data", async () => {
    render(<Posts />);
    
    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
  });

  test("filters user list based on search", async () => {
    render(<Posts />);
    
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "john" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("deletes a user", async () => {
    deleteUser.mockResolvedValue({ status: 200 });

    render(<Posts />);

    const deleteButton = await screen.findByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteUser).toHaveBeenCalledWith(1));
  });

  test("opens edit form when Edit is clicked", async () => {
    render(<Posts />);
    
    const editButton = await screen.findByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Edit User")).toBeInTheDocument();
  });
});
