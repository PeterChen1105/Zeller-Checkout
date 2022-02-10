import { Product, THREE_FOR_TWO, BULK_DISCOUNT, FLAT_DISCOUNT } from "../types";

interface Rules {
  [key: string]: any;
}

export const rules: Rules = {
  THREE_FOR_TWO:
    ({ sku }: THREE_FOR_TWO) =>
    (transaction: Product[]) => {
      let count = 0;
      return transaction.reduce((prev: Product[], next: Product) => {
        if (next.sku === sku) count++;
        if (count !== 0 && count % 3 === 0) {
          count = 0;
          return prev;
        }
        prev.push(next);
        return prev;
      }, []);
    },

  BULK_DISCOUNT:
    ({ sku, discountedPrice, noOfItems }: BULK_DISCOUNT) =>
    (transaction: Product[]) => {
      const filtered = transaction.filter((item) => item.sku === sku);

      if (filtered.length >= noOfItems)
        transaction = transaction.map((item) => {
          if (item.sku === sku) item.price = discountedPrice;
          return item;
        });
      return transaction;
    },

  FLAT_DISCOUNT:
    ({ sku, discountedPrice }: FLAT_DISCOUNT) =>
    (transaction: Product[]) => {
      return transaction.map((item) => {
        if (item.sku === sku) item.price = discountedPrice;
        return item;
      });
    },
};
