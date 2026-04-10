import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "@/components/FAQ";

describe("FAQ", () => {
  it("renders all questions", () => {
    render(<FAQ />);
    expect(screen.getByText(/How often should I visit the dentist/)).toBeInTheDocument();
    expect(screen.getByText(/Does teeth whitening damage enamel/)).toBeInTheDocument();
    expect(screen.getByText(/What should I do in a dental emergency/)).toBeInTheDocument();
  });

  it("answers are not visible by default", () => {
    render(<FAQ />);
    const answer = screen.getByText(/We recommend visiting the dentist every 6 months/);
    expect(answer.closest("[id^='faq-answer-']")).toHaveClass("max-h-0");
  });

  it("expands an answer when its button is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const button = screen.getByRole("button", { name: /How often should I visit the dentist/ });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    const answer = document.getElementById(button.getAttribute("aria-controls")!);
    expect(answer).toHaveClass("max-h-96");
  });

  it("collapses an open answer when clicked again", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const button = screen.getByRole("button", { name: /How often should I visit the dentist/ });
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the previous answer when a new one is opened", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const first = screen.getByRole("button", { name: /How often should I visit the dentist/ });
    const second = screen.getByRole("button", { name: /Does teeth whitening damage enamel/ });

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("each button has aria-controls pointing to a valid id", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const controls = btn.getAttribute("aria-controls");
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls!)).toBeInTheDocument();
    });
  });
});
