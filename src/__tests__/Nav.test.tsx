import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";

// usePathname is called inside Nav
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// AppointmentContext is used by AnimatedButton inside Nav
jest.mock("@/context/AppointmentContext", () => ({
  useAppointment: () => ({ openModal: jest.fn(), closeModal: jest.fn() }),
}));

describe("Nav", () => {
  it("renders the logo and brand name", () => {
    render(<Nav />);
    expect(screen.getByText("Realdent")).toBeInTheDocument();
    expect(screen.getByAltText("Realdent logo")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Nav />);
    expect(screen.getAllByRole("link", { name: "Home" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "About Us" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Our Services" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Dental Health Tips" })).toBeTruthy();
  });

  it("hamburger button has correct aria-label", () => {
    render(<Nav />);
    expect(screen.getByRole("button", { name: "Toggle menu" })).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<Nav />);
    // The mobile menu only renders when isOpen is true
    const mobileLinks = screen.queryAllByRole("link", { name: "Home" });
    // Desktop + mobile = 2 when open, 1 when closed (mobile menu not rendered)
    expect(mobileLinks).toHaveLength(1);
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));

    // Now both desktop and mobile links are in the DOM
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);
  });

  it("closes mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);

    // Click the mobile "Home" link (second one)
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    await user.click(homeLinks[1]);

    expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(1);
  });
});
