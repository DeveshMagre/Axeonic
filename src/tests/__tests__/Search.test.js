import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../components/Search";

describe("Search Component", () => {
  const mockOnSearch = jest.fn();

  test("calls onSearch when typing", () => {
    render(<Search data={[]} onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });
});
