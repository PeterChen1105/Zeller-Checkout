import { Product, Rule } from "../types";
import { rules } from "../pricingRule/pricingRule";

export default class Checkout {
  private products: Product[];
  private pricingRules?: Rule[];

  constructor(pricingRules?: Rule[]) {
    this.products = [];
    if (pricingRules) this.pricingRules = pricingRules;
  }

  getRules = (): Rule[] | undefined => this.pricingRules;

  scan = (product: Product): number => {
    this.products.push(product);
    return this.products.length;
  };

  total = (): number => {
    let after = [...this.products];
    if (this.pricingRules) {
      const ruleFns = this.pricingRules.map((rule) => {
        return rules[rule.type](rule);
      });

      while (ruleFns.length > 0) {
        const ruleFn = ruleFns.shift();
        after = ruleFn(after);
      }
    }

    return after.reduce((prev: number, next: Product) => prev + next.price, 0);
  };
}
