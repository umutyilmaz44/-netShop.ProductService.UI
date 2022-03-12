import { BaseDto } from "./base";

export class Supplier extends BaseDto<Supplier> {
  supplierName?: string;
  description?: string;
  website?: string;
  logo?: string;
  email?: string;
  phone?: string;
  fax?: string;

  constructor(model?: Partial<Supplier>) {
    super(model);
  }

  setData(data: Supplier){
    this.id = data.id;
    this.supplierName = data.supplierName;
    this.description = data.description;
    this.website = data.website;
    this.logo = data.logo;
    this.email = data.email;
    this.phone = data.phone;
    this.fax = data.fax;
  }

  patchData(model: Partial<Supplier>){
    let data = {...this, ...model};
    this.setData(data);
  }
}
