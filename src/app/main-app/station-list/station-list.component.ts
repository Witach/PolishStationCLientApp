import { Component, OnInit } from '@angular/core';
import {petrolStations} from "../../../stub/petrols-stations";
import {PetrolStationDto, PetrolStationStats} from "../../../api-models/api-models";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  list: PetrolStationDto[];

  constructor() { }

  ngOnInit(): void {
    this.list = petrolStations;
  }

}
