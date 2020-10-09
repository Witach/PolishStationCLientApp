import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DualToggleEventService} from "../dual-presentator-toggle/dual-toggle-event-service";
import {Subscription} from "rxjs";
import {PetrolStationService} from "../../service/petrol-station.service";
import {PetrolStationDto} from "../../../api-models/api-models";
import {petrolStations} from "../../../stub/petrols-stations";

@Component({
  selector: 'app-dual-presentator',
  templateUrl: './dual-presentator.component.html',
  styleUrls: ['./dual-presentator.component.scss']
})
export class DualPresentatorComponent implements OnInit, OnDestroy {
  @ViewChild('#list-item')
  listItem: ElementRef;

  @ViewChild('#map-item')
  mapItem: ElementRef;

  duelPresenterStyle = {
    marginLeft: '0'
  };

  items: PetrolStationDto[];

  eventSub: Subscription;

  constructor(private dualToggleEvnetService: DualToggleEventService, private petrolStationService: PetrolStationService) {
  }

  ngOnInit(): void {
    this.eventSub = this.dualToggleEvnetService.toggleEvent$.subscribe(
      (stateName) => this.onTogglePresenterState(stateName)
    );
    this.petrolStationService.getPetrolStations().subscribe(
      (stations) => this.items = stations.content
    );
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }


  onTogglePresenterState(stateName: string) {
    if (stateName === 'list') {
      this.duelPresenterStyle.marginLeft = '0';
    } else if (stateName === 'map') {
      this.duelPresenterStyle.marginLeft = '-100%';
    }
  }

}
