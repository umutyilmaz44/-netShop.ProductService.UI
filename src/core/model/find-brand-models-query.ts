import { BaseQuery } from './base-query';

export class FindBrandModelsQuery implements BaseQuery {
  BrandId?:string;
  ModelName?:string;
  Description?:string;
  GenericQuery?:string;
}
