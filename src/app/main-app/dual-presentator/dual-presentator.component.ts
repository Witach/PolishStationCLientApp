import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DualToggleEventService} from "../dual-presentator-toggle/dual-toggle-event-service";
import {Subscription} from "rxjs";
import {PetrolStationService} from "../../service/petrol-station.service";
import {PetrolStationDto} from "../../../api-models/api-models";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BreakpointState} from "@angular/cdk/layout/breakpoints-observer";
import {StoreService} from "../../service/store.service";
import {Router} from "@angular/router";

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

  items: {petrolStations: PetrolStationDto[], fuelType?: string };

  eventSub: Subscription;

  focusedItemId: number;
  isBigScreened: boolean;

  isLoading = true;

  isOnLoginPage: boolean = false;

  constructor(private dualToggleEvnetService: DualToggleEventService,
              private petrolStationService: PetrolStationService,
              private breakpointObserver: BreakpointObserver,
              private storeService: StoreService,
              private router: Router) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.XSmall, Breakpoints.Large]).subscribe(
      res => this.onResolutionChange(res)
    );
  }

  ngOnInit(): void {
     this.isOnLoginPage = this.router.url.includes('auth');
    this.eventSub = this.dualToggleEvnetService.toggleEvent$.subscribe(
      (stateName) => this.onTogglePresenterState(stateName)
    );
    navigator.geolocation.getCurrentPosition( position => {
      this.storeService.userPosition = position;
      this.petrolStationService.getPetrolStations({lat: position.coords.latitude, long: position.coords.longitude, maxDistance: 10}).subscribe(
        (stations) => {
          this.items = {
            petrolStations: stations,
          };
          this.isLoading = false;
        }
      );
    }, (err) => {alert(err.message);});
  }

  onFilterButtonClick(event: any): void {
    this.isLoading = true;
    const position = this.storeService.userPosition;
    const params = {lat: position.coords.latitude, long: position.coords.longitude, ...event};
    this.petrolStationService.getPetrolStations(params).subscribe(
      (stations) => {
        this.isLoading = false;
        this.items = {
          petrolStations: stations,
          fuelType: event.fuelType
        };
      }
    );
  }

  onListItemClick(listItem: PetrolStationDto) {
    debugger
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
    debugger
    if (stateName === 'list' && !this.isBigScreened) {
      this.duelPresenterStyle.marginLeft = '0';
    } else if (stateName === 'map' && !this.isBigScreened) {
      this.duelPresenterStyle.marginLeft = '-100%';
    }
  }

  private onResolutionChange(res: BreakpointState) {
    this.isBigScreened = !res.breakpoints[Breakpoints.XSmall] && !res.breakpoints[Breakpoints.Medium] && !res.breakpoints[Breakpoints.Small];
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
    document.getElementById('toggle-button-map')?.click();
  }

  switchToList() {
    document.getElementById('toggle-button-list')?.click();
  }
}
