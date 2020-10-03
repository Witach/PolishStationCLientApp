import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PetrolStationDto} from '../../api-models/api-models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetrolStationService {

  constructor(private http: HttpClient) { }

  getPetrolStations(): Observable<PetrolStationDto[]> {
    return this.http.get<PetrolStationDto[]>(`${environment.apiUrl}/petrol-station`);
  }

}
