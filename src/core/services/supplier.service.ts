import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from './../dto/supplier';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<Supplier> {

  constructor(
    private http: HttpClient) {
      super(http, Supplier, `suppliers`);
  }
}
