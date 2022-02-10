import Checkout from "./Checkout";
import {
  ipd,
  mbp,
  IPD_THREE_FOR_TWO,
  IPD_BULK_DISCOUNT,
  IPD_FLAT_DISCOUNT,
} from "../constants";

describe("Checkout", () => {
  test("checkout can be initialized without pricing rules", () => {
    const checkout = new Checkout();
    expect(checkout).toBeDefined();
  });

  test("checkout can be initialized with a list of pricing rules", () => {
    const pricingRules = [
      IPD_THREE_FOR_TWO,
      IPD_BULK_DISCOUNT,
      IPD_FLAT_DISCOUNT,
    ];
    const checkout = new Checkout(pricingRules);
    expect(checkout.getRules()).toEqual(pricingRules);
  });

  test("should have a scan & total method", () => {
    const checkout = new Checkout();
    expect(checkout.scan).toBeDefined();
    expect(checkout.total).toBeDefined();
  });

  describe("perform checkout actions without rules", () => {
    test("scan should return the number of products in the list", () => {
      const co = new Checkout();
      expect(co.scan(ipd)).toBe(1);
      expect(co.scan(mbp)).toBe(2);
    });

    test("total should return the total price for the checkout system", () => {
      const co = new Checkout();
      co.scan(ipd);
      co.scan(mbp);
      expect(co.total()).toBeCloseTo(ipd.price + mbp.price);
    });
  });

  describe("perform checkout actions with rules", () => {
    test("should be able to apply pricing rules when checking out", () => {
      const pricingRules = [IPD_THREE_FOR_TWO];
      const co = new Checkout(pricingRules);
      co.scan(ipd);
      co.scan(ipd);
      co.scan(ipd);
      co.scan(mbp);
      expect(co.total()).toBeCloseTo(ipd.price * 2 + mbp.price);
    });
  });
});
