import { Supplier } from './../../../../core/dto/supplier';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/core/services/loading.service';
import { ToasterService } from 'src/core/services/toaster.service';
import { SupplierService } from 'src/core/services/supplier.service';
import { SortType } from 'src/core/components/paginator/PageModel';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  @Output() reloadRequest = new EventEmitter();
  @ViewChild('supplierDetailModalClose')
  closeBtn!: ElementRef;

  supplier: Supplier;

  supplierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {
    this.supplierForm = this.fb.group({
      supplierName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      website: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\+?[0-9\\s]*$'),
        Validators.minLength(10)]),
      fax: new FormControl('',[
        Validators.pattern('^\\+?[0-9\\s]*$'),
        Validators.minLength(10)
      ]),
      description: new FormControl('')
    });

    this.supplier = this.supplierForm.value;
  }

  ngOnInit(): void {
  }

  reset() {
    this.supplierForm.reset();
  }

  loadData(_supplier: Supplier){
    this.reset();
    this.supplier = _supplier;
    this.supplierForm.patchValue(this.supplier);
  }

  save(){
    this.supplier.patchData(this.supplierForm.value);
    this.supplier.email = this.supplier.email?.trim();
    this.supplier.phone = this.supplier.phone?.trim();
    this.supplier.fax = this.supplier.fax?.trim();

    this.loadingService.showLoader();
    if (this.supplier.id) {
      this.supplierService.update(this.supplier).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest.emit();
          this.closeBtn.nativeElement.click();
          this.toasterService.success('The update has been done successfully.');
        }
      });
    } else {
      this.supplierService.create(this.supplier).subscribe((res) => {
          this.loadingService.hideLoader();

          if (res && res.succeeded) {
            this.reloadRequest.emit();
            this.closeBtn.nativeElement.click();
            this.toasterService.success('Registration has been done successfully.');
          }
        });
    }
  }

  get frm(){
    return this.supplierForm.controls;
  }
}
