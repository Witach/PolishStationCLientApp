import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DualToggleEventService} from "./dual-toggle-event-service";

@Component({
  selector: 'app-dual-presentator-toggle',
  templateUrl: './dual-presentator-toggle.component.html',
  styleUrls: ['./dual-presentator-toggle.component.scss']
})
export class DualPresentatorToggleComponent implements OnInit {

  constructor(private dualToggleService: DualToggleEventService) {
  }

  ngOnInit(): void {
  }

  onButtonToggle(name: string) {
    this.dualToggleService.toggleEvent.next(name);
  }

}
