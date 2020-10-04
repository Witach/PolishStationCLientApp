import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {DualToggleEventService} from "../dual-presentator-toggle/dual-toggle-event-service";
import {Subscription} from "rxjs";

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

  eventSub: Subscription;

  constructor(private dualToggleEvnetService: DualToggleEventService) {
  }

  ngOnInit(): void {
    this.eventSub = this.dualToggleEvnetService.toggleEvent$.subscribe(
      (stateName) => this.onTogglePresenterState(stateName)
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
