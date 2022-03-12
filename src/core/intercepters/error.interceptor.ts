import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      this.loadingService.hideLoader();

      if ([401].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          this.authService.logout();
      } else if ([403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        this.toasterService.error('Unauthorized operation cancelled.');
      } else if ([404].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        this.toasterService.error(err.message);
      }

      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${err.error.message}`;
      } else if(err?.error?.FailureType && err?.error?.Failures){
        errorMessage = `${err.error.FailureType}`;
        for (const key of Object.keys(err.error.Failures)) {
          errorMessage += `<br/>${err.error.Failures[key]}`;
        }
      } else {
          // server-side error
          errorMessage = `Error Status: ${err.status}\nMessage: ${err.message}`;
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      console.error(errorMessage);

      this.toasterService.error(errorMessage, 'ERROR');

      return throwError(error);
  }));
  }
}
