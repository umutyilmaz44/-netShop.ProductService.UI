import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, map, mergeMap } from 'rxjs';
import { SortType } from 'src/core/components/paginator/PageModel';
import { QueryFilter } from 'src/core/components/query.filter';
import { Brand } from 'src/core/dto/brand';
import { BrandModel } from 'src/core/dto/brand-model';
import { Product } from 'src/core/dto/product';
import { Supplier } from 'src/core/dto/supplier';
import { BrandModelService } from 'src/core/services/brand-model.service';
import { BrandService } from 'src/core/services/brand.service';
import { LoadingService } from 'src/core/services/loading.service';
import { ProductService } from 'src/core/services/product.service';
import { SupplierService } from 'src/core/services/supplier.service';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Output() reloadRequest = new EventEmitter();
  @ViewChild('productDetailModalClose')
  closeBtn!: ElementRef;

  supplierList: Supplier[];
  brandList: Brand[];
  brandModelList: BrandModel[];
  product: Product;

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private supplierService: SupplierService,
    private brandService: BrandService,
    private brandModelService: BrandModelService,
    private productService: ProductService,
    private toasterService: ToasterService
  ) {
    this.productForm = this.fb.group({
      supplierId: new FormControl(null, [
        Validators.required
      ]),
      brandId: new FormControl(null, [
        Validators.required
      ]),
      brandModelId: new FormControl(null, [
        Validators.required
      ]),
      productCode: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      price: new FormControl('0', [
        Validators.required
      ]),
      quantity: new FormControl('0', [
        Validators.required
      ]),
      description: new FormControl(''),
    });

    this.supplierList = [];
    this.brandList = [];
    this.brandModelList = [];
    this.product = this.productForm.value;
  }

  ngOnInit(): void {}

  reset() {
    this.productForm.reset();
    this.supplierList = [];
    this.brandList = [];
    this.brandModelList = [];
  }

  loadData(_product: Product) {
    this.reset();
    this.product = _product;

    this.loadingService.showLoader();

    if(_product && _product.brandModelId){

      let supplierListSubscribe = this.supplierService.find(1000, 1, 'supplierName', SortType.ASC, {});
      let brandListSubscribe = this.brandService.find(1000, 1, 'brandName', SortType.ASC, { });
      let brandModelSubscribe = this.brandModelService.getById(_product. brandModelId);

      forkJoin([supplierListSubscribe, brandListSubscribe, brandModelSubscribe]).pipe(
        map(result => {
          let _brandModel: BrandModel | null = null;
          if(result[0] && result[0].succeeded){
            this.supplierList = result[0].data ? result[0].data : [];
          }
          if(result[1] && result[1].succeeded){
            this.brandList = result[1].data ? result[1].data : [];
          }
          if(result[2] && result[2].succeeded){
            _brandModel = result[2].data ? result[2].data : null;
          }
          this.productForm.patchValue({ brandId: _brandModel?.brandId });

          return _brandModel;
        }),
        mergeMap(brandModel => this.brandModelService.find(1000, 1, 'modelName', SortType.ASC, { brandId: brandModel?.brandId }))
      ).subscribe(result => {
        this.loadingService.hideLoader();
        if(result && result.succeeded){
          this.brandModelList = result.data ? result.data : [];
        }
      });

      this.productForm.patchValue(this.product);
    } else {
      let supplierListSubscribe = this.supplierService.find(1000, 1, 'supplierName', SortType.ASC, {});
      let brandListSubscribe = this.brandService.find(1000, 1, 'brandName', SortType.ASC, { });
      forkJoin([supplierListSubscribe, brandListSubscribe]).subscribe(result => {
        this.loadingService.hideLoader();

        if(result[0] && result[0].succeeded){
          this.supplierList = result[0].data ? result[0].data : [];
        }
        if(result[1] && result[1].succeeded){
          this.brandList = result[1].data ? result[1].data : [];
        }
      });
    }
  }

  save() {
    this.product.patchData(this.productForm.value);
    this.product.supplier = undefined;
    this.product.brandModel = undefined;

    this.loadingService.showLoader();

    if (this.product.id) {
      this.productService.update(this.product).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest.emit();
          this.closeBtn.nativeElement.click();
          this.toasterService.success('The update has been done successfully.');
        }
      });
    } else {
      this.productService.create(this.product).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest.emit();
          this.closeBtn.nativeElement.click();
          this.toasterService.success(
            'Registration has been done successfully.'
          );
        }
      });
    }
  }

  get frm(){
    return this.productForm.controls;
  }

  brand_OnChange($event: any){
    let _brandId = $event.target.value;
    let queryFilter = new QueryFilter();
    queryFilter.add('brandId', _brandId);
    this.brandModelList = [];

    this.loadingService.showLoader();
    this.brandModelService.find(1000, 1, 'modelName', SortType.ASC, queryFilter.getFilterAsJson()).subscribe((res) => {
      this.loadingService.hideLoader();

      if (res && res.succeeded) {
        this.brandModelList = res.data ? res.data : [];
        this.productForm.patchValue({ brandModelId: '' });
      }
    });
  }
}
