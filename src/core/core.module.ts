import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from './components/loading/loading.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    PaginatorComponent,
    LoadingComponent
  ]
})
export class CoreModule { }
