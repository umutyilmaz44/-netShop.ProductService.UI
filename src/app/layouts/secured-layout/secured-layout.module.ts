import { ProductModule } from './../../pages/product/product.module';
import { BrandModelModule } from './../../pages/brand-model/brand-model.module';
import { BrandModule } from './../../pages/brand/brand.module';
import { SupplierModule } from './../../pages/supplier/supplier.module';
import { CoreModule } from 'src/core/core.module';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredLayoutRoutes } from './secured-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreModule,
    FormsModule,
    BrandModule,
    BrandModelModule,
    SupplierModule,
    ProductModule,
    RouterModule.forChild(SecuredLayoutRoutes),
  ]
})
export class SecuredLayoutModule { }
