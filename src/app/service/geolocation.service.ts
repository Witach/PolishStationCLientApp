import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  position = new BehaviorSubject<GeoPosition>({lat: 0, long: 0});
  position$ = this.position.asObservable();

  constructor() {
    this.getLocation();
  }

  getLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positionRes) => {
        const geoPosition = {
          lat: positionRes.coords.longitude,
          long: positionRes.coords.longitude
        };
        this.position.next(geoPosition);
      });
    }
  }
}

export interface GeoPosition {
  lat: number;
  long: number;
}
