import { ProductBadge } from "@/components/ProductBadge";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("ProductBadge", () => {

  test("renders in stock state", () => {
    render(
      <ProductBadge
        stock={10}
        tags={["shirt", "men-shirt"]}
        discount={20}
      />
    );

    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    expect(screen.getByText(/20% off/i)).toBeInTheDocument();

    const tagList = screen.getByLabelText("tags-list");

    expect(tagList.children).toHaveLength(2);
  });

  test("renders out of stock state", () => {
    render(
      <ProductBadge stock={0} tags={[]} discount={0} />
    );

    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });

  test("does not render discount badge", () => {
    render(
      <ProductBadge stock={10} tags={[]} discount={0} />
    );

    expect(
      screen.queryByLabelText("discount")
    ).not.toBeInTheDocument();
  });

  test("renders low stock state", () => {
    render(
      <ProductBadge stock={4} tags={[]} />
    );

    expect(
      screen.getByText(/low stock: 4 left/i)
    ).toBeInTheDocument();
  });

});