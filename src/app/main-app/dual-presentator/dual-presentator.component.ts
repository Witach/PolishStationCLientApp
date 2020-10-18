import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DualToggleEventService} from "../dual-presentator-toggle/dual-toggle-event-service";
import {Observable, Subscription} from "rxjs";
import {PetrolStationService} from "../../service/petrol-station.service";
import {PetrolStationDto} from "../../../api-models/api-models";
import {petrolStations} from "../../../stub/petrols-stations";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BreakpointState} from "@angular/cdk/layout/breakpoints-observer";
import {HttpParams} from "@angular/common/http";

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

  constructor(private dualToggleEvnetService: DualToggleEventService,
              private petrolStationService: PetrolStationService,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.XSmall]).subscribe(
      res => this.onResolutionChange(res)
    );
  }

  ngOnInit(): void {
    this.eventSub = this.dualToggleEvnetService.toggleEvent$.subscribe(
      (stateName) => this.onTogglePresenterState(stateName)
    );
    this.petrolStationService.getPetrolStations().subscribe(
      (stations) => this.items = stations
    );
  }

  onFilterButtonClick(event: any): void {
    this.petrolStationService.getPetrolStations(event).subscribe(
      (stations) => this.items = stations
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
