import { Component, OnInit } from '@angular/core';
import {faGasPump} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.scss']
})
export class LoginAppComponent implements OnInit {

  gasPump = faGasPump;

  constructor() { }

  ngOnInit(): void {
  }

}
