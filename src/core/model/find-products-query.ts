import { BaseQuery } from "./base-query";

export class FindProductsQuery implements BaseQuery {
  SupplierId?:string;
  BrandModelId?:string;
  ProductCode?:string;
  ProductName?:string;
  Description?:string;
  Price?:number;
  PriceLowerThan?:number;
  PrPriceGreaterThanice?:number;
  Quantity?:number;
  QuantityLowerThan?:number;
  QuantityGreaterThan?:number;
  GenericQuery?:string;
}
