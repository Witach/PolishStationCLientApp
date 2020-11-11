import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DualToggleEventService} from "../dual-presentator-toggle/dual-toggle-event-service";
import {Subscription} from "rxjs";
import {PetrolStationService} from "../../service/petrol-station.service";
import {PetrolStationDto} from "../../../api-models/api-models";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BreakpointState} from "@angular/cdk/layout/breakpoints-observer";
import {StoreService} from "../../service/store.service";

@Component({
  selector: 'app-dual-presentator',
  templateUrl: './dual-presentator.component.html',
  styleUrls: ['./dual-presentator.component.scss']
})
export class DualPresentatorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('#list-item')
  listItem: ElementRef;

  @ViewChild('#map-item')
  mapItem: ElementRef;

  duelPresenterStyle = {
    marginLeft: '0'
  };

  items: PetrolStationDto[];

  eventSub: Subscription;

  focusedItemId: number;
  isBigScreened: boolean;

  isLoading = true;

  constructor(private dualToggleEvnetService: DualToggleEventService,
              private petrolStationService: PetrolStationService,
              private breakpointObserver: BreakpointObserver,
              private storeService: StoreService) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.XSmall]).subscribe(
      res => this.onResolutionChange(res)
    );
  }

  ngOnInit(): void {
    this.eventSub = this.dualToggleEvnetService.toggleEvent$.subscribe(
      (stateName) => this.onTogglePresenterState(stateName)
    );
    navigator.geolocation.getCurrentPosition( position => {
      this.storeService.userPosition = position;
      this.petrolStationService.getPetrolStations({lat: position.coords.latitude, long: position.coords.longitude, maxDistance: 10}).subscribe(
        (stations) => {
          this.items = stations;
          this.isLoading = false;
        }
      );
    });
  }

  onFilterButtonClick(event: any): void {
    this.isLoading = true;
    const position = this.storeService.userPosition;
    const params = {lat: position.coords.latitude, long: position.coords.longitude, ...event};
    this.petrolStationService.getPetrolStations(params).subscribe(
      (stations) => {
        this.isLoading = false;
        this.items = stations;
      }
    );
  }

  onListItemClick(listItem: PetrolStationDto) {
    this.focusedItemId = listItem.id;
    this.switchToMapWithResolution();
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.switchToList(), 0);
  }

  onTogglePresenterState(stateName: string) {
    if (stateName === 'list' && !this.isBigScreened) {
      this.duelPresenterStyle.marginLeft = '0';
    } else if (stateName === 'map' && !this.isBigScreened) {
      this.duelPresenterStyle.marginLeft = '-100%';
    }
  }

  private onResolutionChange(res: BreakpointState) {
    this.isBigScreened = !res.breakpoints[Breakpoints.XSmall];
    this.switchToList();
  }

  switchToMapWithResolution() {
    if (!this.isBigScreened) {
      this.switchToMap();
    }
  }

  switchToListWithResolution() {
    if (!this.isBigScreened) {
      this.switchToList();
    }
  }

  switchToMap() {
    document.getElementById('mat-button-toggle-2-button')?.click();
  }

  switchToList() {
    document.getElementById('mat-button-toggle-1-button')?.click();
  }
}
