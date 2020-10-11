import {LastFuelPriceDTO, PetrolStationDto} from '../../../../api-models/api-models';
import {PetrolStationMarker} from "./petrol-station-marker";

export class PetrolStationInfoWidget {
  name: string;
  address: string;
  prices: LastFuelPriceDTO[];

  constructor(prop: PetrolStationDto) {
    this.name = prop.name;
    this.address = prop.localization.name + ', ' + prop.localization.street + ' ' + prop.localization.number;
    this.prices = prop.fuelPriceDTO;
  }
  public static instanceOfWindowInfoFromPetrolStation(petrolStation: PetrolStationDto) {
    return new PetrolStationInfoWidget(petrolStation).instanceOfWindowInfo();
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
       </div>
    `;
  }
}

export function markerWindowPair(petrolStation: PetrolStationDto, map: google.maps.Map): MarkerWindowInfoPair {
  return {
    id: petrolStation.id,
    marker: PetrolStationMarker.instanceOfMarkerFromPetrolStationDTO(petrolStation, map),
    windowInfo: PetrolStationInfoWidget.instanceOfWindowInfoFromPetrolStation(petrolStation),
  };
}

export declare type MarkerWindowInfoPair = {
  id: number;
  marker: google.maps.Marker;
  windowInfo: google.maps.InfoWindow;
};
