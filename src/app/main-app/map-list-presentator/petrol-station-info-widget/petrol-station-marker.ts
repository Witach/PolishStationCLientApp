import {FuelPriceDto, LastFuelPriceDTO, PetrolStationDto} from '../../../../api-models/api-models';
import {environment} from '../../../../environments/environment';

import markerwithlabel from 'markerwithlabel';

const MarkerWithLabel = markerwithlabel(google.maps);

export class PetrolStationMarker {
  long: number;
  lat: number;

  constructor(petrolStation: PetrolStationDto) {
    this.long = Number(petrolStation.localization.long);
    this.lat = Number(petrolStation.localization.lat);
  }

  public static instanceOfMarkerFromPetrolStationDTO(petrolStation: PetrolStationDto, map: google.maps.Map, fuelPrice?: LastFuelPriceDTO): any {
    return new PetrolStationMarker(petrolStation).getMarker(map, (fuelPrice?.price ? Number(fuelPrice?.price).toFixed(2) + ' zł' : undefined) || '');
  }

  public getMarker(map: google.maps.Map, labelText: string): any {
    return new MarkerWithLabel({
      position: {lng: this.long, lat: this.lat},
      map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: environment.markerUrl,
      labelContent: labelText,
      labelAnchor: new google.maps.Point(0, 60),
      labelClass: 'markers-label',
      labelStyle:  {
        display: labelText ? 'block' : 'none',
      }
    });
  }
}
