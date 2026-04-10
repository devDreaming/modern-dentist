import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppointmentModal from "@/components/AppointmentModal";

// react-aria-components uses ResizeObserver internally
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const defaultProps = { isOpen: true, onClose: jest.fn() };

describe("AppointmentModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(<AppointmentModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders with correct dialog role and aria attributes", () => {
    render(<AppointmentModal {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "appointment-modal-title");
  });

  it("heading id matches aria-labelledby", () => {
    render(<AppointmentModal {...defaultProps} />);
    const heading = document.getElementById("appointment-modal-title");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Request an Appointment");
  });

  it("close button calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<AppointmentModal isOpen={true} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Close form" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clicking the backdrop calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<AppointmentModal isOpen={true} onClose={onClose} />);
    // The backdrop is the first absolute div inside the fixed container
    const backdrop = document.querySelector(".bg-black\\/50");
    await user.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders all required form fields", () => {
    render(<AppointmentModal {...defaultProps} />);
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/)).toBeInTheDocument();
  });

  it("submit button is disabled when required fields are empty", () => {
    render(<AppointmentModal {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Request appointment" })).toBeDisabled();
  });

  it("fills in text fields", async () => {
    const user = userEvent.setup();
    render(<AppointmentModal {...defaultProps} />);
    await user.type(screen.getByLabelText(/Full Name/), "Jane Doe");
    expect(screen.getByLabelText(/Full Name/)).toHaveValue("Jane Doe");
  });
});
