import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Brand } from 'src/core/dto/brand';
import { BrandService } from 'src/core/services/brand.service';
import { LoadingService } from 'src/core/services/loading.service';
import { ToasterService } from 'src/core/services/toaster.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css'],
})
export class BrandDetailComponent implements OnInit {
  @Output() reloadRequest = new EventEmitter();
  @ViewChild('brandDetailModalClose')
  closeBtn!: ElementRef;

  brand: Brand;

  brandForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private brandService: BrandService,
    private toasterService: ToasterService
  ) {
    this.brandForm = this.fb.group({
      brandName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl(''),
    });

    this.brand = this.brandForm.value;
  }

  ngOnInit(): void {

  }

  reset() {
    this.brandForm.reset();
  }

  loadData(_brand: Brand) {
    this.reset();

    this.brand = _brand;
    this.brandForm.patchValue(this.brand);
  }

  save() {
    this.brand.patchData(this.brandForm.value);

    this.loadingService.showLoader();
    if (this.brand.id) {
      this.brandService.update(this.brand).subscribe((res) => {
        this.loadingService.hideLoader();

        if (res && res.succeeded) {
          this.reloadRequest.emit();
          this.closeBtn.nativeElement.click();
          this.toasterService.success('The update has been done successfully.');
        }
      });
    } else {
      this.brandService.create(this.brand).subscribe((res) => {
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
    return this.brandForm.controls;
  }
}
