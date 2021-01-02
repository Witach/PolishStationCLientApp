import {Injectable} from '@angular/core';
import {AppUserDTO, AppUserPostDto, AppUserStatsDTO, AUthResponse} from '../../api-models/api-models';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {first, map, mergeMapTo, switchMap, tap} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {AngularFireMessaging} from "@angular/fire/messaging";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<AppUserDTO>;
  currentUserObservable: Observable<AppUserDTO>;
  currentJwtToken: AUthResponse;
  trueUser: AppUserDTO;


  constructor(private http: HttpClient, private storageService: StorageService, private agfMessaging: AngularFireMessaging) {
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
        tap((appUser) => this.loadUserData(appUser)),
        map(user => {
          this.storageService.saveUserInStorage(user);
          this.currentUserSubject.next(user);
          return user;
        }),
        tap(user => {
          this.agfMessaging.requestPermission
            .pipe(mergeMapTo(this.agfMessaging.tokenChanges))
            .subscribe(
              (token) => {
                  this.http.post<{fireToken: string}>(`${environment.apiUrl}/app-user/${user.email}/fire-token`, {fireToken: token}).subscribe();
              },
              (error) => { console.error(error); },
            );
        })
      );
  }

  loadUserData(appUserRequest: AppUserDTO) {
    this.http.get<AppUserDTO>(environment.apiUrl + '/app-user/' + appUserRequest.id).subscribe(appUser => this.trueUser = appUser);
  }

  getUserData(): Observable<AppUserDTO> {
    return this.currentUserSubject.pipe(
      switchMap(appUser => {
        return this.http.get<AppUserDTO>(environment.apiUrl + '/app-user/' + appUser.id);
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.storageService.removeUserFromStorage();
  }

  updateUser(id: number, appUserPost: AppUserPostDto): Observable<void> {
    return this.http.patch<void>(environment.apiUrl + '/app-user/' + id, appUserPost);
  }

  getUserStats(id: number) {
    return this.http.get<AppUserStatsDTO>(environment.apiUrl + '/app-user/' + id + '/stats');
  }

  resemblePassword(email: string) {
    return this.http.get<void>(environment.apiUrl + '/app-user/' + email + '/resemble');
  }

  updatePassword(email: string, jwt: string, user: AppUserPostDto) {
    return this.http.patch(environment.apiUrl + '/app-user/' + email + '/update-password/' + jwt, user);
  }
}
