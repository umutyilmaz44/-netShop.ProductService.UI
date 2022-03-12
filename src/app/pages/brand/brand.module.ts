import { BrandComponent } from './brand.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/core/core.module';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';

@NgModule({
  declarations: [
    BrandComponent,
    BrandDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BrandModule { }
