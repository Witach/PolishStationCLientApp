import { Component, OnInit } from '@angular/core';
import {DualToggleEventService} from '../../main-app/dual-presentator-toggle/dual-toggle-event-service';

@Component({
  selector: 'app-login-toggle-presenter-button',
  templateUrl: './login-toggle-presenter-button.component.html',
  styleUrls: ['./login-toggle-presenter-button.component.scss']
})
export class LoginTogglePresenterButtonComponent implements OnInit {

  constructor(private dualToggleService: DualToggleEventService) { }

  ngOnInit(): void {
  }

  onButtonToggle(name: string) {
    this.dualToggleService.toggleEvent.next(name);
  }
}
