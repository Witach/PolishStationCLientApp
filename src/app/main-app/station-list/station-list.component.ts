import {Component, Input, OnInit} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  @Input()
  items: PetrolStationDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
