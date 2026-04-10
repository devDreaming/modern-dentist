import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestimonialsGrid from "@/components/TestimonialsGrid";

describe("TestimonialsGrid", () => {
  it("renders all testimonials", () => {
    render(<TestimonialsGrid />);
    expect(screen.getByText("James Anderson")).toBeInTheDocument();
    expect(screen.getByText("Sherry Brown")).toBeInTheDocument();
    expect(screen.getByText("David Wilson")).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("Robert Wood")).toBeInTheDocument();
  });

  it("renders prev/next navigation buttons with correct aria-labels", () => {
    render(<TestimonialsGrid />);
    expect(screen.getByRole("button", { name: "Previous testimonials" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next testimonials" })).toBeInTheDocument();
  });

  it("renders dot indicators with descriptive aria-labels", () => {
    render(<TestimonialsGrid />);
    // On desktop (3 per page), 5 testimonials → 3 dots (indices 0,1,2)
    expect(screen.getByRole("button", { name: "Go to testimonial 1 of 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to testimonial 2 of 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to testimonial 3 of 3" })).toBeInTheDocument();
  });

  it("carousel region has accessible label", () => {
    render(<TestimonialsGrid />);
    expect(screen.getByRole("region", { name: "Patient testimonials carousel" })).toBeInTheDocument();
  });

  it("navigates to a specific testimonial when a dot is clicked", async () => {
    const user = userEvent.setup();
    render(<TestimonialsGrid />);

    const dot2 = screen.getByRole("button", { name: "Go to testimonial 2 of 3" });
    await user.click(dot2);

    // After clicking dot index 1, it should be the active dot (bg-[#0D6D6E])
    expect(dot2).toHaveClass("bg-[#0D6D6E]");
  });

  it("first dot is active by default", () => {
    render(<TestimonialsGrid />);
    const dot1 = screen.getByRole("button", { name: "Go to testimonial 1 of 3" });
    expect(dot1).toHaveClass("bg-[#0D6D6E]");
  });

  it("advances the carousel when the next button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestimonialsGrid />);

    const dot1 = screen.getByRole("button", { name: "Go to testimonial 1 of 3" });
    const dot2 = screen.getByRole("button", { name: "Go to testimonial 2 of 3" });

    expect(dot1).toHaveClass("bg-[#0D6D6E]");

    await user.click(screen.getByRole("button", { name: "Next testimonials" }));

    expect(dot2).toHaveClass("bg-[#0D6D6E]");
    expect(dot1).not.toHaveClass("bg-[#0D6D6E]");
  });

  it("wraps to the last slide when previous is clicked from the first", async () => {
    const user = userEvent.setup();
    render(<TestimonialsGrid />);

    const lastDot = screen.getByRole("button", { name: "Go to testimonial 3 of 3" });
    await user.click(screen.getByRole("button", { name: "Previous testimonials" }));

    expect(lastDot).toHaveClass("bg-[#0D6D6E]");
  });
});
