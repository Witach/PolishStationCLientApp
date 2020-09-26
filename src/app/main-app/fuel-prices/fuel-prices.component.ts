import {Component, Input, OnInit} from '@angular/core';
import {LastFuelPriceDTO} from "../../../api-models/api-models";

@Component({
  selector: 'app-fuel-prices',
  templateUrl: './fuel-prices.component.html',
  styleUrls: ['./fuel-prices.component.scss']
})
export class FuelPricesComponent implements OnInit {

  @Input()
  items: LastFuelPriceDTO[];

  constructor() { }

  ngOnInit(): void {
  }

}
