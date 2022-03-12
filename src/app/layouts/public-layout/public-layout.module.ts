import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IntroComponent } from './../../pages/intro/intro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PublicLayoutRoutes } from './public-layout.routing';


@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forChild(PublicLayoutRoutes),
  ]
})
export class PublicLayoutModule { }
