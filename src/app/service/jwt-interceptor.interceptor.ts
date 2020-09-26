import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser;
    const authRequest = this.authService.currentJwtToken;
    if (currentUser && authRequest?.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authRequest.jwt}`
        }
      });
    }

    return next.handle(request);
  }
}
