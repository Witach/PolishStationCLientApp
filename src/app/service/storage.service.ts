import { Injectable } from '@angular/core';
import {AppUserDTO} from '../../api-models/api-models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  APP_USER_KEY = 'appUser';

  constructor() { }

  public removeUserFromStorage() {
    localStorage.removeItem(this.APP_USER_KEY);
  }

  public saveUserInStorage(user: AppUserDTO) {
    localStorage.setItem(this.APP_USER_KEY, JSON.stringify(user));
  }

  public loadUserFromStorage() {
    return JSON.parse(localStorage.getItem(this.APP_USER_KEY));
  }
}
