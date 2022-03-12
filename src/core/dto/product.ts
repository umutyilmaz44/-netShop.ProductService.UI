import { Supplier } from './supplier';
import { BrandModel } from './brand-model';
import { BaseDto } from './base';

export class Product extends BaseDto<Product> {
  supplierId?: string;
  brandModelId?: string;
  productCode?: string;
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;

  supplier?: Supplier;
  brandModel?: BrandModel;

  constructor(model?: Partial<Product>) {
    super(model);
  }

  setData(data: Product){
    this.id = data.id;
    this.supplierId = data.supplierId;
    this.brandModelId = data.brandModelId;
    this.productCode = data.productCode;
    this.productName = data.productName;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.supplier = data.supplier;
    this.brandModel = data.brandModel;
  }

  patchData(model: Partial<Product>){
    let data = {...this, ...model};
    this.setData(data);
  }
}
