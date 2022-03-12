import { IntroComponent } from '../../pages/intro/intro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const PublicLayoutRoutes: Routes = [
  {
    path: 'intro', component: IntroComponent
  },
];
