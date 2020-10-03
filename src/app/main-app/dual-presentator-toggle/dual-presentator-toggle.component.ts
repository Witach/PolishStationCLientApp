import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dual-presentator-toggle',
  templateUrl: './dual-presentator-toggle.component.html',
  styleUrls: ['./dual-presentator-toggle.component.scss']
})
export class DualPresentatorToggleComponent implements OnInit {

  @Output()
  toggleChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onButtonToggle(name: string) {
    this.toggleChange.emit(name);
  }

}
