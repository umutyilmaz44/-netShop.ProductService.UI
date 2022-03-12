import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SortType } from 'src/core/components/paginator/PageModel';
import { Brand } from 'src/core/dto/brand';
import { BrandModel } from 'src/core/dto/brand-model';
import { BrandModelService } from 'src/core/services/brand-model.service';
import { BrandService } from 'src/core/services/brand.service';
import { LoadingService } from 'src/core/services/loading.service';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-brand-model-detail',
  templateUrl: './brand-model-detail.component.html',
  styleUrls: ['./brand-model-detail.component.css'],
})
export class BrandModelDetailComponent implements OnInit {
  @Output() reloadRequest = new EventEmitter();
  @ViewChild('brandModelDetailModalClose')
  closeBtn!: ElementRef;

  brandList: Brand[];
  brandModel: BrandModel;

  brandModelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private brandService: BrandService,
    private brandModelService: BrandModelService,
    private toasterService: ToasterService
  ) {
    this.brandModelForm = this.fb.group({
      brandId: new FormControl('', [
        Validators.required
      ]),
      modelName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl(''),
    });

    this.brandList = [];
    this.brandModel = this.brandModelForm.value;
  }

  ngOnInit(): void {}

  reset() {
    this.brandModelForm.reset();
  }

  loadData(_brandModel: BrandModel) {
    this.reset();

    this.loadingService.showLoader();
    this.brandService.find(1000, 1, 'brandName', SortType.ASC, {}).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.brandList = res.data ? res.data : [];
        }

        this.brandModel = _brandModel;
        this.brandModelForm.patchValue(this.brandModel);
      });
  }

  save() {
    this.brandModel.patchData(this.brandModelForm.value);
    this.brandModel.brand = undefined;

    this.loadingService.showLoader();

    if (this.brandModel.id) {
      this.brandModelService.update(this.brandModel).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest.emit();
          this.closeBtn.nativeElement.click();
          this.toasterService.success('The update has been done successfully.');
        }
      });
    } else {
      this.brandModelService.create(this.brandModel).subscribe((res) => {
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
    return this.brandModelForm.controls;
  }
}
