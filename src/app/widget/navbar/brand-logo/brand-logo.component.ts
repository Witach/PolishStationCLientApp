import { Component, OnInit } from '@angular/core';
import {faGasPump} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss']
})
export class BrandLogoComponent implements OnInit {

  gasPump = faGasPump;

  constructor() { }

  ngOnInit(): void {
  }

}
