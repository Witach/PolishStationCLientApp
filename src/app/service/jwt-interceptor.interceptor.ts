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
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.router.url.includes('auth')) {
      const currentUser = this.storageService.loadUserFromStorage();
      if (currentUser?.jwt) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.jwt}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
