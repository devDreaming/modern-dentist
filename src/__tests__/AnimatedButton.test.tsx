import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnimatedButton from "@/components/AnimatedButton";

const mockOpenModal = jest.fn();

jest.mock("@/context/AppointmentContext", () => ({
  useAppointment: () => ({ openModal: mockOpenModal, closeModal: jest.fn() }),
}));

describe("AnimatedButton", () => {
  beforeEach(() => {
    mockOpenModal.mockClear();
  });

  it("renders as a link when href is provided", () => {
    render(<AnimatedButton href="/about">Learn More</AnimatedButton>);
    const link = screen.getByRole("link", { name: /Learn More/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders as a button when onClick is provided", () => {
    const onClick = jest.fn();
    render(<AnimatedButton onClick={onClick}>Click Me</AnimatedButton>);
    expect(screen.getByRole("button", { name: /Click Me/ })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<AnimatedButton onClick={onClick}>Click Me</AnimatedButton>);
    await user.click(screen.getByRole("button", { name: /Click Me/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("opens appointment modal when bookAppointment is true", async () => {
    const user = userEvent.setup();
    render(<AnimatedButton bookAppointment>Book Now</AnimatedButton>);
    await user.click(screen.getByRole("button", { name: /Book Now/ }));
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it("renders the decorative arrow SVG as aria-hidden", () => {
    render(<AnimatedButton href="/">Go</AnimatedButton>);
    const svgs = document.querySelectorAll("svg[aria-hidden='true']");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("renders children text", () => {
    render(<AnimatedButton href="/">Schedule Today</AnimatedButton>);
    expect(screen.getByText("Schedule Today")).toBeInTheDocument();
  });
});
