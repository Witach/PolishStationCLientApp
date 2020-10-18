import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page, PetrolStationDto} from '../../api-models/api-models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetrolStationService {

  constructor(private http: HttpClient) { }

  getPetrolStations(params: any = {}): Observable<PetrolStationDto[]> {
    const httpParams = Object.keys(params)
      .reduce((prev: any, current: any, index: any) => prev.set(current, params[current]), new HttpParams());
    return this.http.get<PetrolStationDto[]>(`${environment.apiUrl}/petrol-station`, {params: httpParams});
  }

}
