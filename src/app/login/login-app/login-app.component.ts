import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.scss']
})
export class LoginAppComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
