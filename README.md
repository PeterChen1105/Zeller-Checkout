![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

# Checkout System

## 1. Code Design

### 1.1 Checkout

`checkout` is defined as a class **Checkout**, with two private fields `products` & `pricingRules` (optional). `checkout` provides a few publicly available functions:

- `scan`: add a new product into the checkout system (and return the current number of items in the system).
- `getRules`: get all the pricing rules for the current checkout system.
- `total`: applying all pricing rules and calculating the total price for the products and returning the price after calculation.

### 1.2 Pricing Rule (Type)

Three pricing rule types are defined (under `src/types/pricingRule.ts`). Each rule will take different types of data for initialization.

For example, when creating a `THREE_FOR_TWO` pricing rule, the only data needed is the product SKU. However, for a `BULK_DISCOUNT` pricing rule, we need to pass in not only the product SKU but also the discounted price and the minimum number of products needed to reach the bulk discount condition.

```TS
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
```

### 1.3 Product (Type)

Products are defined as types with SKU, Name, and Price:

```TS
export type Product = {
  sku: string;
  name: string;
  price: number;
};
```

### 1.4 Pricing Rules

`pricingRule` defines the calculation action required for each pricing rule. By passing a pricing rule type and the corresponding rule details to `rules`, a pricing rule function will be returned which takes in a list of products and return the updated product list after applying each pricing rule.

For example, for the `BUIK_DISCOUNT` rule, all the prices for a specific product will be replaced with the discounted price if the bulk discount condition has been fulfilled.

## 2. Files Overview

```
src/
-- checkout/           // checkout system
-- constants/          // constants including products and pre-defined pricing rules
-- pricingRule/        // pricing rules
-- types/              // product and pricing rule types

test/
-- e2e.spec.ts         // integration tests
```

## 3. Testing

### 3.1 Run Unit Tests

- Run `npm install` to install dependencies.
- Run `npm run test` for unit testing.

_Note: Unit test files are in the `src` folder and named as `.spec.ts` next to the target file._

### 3.2 Run Integration Tests

- Run `npm run test:e2e` for integration testing.

### 3.2 Generate Testing Coverage Info

- Run `npm run test:coverage` for generating a testing coverage report.
