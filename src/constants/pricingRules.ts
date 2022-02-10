import { THREE_FOR_TWO, BULK_DISCOUNT, FLAT_DISCOUNT } from "../types";

export const IPD_THREE_FOR_TWO: THREE_FOR_TWO = {
  sku: "ipd",
  type: "THREE_FOR_TWO",
};

export const ATV_THREE_FOR_TWO: THREE_FOR_TWO = {
  sku: "atv",
  type: "THREE_FOR_TWO",
};

export const IPD_BULK_DISCOUNT: BULK_DISCOUNT = {
  sku: "ipd",
  discountedPrice: 499.99,
  noOfItems: 5,
  type: "BULK_DISCOUNT",
};

export const IPD_FLAT_DISCOUNT: FLAT_DISCOUNT = {
  sku: "ipd",
  discountedPrice: 399.99,
  type: "FLAT_DISCOUNT",
};

export const OTHER_FLAT_DISCOUNT: FLAT_DISCOUNT = {
  sku: "abc",
  discountedPrice: 99.99,
  type: "FLAT_DISCOUNT",
};
