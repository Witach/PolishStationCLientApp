import {Component, Input, OnInit} from '@angular/core';
import {FuelTypeDto, LastFuelPriceDTO, PetrolStationDto} from "../../../api-models/api-models";

@Component({
  selector: 'app-fuel-prices',
  templateUrl: './fuel-prices.component.html',
  styleUrls: ['./fuel-prices.component.scss']
})
export class FuelPricesComponent implements OnInit {

  _items: LastFuelPriceDTO[];
  _types: string[];

  @Input()
  set items(petrolStation: PetrolStationDto) {
     this._items = petrolStation.fuelPriceDTO;
     const namesOfPricesType = petrolStation.fuelPriceDTO.map(price => price.fuelType);
     this._types = petrolStation.fuelTypes
       .filter(type => !namesOfPricesType.includes(type));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
