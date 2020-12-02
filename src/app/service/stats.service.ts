import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FuelPriceStats, FuelStats, StatsDTO} from '../../api-models/api-models';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getRankOfPetrolStation(): Observable<StatsDTO> {
    return this.http.get<StatsDTO>(`${environment.apiUrl}/statistics/rank`);
  }

  getPetrolStationStats(dateFrom: string, dateTom: string, petrolStationId: number): Observable<FuelStats> {
    const params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTom', dateTom)
      .set('petrolStationId', '' + petrolStationId);
    return this.http.get<FuelStats>(`${environment.apiUrl}/statistics/petrol-station`, {params});
  }
}
