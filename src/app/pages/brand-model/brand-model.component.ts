import { BrandModel } from './../../../core/dto/brand-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageModel, SortType } from 'src/core/components/paginator/PageModel';
import { QueryFilter } from 'src/core/components/query.filter';
import { BrandModelService } from 'src/core/services/brand-model.service';
import { LoadingService } from 'src/core/services/loading.service';
import { ModalAlertService } from 'src/core/services/modal-alert.service';
import { BrandModelDetailComponent } from './brand-model-detail/brand-model-detail.component';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-brand-model',
  templateUrl: './brand-model.component.html',
  styleUrls: ['./brand-model.component.css']
})
export class BrandModelComponent implements OnInit {

  columnList:any = {
    BrandName: true,
    ModelName: true,
    Description: true
  };
  columnNames:any = Object.keys(this.columnList);
  sortFieldList : any = {
    id : "id" ,
    BrandName : 'Brand Name',
    ModelName : 'Model Name'
  };
  sortTitle = this.sortFieldList['id'];
  dataList:any = [];
  isMultiSelect = false;
  multiSelectList = [];
  coroutine: any;
  searchKey = "";

  sortType: SortType;
  sortField: string;

  pageModel: PageModel;
  queryFilter: QueryFilter;

  @ViewChild('brandModelDetailComponent')
  brandModelDetail!: BrandModelDetailComponent;

  constructor(
    private brandModelService: BrandModelService,
    private modalService: ModalAlertService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {
    this.sortType = SortType.ASC;
    this.sortField = 'modelName';

    this.pageModel = new PageModel();
    this.pageModel.sortType = this.sortType;
    this.pageModel.sortField = this.sortField;

    this.queryFilter = new QueryFilter();
  }

  ngOnInit(): void {
    this.getBrandModelList();
  }

  getBrandModelList($event?: any): void {
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
    this.pageModel.sortType = this.sortType;
    this.pageModel.sortField = this.sortField;

    this.loadingService.showLoader();
    this.brandModelService.find(this.pageModel.pageSize, this.pageModel.currentPage, this.pageModel.sortField, this.pageModel.sortType,
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
    this.getBrandModelList();
  }

  searchByKey($event: any) {
    if(this.coroutine) {
      clearTimeout(this.coroutine);
    }
    this.coroutine = setTimeout(() => {
      this.getBrandModelList($event);
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
      this.getBrandModelList();
    }
  }

  addNewBrandModel(){
    this.brandModelDetail.loadData(new BrandModel());
  }

  editBrandModel(brandModel:BrandModel){
    this.brandModelDetail.loadData(brandModel);
  }

  deleteConfirm(item:BrandModel){
    this.modalService.confirmBoxWithHtml(
      'Confirm',
      'Are you sure?<br/><strong>(' + item.brand?.brandName + ') '+ item.modelName + '</strong>',
      this.delete.bind(this, item.id),
      null
    );
  }

  delete(id?:string){
    if(id){
      this.loadingService.showLoader();
      this.brandModelService.delete(id).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest();
          this.toasterService.success('The deletion has been done successfully.');
        }
      });
    }
  }

}
