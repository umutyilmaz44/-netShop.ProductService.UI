import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandModel } from './../dto/brand-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BrandModelService  extends BaseService<BrandModel> {

  constructor(
    private http: HttpClient) {
      super(http, BrandModel, `brandModels`);
  }
}
