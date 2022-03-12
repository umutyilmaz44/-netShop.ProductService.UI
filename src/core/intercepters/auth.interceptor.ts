import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isLoggedIn()){
      // let headers = new HttpHeaders({
      //   'Authorization': this.authService.getAuthorizationHeaderValue(),
      //   responseType: 'text'
      // });
      request = request.clone({
        setHeaders: { Authorization: `${this.authService.getAuthorizationHeaderValue()}` }
    });
    }

    return next.handle(request);
  }
}
