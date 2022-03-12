import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { SecuredLayoutComponent } from './layouts/secured-layout/secured-layout.component';
import { SilentCallbackComponent } from './pages/silent-callback/silent-callback.component';
import { SigninCallbackComponent } from './pages/signin-callback/signin-callback.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: "signin-callback", component: SigninCallbackComponent
  },
  {
    path: "silent-callback", component: SilentCallbackComponent
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ('./layouts/public-layout/public-layout.module').then(m => m.PublicLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: SecuredLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ('./layouts/secured-layout/secured-layout.module').then(m => m.SecuredLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/intro'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
