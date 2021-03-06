/// <reference types="@types/googlemaps" />
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';
import {MarkerWindowInfoPair, markerWindowPair} from "./petrol-station-info-widget/petrol-station-info-widget";
import {BehaviorSubject, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {StoreService} from "../../service/store.service";

@Component({
  selector: 'app-map-list-presentator',
  templateUrl: './map-list-presentator.component.html',
  styleUrls: ['./map-list-presentator.component.scss']
})
export class MapListPresentatorComponent implements OnInit, AfterViewInit {

  petrolStationsProp: PetrolStationDto[] = [];
  isInitialized = new BehaviorSubject<boolean>(false);

  @Input()
  isLoading = false;

  @ViewChild('gmap')
  map: ElementRef;
  gmap: google.maps.Map;

  markerPairs: MarkerWindowInfoPair[] = [];
  petrolStationsSub: Subscription;


  constructor(private storeService: StoreService) {
  }

  @Input()
  set focusedPair(petrolStationId: number | undefined) {
    if (!petrolStationId || !this.markerPairs) {
      return;
    }
    const result = this.markerPairs.filter(markerPair => markerPair.id === petrolStationId);
    if (result?.length > 0) {
      const pairToFocusOn = result[0];
      this.attachFocus(pairToFocusOn);
    }
  }

  focusedPairProp: MarkerWindowInfoPair;


  @Input('items')
  set petrolStations(petrolStationsAndFuel: {petrolStations: PetrolStationDto[], fuelType?: string }) {
    this.petrolStationsProp = petrolStationsAndFuel.petrolStations;
    this.petrolStationsSub = this.isInitialized.subscribe(isInitial => {
      if (isInitial) {
        this.markerPairs?.forEach( marker => marker.marker.setMap(null));
        this.markerPairs = this.petrolStationsProp?.map(
          petrolStation => {
            if (petrolStationsAndFuel.fuelType) {
              return markerWindowPair(petrolStation, this.gmap,
                petrolStation.fuelPriceDTO.find(fuelPrice => fuelPrice.fuelType === petrolStationsAndFuel.fuelType));
            }
            return markerWindowPair(petrolStation, this.gmap);
          }
        );
        this.markerPairs?.forEach(pair => pair.marker.addListener('click', () => this.toggleBounce(pair)));
        this.petrolStationsSub.unsubscribe();
      }
    });
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.isLoading = true;
    console.log(this.petrolStationsProp);
    navigator.geolocation.getCurrentPosition( position => {
      this.gmap = this.googleMapInstance(position.coords.latitude, position.coords.longitude);
      this.storeService.userPosition = position;
      this.makeUserMarker(position.coords.latitude, position.coords.longitude);
      this.isLoading = false;
      this.isInitialized.next(true);
    });
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
    if (this.checkIfPairFocused(pair)) {
      this.removeFocus(pair);
    } else {
      this.attachFocus(pair);
    }
  }

  checkIfPairFocused(pair: MarkerWindowInfoPair) {
    return pair === this.focusedPairProp;
  }

  attachFocus(pair: MarkerWindowInfoPair) {
    pair.marker.setAnimation(google.maps.Animation.BOUNCE);
    pair.windowInfo.open(this.gmap, pair.marker);
    this.removeFocus(this.focusedPairProp);
    this.focusedPairProp = pair;
  }

  removeFocus(pair: MarkerWindowInfoPair) {
    pair?.marker?.setAnimation(null);
    pair?.windowInfo?.close();
    this.focusedPairProp = null;
  }

  makeUserMarker(lat: number, long: number) {
    return new google.maps.Marker({
      position: {lng: long, lat},
      map: this.gmap,
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: environment.userMarkerUrl
    });
  }
}
