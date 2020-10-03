import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.storageService.loadUserFromStorage();
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
