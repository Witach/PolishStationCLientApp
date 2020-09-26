import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {AppUserDTO} from '../../api-models/api-models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser: AppUserDTO = this.authService.currentUser;
    if (currentUser || this.isOnAuthApp()) {
      return true;
    }
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  private isOnAuthApp() {
    return !this.router.url.includes('auth');
  }
}
