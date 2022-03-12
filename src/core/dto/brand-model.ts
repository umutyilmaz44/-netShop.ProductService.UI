import { BaseDto } from './base';
import { Brand } from './brand';
export class BrandModel extends BaseDto<BrandModel> {
  brandId?: string;
  modelName?: string;
  description?: string;

  brand?:Brand;

  constructor(model?: Partial<BrandModel>) {
    super(model);
  }

  setData(data: BrandModel){
    this.id = data.id;
    this.brandId = data.brandId;
    this.modelName = data.modelName;
    this.description = data.description;
    this.brand = data.brand;
  }

  patchData(model: Partial<BrandModel>){
    let data = {...this, ...model};
    this.setData(data);
  }
}
