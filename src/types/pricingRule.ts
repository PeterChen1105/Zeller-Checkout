export type THREE_FOR_TWO = {
  sku: string;
  type: string;
};

export type BULK_DISCOUNT = {
  sku: string;
  discountedPrice: number;
  noOfItems: number;
  type: string;
};

export type FLAT_DISCOUNT = {
  sku: string;
  discountedPrice: number;
  type: string;
};

export type Rule = THREE_FOR_TWO | BULK_DISCOUNT | FLAT_DISCOUNT;
