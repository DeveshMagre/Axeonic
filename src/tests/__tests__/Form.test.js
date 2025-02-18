import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "../components/Form";

const mockPostData = jest.fn();
const mockUpdateData = jest.fn();
jest.mock("../api/PostApi", () => ({
  postData: () => mockPostData(),
  updateData: () => mockUpdateData(),
}));

describe("Form Component", () => {
  const mockSetData = jest.fn();
  const mockSetUpdateDataApi = jest.fn();

  test("renders input fields correctly", () => {
    render(
      <Form
        data={[]}
        setData={mockSetData}
        updateDataApi={{}}
        setUpdateDataApi={mockSetUpdateDataApi}
      />
    );

    expect(screen.getByPlaceholderText("Add Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add Email")).toBeInTheDocument();
  });

  test("updates input values correctly", () => {
    render(<Form data={[]} setData={mockSetData} updateDataApi={{}} setUpdateDataApi={mockSetUpdateDataApi} />);

    const nameInput = screen.getByPlaceholderText("Add Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    expect(nameInput.value).toBe("John Doe");
  });

  test("calls postData on form submit (Add User)", () => {
    render(<Form data={[]} setData={mockSetData} updateDataApi={{}} setUpdateDataApi={mockSetUpdateDataApi} />);

    fireEvent.click(screen.getByText("Add"));
    expect(mockPostData).toHaveBeenCalled();
  });

  test("calls updateData on form submit (Edit User)", () => {
    render(
      <Form
        data={[]}
        setData={mockSetData}
        updateDataApi={{ id: 1, name: "Jane" }}
        setUpdateDataApi={mockSetUpdateDataApi}
      />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(mockUpdateData).toHaveBeenCalled();
  });
});
