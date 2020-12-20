import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {LovedPetrolStationDTO, PetrolStationDto} from '../../api-models/api-models';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  postLike(petrolStation: number, user: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/app-user/${user}/loved-stations`, {petrolStationId: petrolStation} as LovedPetrolStationDTO);
  }

  postNotLike(petrolStation: number, user: string): Observable<void>  {
    return this.http.delete<void>(`${environment.apiUrl}/app-user/${user}/loved-stations/${petrolStation}`);
  }

  getLikedPetrolStations(user: string): Observable<PetrolStationDto[]> {
    return this.http.get<PetrolStationDto[]>(`${environment.apiUrl}/app-user/${user}/loved-stations`);
  }
}
