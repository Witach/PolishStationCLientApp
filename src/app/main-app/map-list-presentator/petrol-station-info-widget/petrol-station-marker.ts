import {PetrolStationDto} from '../../../../api-models/api-models';
import {environment} from "../../../../environments/environment";

export class PetrolStationMarker {
  long: number;
  lat: number;

  constructor(petrolStation: PetrolStationDto) {
    this.long = Number(petrolStation.localization.long);
    this.lat = Number(petrolStation.localization.lat);
  }

  public static instanceOfMarkerFromPetrolStationDTO(petrolStation: PetrolStationDto, map: google.maps.Map): google.maps.Marker {
    return new PetrolStationMarker(petrolStation).getMarker(map);
  }

  public getMarker(map: google.maps.Map): google.maps.Marker {
    return new google.maps.Marker({
      position: {lng: this.long, lat: this.lat},
      map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: environment.markerUrl
    });
  }
}
