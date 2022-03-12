import { AuthInterceptor } from './../core/intercepters/auth.interceptor';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { SecuredLayoutComponent } from './layouts/secured-layout/secured-layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninCallbackComponent } from './pages/signin-callback/signin-callback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SilentCallbackComponent } from './pages/silent-callback/silent-callback.component';

import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/core/core.module';
import { ErrorInterceptor } from 'src/core/intercepters/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    SecuredLayoutComponent,
    SigninCallbackComponent,
    SilentCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide:  HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide:  HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
