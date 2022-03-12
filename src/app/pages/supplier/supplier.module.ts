import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierComponent } from './supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SupplierComponent,
    SupplierDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
