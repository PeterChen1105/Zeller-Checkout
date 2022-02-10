import { Product } from "../types";
import {
  ipd,
  mbp,
  IPD_THREE_FOR_TWO,
  IPD_BULK_DISCOUNT,
  IPD_FLAT_DISCOUNT,
  OTHER_FLAT_DISCOUNT,
} from "../constants";
import { rules } from "./pricingRule";

describe("Pricing Rules", () => {
  const getTotalPrice = (products: Product[]) => {
    return products.reduce((prev: number, next: Product) => {
      return prev + next.price;
    }, 0);
  };

  describe("THREE_FOR_TWO", () => {
    test("should keep same product list if no more than 3 items", () => {
      const products: Product[] = [ipd, ipd, mbp];
      const ruleFn = rules.THREE_FOR_TWO(IPD_THREE_FOR_TWO);
      const after = ruleFn(products);

      expect(after.length).toBe(3);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price * 2 + mbp.price);
    });

    test("should remove the third item from the product list", () => {
      const products: Product[] = [...Array(3).fill(ipd), mbp];
      const ruleFn = rules.THREE_FOR_TWO(IPD_THREE_FOR_TWO);
      const after = ruleFn(products);

      expect(after.length).toBe(3);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price * 2 + mbp.price);
    });

    test("should not remove items if the sku does not match", () => {
      const products: Product[] = [ipd, ...Array(3).fill(mbp)];
      const ruleFn = rules.THREE_FOR_TWO(IPD_THREE_FOR_TWO);
      const after = ruleFn(products);

      expect(after.length).toBe(4);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price + mbp.price * 3);
    });

    test("should remove every third item for a specific sku", () => {
      const products: Product[] = [...Array(6).fill(ipd), mbp];
      const ruleFn = rules.THREE_FOR_TWO(IPD_THREE_FOR_TWO);
      const after = ruleFn(products);

      expect(after.length).toBe(5);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price * 4 + mbp.price);
    });
  });

  describe("BULK_DISCOUNT", () => {
    test("should apply bulk discount to the specified product", () => {
      const products: Product[] = [...Array(6).fill({ ...ipd }), mbp];
      const ruleFn = rules.BULK_DISCOUNT(IPD_BULK_DISCOUNT);
      const after = ruleFn(products);

      expect(after.length).toBe(7);
      expect(getTotalPrice(after)).toBeCloseTo(
        IPD_BULK_DISCOUNT.discountedPrice * 6 + mbp.price
      );
    });

    test("should not apply bulk discount if not enough item is added for checkout", () => {
      const products: Product[] = [...Array(3).fill({ ...ipd }), mbp];
      const ruleFn = rules.BULK_DISCOUNT(IPD_BULK_DISCOUNT);
      const after = ruleFn(products);

      expect(after.length).toBe(4);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price * 3 + mbp.price);
    });
  });

  describe("FLAT_DISCOUNT", () => {
    test("should apply flat discount to the specified product", () => {
      const products: Product[] = [...Array(3).fill({ ...ipd }), mbp];
      const ruleFn = rules.FLAT_DISCOUNT(IPD_FLAT_DISCOUNT);
      const after = ruleFn(products);

      expect(after.length).toBe(4);
      expect(getTotalPrice(after)).toBeCloseTo(
        IPD_FLAT_DISCOUNT.discountedPrice * 3 + mbp.price
      );
    });

    test("should not apply flat discount for the non-specified products", () => {
      const products: Product[] = [...Array(3).fill({ ...ipd }), mbp];
      const ruleFn = rules.FLAT_DISCOUNT(OTHER_FLAT_DISCOUNT);
      const after = ruleFn(products);

      expect(after.length).toBe(4);
      expect(getTotalPrice(after)).toBeCloseTo(ipd.price * 3 + mbp.price);
    });
  });
});
