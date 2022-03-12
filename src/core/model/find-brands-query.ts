import { BaseQuery } from "./base-query";

export class FindBrandsQuery implements BaseQuery {
  BrandName?:string;
  Description?:string;
  GenericQuery?:string;
}
