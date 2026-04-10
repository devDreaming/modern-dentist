import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TeamSection from "@/components/TeamSection";

describe("TeamSection", () => {
  it("renders all team members", () => {
    render(<TeamSection />);
    // Each member name appears twice (front + back of card are both in DOM)
    expect(screen.getAllByText("Dr. James Chen")).toHaveLength(2);
    expect(screen.getAllByText("Dr. Michael Thompson")).toHaveLength(2);
    expect(screen.getAllByText("Dr. Eli Rodriguez")).toHaveLength(2);
  });

  it("renders each member's role on the front", () => {
    render(<TeamSection />);
    // Roles also appear twice (front + back)
    expect(screen.getAllByText("Lead Dentist")).toHaveLength(2);
    expect(screen.getAllByText("Orthodontist")).toHaveLength(2);
    expect(screen.getAllByText("Pediatric Dentist")).toHaveLength(2);
  });

  it("flip cards start unflipped (aria-expanded false)", () => {
    render(<TeamSection />);
    const cards = screen.getAllByRole("button");
    cards.forEach((card) => {
      expect(card).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("flips a card when clicked", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    const card = screen.getByRole("button", { name: /Dr. James Chen/ });
    await user.click(card);

    expect(card).toHaveAttribute("aria-expanded", "true");
  });

  it("unflips a card when clicked again", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    const card = screen.getByRole("button", { name: /Dr. James Chen/ });
    await user.click(card);
    expect(card).toHaveAttribute("aria-expanded", "true");

    await user.click(card);
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("closes a flipped card when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    const card = screen.getByRole("button", { name: /Dr. James Chen/ });
    await user.click(card);
    expect(card).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("shows bio content in each card", () => {
    render(<TeamSection />);
    expect(screen.getByText(/cosmetic dentistry and dental implants/)).toBeInTheDocument();
    expect(screen.getByText(/Invisalign and traditional braces/)).toBeInTheDocument();
    expect(screen.getByText(/children's dentistry/)).toBeInTheDocument();
  });
});
