/// <reference types="@types/googlemaps" />
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';
import {PetrolStationMarker} from "./petrol-station-info-widget/petrol-station-marker";
import {MarkerWindowInfoPair, markerWindowPair} from "./petrol-station-info-widget/petrol-station-info-widget";

@Component({
  selector: 'app-map-list-presentator',
  templateUrl: './map-list-presentator.component.html',
  styleUrls: ['./map-list-presentator.component.scss']
})
export class MapListPresentatorComponent implements OnInit, AfterViewInit {

  petrolStationsProp: PetrolStationDto[] = [];

  @ViewChild('gmap')
  map: ElementRef;
  gmap: google.maps.Map;


  @Input('items')
  set petrolStations(petrolStations: PetrolStationDto[]) {
    this.petrolStationsProp = petrolStations;
    const pairs = this.petrolStationsProp.map(
      petrolStation => markerWindowPair(petrolStation, this.gmap)
    );
    pairs.forEach( pair => pair.marker.addListener('click', () => this.toggleBounce(pair)));
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.petrolStationsProp);
    this.gmap = this.googleMapInstance(0, 0);
  }

  googleMapInstance(lat: number, long: number): google.maps.Map {
    const mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(lat, long),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(this.map.nativeElement, mapProp);
  }

  toggleBounce = (pair: MarkerWindowInfoPair) => {
    if (pair.marker.getAnimation() !== null) {
      pair.marker.setAnimation(null);
    } else {
      pair.marker.setAnimation(google.maps.Animation.BOUNCE);
      pair.windowInfo.open(this.gmap, pair.marker);
    }
  }
}
