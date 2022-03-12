import { SupplierComponent } from './../../pages/supplier/supplier.component';
import { BrandModelComponent } from './../../pages/brand-model/brand-model.component';
import { BrandComponent } from './../../pages/brand/brand.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { AuthGuardService } from 'src/core/services/auth-guard.service';

export const SecuredLayoutRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: "products",
    component: ProductComponent,
    // canActivate:[AuthGuardService]
  },
  {
    path: "brands",
    component: BrandComponent,
    // canActivate:[AuthGuardService]
  },
  {
    path: "models",
    component: BrandModelComponent,
    // canActivate:[AuthGuardService]
  },
  {
    path: "suppliers",
    component: SupplierComponent,
    // canActivate:[AuthGuardService]
  }
];
