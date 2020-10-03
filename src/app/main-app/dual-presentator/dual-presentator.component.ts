import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-dual-presentator',
  templateUrl: './dual-presentator.component.html',
  styleUrls: ['./dual-presentator.component.scss']
})
export class DualPresentatorComponent implements OnInit {

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor() { }

  ngOnInit(): void {
  }

  onTogglePresenterState(stateName: string) {
    if (stateName === 'list') {
      this.drawer.toggle(true);
    } else if (stateName === 'map') {
      this.drawer.toggle(false);
    }
  }

}
