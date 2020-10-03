import {Injectable} from '@angular/core';
import {AppUserDTO, AppUserPostDto, AUthResponse} from '../../api-models/api-models';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {first, map} from 'rxjs/operators';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<AppUserDTO>;
  currentUserObservable: Observable<AppUserDTO>;
  currentJwtToken: AUthResponse;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.currentUserSubject = new BehaviorSubject<AppUserDTO>(this.storageService.loadUserFromStorage());
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppUserDTO {
    return this.currentUserSubject.value;
  }

  updateUserData(userData: AppUserDTO) {
    this.currentUserSubject.next(userData);
    this.storageService.saveUserInStorage(userData);
  }

  register(newUser: AppUserPostDto): Observable<AppUserDTO> {
    return this.http.post<AppUserDTO>(`${environment.apiUrl}/app-user/register`, newUser).pipe(
      first());
  }

  login(username: string, password: string) {
    return this.http.post<AppUserDTO>(`${environment.apiUrl}/auth`, {username, password})
      .pipe(
        first(),
        map(user => {
        this.storageService.saveUserInStorage(user);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    this.currentUserSubject.next(null);
    this.storageService.removeUserFromStorage();
  }

}
