import { Supplier } from './../../../core/dto/supplier';
import { SupplierService } from './../../../core/services/supplier.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageModel, SortType } from 'src/core/components/paginator/PageModel';
import { QueryFilter } from 'src/core/components/query.filter';
import { LoadingService } from 'src/core/services/loading.service';
import { ModalAlertService } from 'src/core/services/modal-alert.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  // animations: [trigger('openClose', [
  //   state('*', style({ transform: 'translateX(0px)' })),
  //   state('void', style({ transform: 'translateX(-150%)' })),
  //   transition('void => *', animate('1s ease-in-out')),
  //   transition('* => void', animate('1s ease-in-out')),
  //   transition('* => void', animate('1s ease-in-out')),
  // ])]
})
export class SupplierComponent implements OnInit {

  columnList:any = {
    Logo: true,
    SupplierName: true,
    Website : true,
    Email: true,
    Phone: true,
    Fax:true,
    Description: true
  };
  columnNames:any = Object.keys(this.columnList);
  sortFieldList : any = {
    id : "id" ,
    SupplierName : 'Supplier Name',
    Website : 'Website',
    Email : 'Email',
    Phone : 'Phone',
    Fax : 'Fax'
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

  @ViewChild('supplierDetailComponent')
  supplierDetail!: SupplierDetailComponent;

  constructor(
    private supplierService: SupplierService,
    private modalService: ModalAlertService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {
    this.sortType = SortType.ASC;
    this.sortField = 'supplierName';

    this.pageModel = new PageModel();
    this.pageModel.sortType = this.sortType;
    this.pageModel.sortField = this.sortField;

    this.queryFilter = new QueryFilter();
   }

  ngOnInit(): void {
    this.getSupplierList();
  }

  getSupplierList($event?: any): void {
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
    this.supplierService.find(this.pageModel.pageSize, this.pageModel.currentPage, this.pageModel.sortField, this.pageModel.sortType,
                                    this.queryFilter.getFilterAsJson()).subscribe(res => {
      this.loadingService.hideLoader();

      if(res && res.succeeded) {
        this.dataList = res.data;
        this.pageModel = new PageModel(this.pageModel);
        this.pageModel.bindData(res);
        this.pageModel.sortType = this.sortType;
        this.pageModel.sortField = this.sortField;
      }
    });
  }

  reloadRequest() {
    this.getSupplierList();
  }

  searchByKey($event: any) {
    if(this.coroutine) {
      clearTimeout(this.coroutine);
    }
    this.coroutine = setTimeout(() => {
      this.getSupplierList($event);
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
      this.getSupplierList();
    }
  }

  addNewSupplier(){
    this.supplierDetail.loadData(new Supplier());
  }

  editSupplier(supplier:Supplier){
    this.supplierDetail.loadData(supplier);
  }

  deleteConfirm(item:Supplier){
    this.modalService.confirmBoxWithHtml(
      'Confirm',
      'Are you sure?<br/><strong>' + item.supplierName + '</strong>',
      this.delete.bind(this, item.id),
      null
    );
  }

  delete(id?:string){
    if(id){
      this.loadingService.showLoader();
      this.supplierService.delete(id).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest();
          this.toasterService.success('The deletion has been done successfully.');
        }
      });
    }
  }
}
