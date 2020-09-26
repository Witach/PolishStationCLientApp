import { Component, OnInit } from '@angular/core';
import {PetrolStationDto} from "../../../api-models/api-models";
import {petrolStations} from "../../../stub/petrols-stations";

@Component({
  selector: 'app-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss']
})
export class StationItemComponent implements OnInit {

  item: PetrolStationDto;

  constructor() { }

  ngOnInit(): void {
    this.item = petrolStations[0];
  }

}
