import { BaseDto } from "./base";

export class Brand extends BaseDto<Brand> {
  brandName?: string;
  description?: string;

  constructor(model?: Partial<Brand>) {
    super(model);
  }

  setData(data: Brand){
    this.id = data.id;
    this.brandName = data.brandName;
    this.description = data.description;
  }
  patchData(model: Partial<Brand>){
    let data = {...this, ...model};
    this.setData(data);
  }
}

