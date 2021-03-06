import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FuelPricePostDto, Page, PetrolStationDto, PetrolStationPostDto, ResMessage} from '../../api-models/api-models';
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

  getPetrolStationById(id: number): Observable<PetrolStationDto> {
    return this.http.get<PetrolStationDto>(`${environment.apiUrl}/petrol-station/` + id );
  }

  updatePetrolStation(id: number, obj: PetrolStationPostDto): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/petrol-station/` + id , obj);
  }

  createPetrolStation(obj: PetrolStationPostDto): Observable<PetrolStationDto> {
    return this.http.post<PetrolStationDto>(`${environment.apiUrl}/petrol-station`, obj);
  }

  addFuelPrice(fuelPricePostDTO: FuelPricePostDto): Observable<ResMessage> {
    return this.http.post<ResMessage>(`${environment.apiUrl}/fuel-price`, fuelPricePostDTO);
  }



}
