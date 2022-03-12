import { BrandModelComponent } from './brand-model.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/core/core.module';
import { BrandModelDetailComponent } from './brand-model-detail/brand-model-detail.component';



@NgModule({
  declarations: [
    BrandModelComponent,
    BrandModelDetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BrandModelModule { }
