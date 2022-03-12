import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from './../dto/brand';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<Brand>{

  constructor(
    private http: HttpClient) {
      super(http, Brand, `brands`);
  }
}
