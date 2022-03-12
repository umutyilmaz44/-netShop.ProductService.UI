import { Product } from './../../../core/dto/product';
import { LoadingService } from './../../../core/services/loading.service';
import { ModalAlertService } from '../../../core/services/modal-alert.service';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageModel, SortType } from 'src/core/components/paginator/PageModel';
import { QueryFilter } from 'src/core/components/query.filter';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  columnList:any = {
    SupplierName: true,
    BrandName : true,
    ModelName: true,
    ProductCode: true,
    ProductName:true,
    Price: true,
    Quantity:true,
    Description: true
  };
  columnNames:any = Object.keys(this.columnList);
  sortFieldList : any = {
    id : "id" ,
    SupplierName : 'Supplier Name',
    BrandName : 'Brand Name',
    ModelName : 'Model Name',
    ProductCode : 'Product Code',
    ProductName : 'Product Name',
    Price : 'Price',
    Quantity : 'Quantity'
  };
  sortTitle = this.sortFieldList['id'];
  dataList:any = [];
  isMultiSelect = false;
  multiSelectList = [];
  coroutine: any;
  searchKey = "";

  sortType: SortType;
  sortField: string;

  pageModel: PageModel = new PageModel();
  queryFilter = new QueryFilter();

  @ViewChild('productDetailComponent')
  productDetail!: ProductDetailComponent;

  constructor(
    private productService: ProductService,
    private modalService: ModalAlertService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {
    this.sortType = SortType.ASC;
    this.sortField = 'productName';

    this.pageModel = new PageModel();
    this.pageModel.sortType = this.sortType;
    this.pageModel.sortField = this.sortField;

    this.queryFilter = new QueryFilter();
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList($event?: any): void {
    this.queryFilter.clear();
    this.searchKey = $event ? $event : '';
    if (this.searchKey && this.searchKey.trim().length>1) {
      this.queryFilter.add('GenericQuery', this.searchKey.trim());
    }else{
      this.queryFilter.add('GenericQuery', "");
    }

    if($event){
      this.pageModel.currentPage = 1;
    }

    this.loadingService.showLoader();
    this.productService.find(this.pageModel.pageSize, this.pageModel.currentPage, this.pageModel.sortField, this.pageModel.sortType,
                                    this.queryFilter.getFilterAsJson()).subscribe(res => {
      this.loadingService.hideLoader();

      if(res && res.succeeded){
        this.dataList = res.data;
        this.pageModel = new PageModel(this.pageModel);
        this.pageModel.bindData(res);
        this.pageModel.sortType = this.sortType;
        this.pageModel.sortField = this.sortField;
      }
    });
  }

  reloadRequest() {
    this.getProductList();
  }

  searchByKey($event: any) {
    if(this.coroutine) {
      clearTimeout(this.coroutine);
    }
    this.coroutine = setTimeout(() => {
      this.getProductList($event);
    }, 1000);
  }

  setSortField(columnName: string) {
    if(this.sortFieldList[columnName]){
      this.sortTitle = this.sortFieldList[columnName];
      if(columnName == this.sortField){
        if(this.sortType != SortType.ASC){
          this.sortType = SortType.ASC;
        }else{
          this.sortType = SortType.DESC;
        }
      }else{
        this.sortType = SortType.ASC;
      }
      this.sortField = columnName;
      this.getProductList();
    }
  }

  addNewProduct(){
    this.productDetail.loadData(new Product());
  }

  editProduct(product:Product){
    this.productDetail.loadData(product);
  }

  deleteConfirm(item:Product){
    this.modalService.confirmBoxWithHtml(
      'Confirm',
      'Are you sure?<br/><strong>(' + item.productCode + ') ' + item.productName + '</strong>',
      this.delete.bind(this, item.id),
      null
    );
  }

  delete(id?:string){
    if(id){
      this.loadingService.showLoader();
      this.productService.delete(id).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest();
          this.toasterService.success('The deletion has been done successfully.');
        }
      });
    }
  }
}

