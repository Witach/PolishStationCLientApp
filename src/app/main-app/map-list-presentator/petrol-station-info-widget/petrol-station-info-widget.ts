import {LastFuelPriceDTO, PetrolStationDto} from '../../../../api-models/api-models';
import {PetrolStationMarker} from "./petrol-station-marker";
import {map} from "rxjs/operators";

export class PetrolStationInfoWidget {
  name: string;
  address: string;
  prices: LastFuelPriceDTO[];
  long: number;
  lat: number;

  constructor(prop: PetrolStationDto, private gmap: google.maps.Map) {
    this.name = prop.name;
    this.address = prop.localization.name + ', ' + prop.localization.street + ' ' + prop.localization.number;
    this.prices = prop.fuelPriceDTO;
    this.lat = Number(prop.localization.lat);
    this.long = Number(prop.localization.long);
  }
  public static instanceOfWindowInfoFromPetrolStation(petrolStation: PetrolStationDto, gmap: google.maps.Map) {
    return new PetrolStationInfoWidget(petrolStation, gmap).instanceOfWindowInfo();
  }

  public instanceOfWindowInfo(): google.maps.InfoWindow {
    return new google.maps.InfoWindow({
      content: this.getWindowContent(),
    });
  }

  private getWindowContent() {
    return `
      <div class="map-window-info">
        <span class="map-station-name">${this.name}</span>
        <span class="map-station-address">${this.address}</span>
        <a target="_blank" href="https://www.google.com/maps/dir/?api=1&origin=${this.gmap.getCenter().lat()},${this.gmap.getCenter().lng()}&destination=${this.lat},${this.long}&travelmode=driving&dir_action=navigate" class="navigate-button">Navigate</a>
       </div>
    `;
  }
}

export function markerWindowPair(petrolStation: PetrolStationDto, gmap: google.maps.Map): MarkerWindowInfoPair {
  return {
    id: petrolStation.id,
    marker: PetrolStationMarker.instanceOfMarkerFromPetrolStationDTO(petrolStation, gmap),
    windowInfo: PetrolStationInfoWidget.instanceOfWindowInfoFromPetrolStation(petrolStation, gmap),
  };
}

export declare type MarkerWindowInfoPair = {
  id: number;
  marker: google.maps.Marker;
  windowInfo: google.maps.InfoWindow;
};
