import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageModel } from './PageModel';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  _pageModel: PageModel = new PageModel();
  @Input() set pageModel(value: PageModel){
    this._pageModel = value;
    this.setValues();
  }

  get pageModel(): PageModel{
    return this._pageModel;
  }

  @Output() pageChangeEvent = new EventEmitter();

  toValue: number = 0;
  fromValue: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.setValues();
  }

  changePage(_page:number) {
    this._pageModel.currentPage =_page;
    this.setValues();
    this.pageChangeEvent.emit(_page);
  }

  setValues(){
    this.toValue = 0;
    this.fromValue = 0;

    if(this._pageModel && this._pageModel.currentPage && this._pageModel.pageSize){
      this.toValue = (this._pageModel.currentPage - 1) * this._pageModel.pageSize + 1;
      this.fromValue = this._pageModel.currentPage * this._pageModel.pageSize + 1;
    }
    if(this.fromValue > this._pageModel.totalCount){
      this.fromValue = this._pageModel.totalCount;
    }
  }
}
