import { BaseQuery } from "./base-query";

export class FindSuppliersQuery implements BaseQuery {
  SupplierId?:string;
  Website?:string;
  Logo?:string;
  Email?:string;
  Phone?:number;
  Fax?:number;
  Description?:string;
  GenericQuery?:string;
}
