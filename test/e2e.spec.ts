import Checkout from "../src/checkout/checkout";
import {
  ipd,
  atv,
  vga,
  ATV_THREE_FOR_TWO,
  IPD_BULK_DISCOUNT,
} from "../src/constants";

describe("integration", () => {
  test("integration test - example A", () => {
    const pricingRules = [ATV_THREE_FOR_TWO, IPD_BULK_DISCOUNT];
    const co = new Checkout(pricingRules);
    co.scan(atv);
    co.scan(atv);
    co.scan(atv);
    co.scan(vga);

    expect(co.total()).toBeCloseTo(249);
  });

  test("integration test - example B", () => {
    const pricingRules = [ATV_THREE_FOR_TWO, IPD_BULK_DISCOUNT];
    const co = new Checkout(pricingRules);
    co.scan(atv);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(atv);
    co.scan(ipd);
    co.scan(ipd);
    co.scan(ipd);

    expect(co.total()).toBeCloseTo(2718.95);
  });
});
