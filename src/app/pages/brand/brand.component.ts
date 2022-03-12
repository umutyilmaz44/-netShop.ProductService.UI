import { Brand } from './../../../core/dto/brand';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageModel, SortType } from 'src/core/components/paginator/PageModel';
import { QueryFilter } from 'src/core/components/query.filter';
import { BrandService } from 'src/core/services/brand.service';
import { LoadingService } from 'src/core/services/loading.service';
import { ModalAlertService } from 'src/core/services/modal-alert.service';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  columnList:any = {
    BrandName: true,
    Description: true
  };
  columnNames:any = Object.keys(this.columnList);
  sortFieldList : any = {
    id : "id" ,
    BrandName : 'Brand Name',
  };
  sortTitle = this.sortFieldList['id'];
  dataList:any = [];
  isMultiSelect = false;
  multiSelectList = [];
  coroutine: any;
  searchKey = "";
  searchFilter = "ASC";
  sortTempField = 'id';

  pageModel: PageModel = new PageModel();
  queryFilter = new QueryFilter();

  @ViewChild('brandDetailComponent')
  brandDetail!: BrandDetailComponent;

  constructor(
    private brandService: BrandService,
    private modalService: ModalAlertService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList($event?: string): void {
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
    this.brandService.find(this.pageModel.pageSize, this.pageModel.currentPage, this.pageModel.sortField, this.pageModel.sortType,
                                    this.queryFilter.getFilterAsJson()).subscribe(res => {
      this.loadingService.hideLoader();

      if(res && res.succeeded){
        this.dataList = res.data;
        this.pageModel = new PageModel();
        this.pageModel.bindData(res);
      }
    });
  }

  reloadRequest() {
    this.getBrandList();
  }

  searchByKey($event: any) {
    if(this.coroutine) {
      clearTimeout(this.coroutine);
    }
    this.coroutine = setTimeout(() => {
      this.getBrandList($event);
    }, 1000);
  }

  setSortField(columnName: string) {
    if(this.sortFieldList[columnName]){
      this.sortTitle = this.sortFieldList[columnName];
      if(columnName == this.sortTempField){
        if(this.searchFilter == 'DESC' || this.searchFilter == ''){
          this.searchFilter = 'ASC';
        }else{
          this.searchFilter = 'DESC';
        }
      }else{
        this.searchFilter = 'ASC';
      }
      this.sortTempField = columnName;
      this.pageModel.sortField = this.sortTempField;
      this.pageModel.sortType = this.searchFilter == 'ASC' ? SortType.ASC : SortType.DESC;
      this.getBrandList();
    }
  }

  addNewBrand(){
    this.brandDetail.loadData(new Brand());
  }

  editBrand(brand:Brand){
    this.brandDetail.loadData(brand);
  }

  deleteConfirm(item:Brand){
    this.modalService.confirmBoxWithHtml(
      'Confirm',
      'Are you sure?<br/><strong>' + item.brandName + '</strong>',
      this.delete.bind(this, item.id),
      null
    );
  }

  delete(id?:string){
    if(id){
      this.loadingService.showLoader();
      this.brandService.delete(id).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest();
          this.toasterService.success('The deletion has been done successfully.');
        }
      });
    }
  }

}
