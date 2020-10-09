import {Component, Input, OnInit} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';

@Component({
  selector: 'app-map-list-presentator',
  templateUrl: './map-list-presentator.component.html',
  styleUrls: ['./map-list-presentator.component.scss']
})
export class MapListPresentatorComponent implements OnInit {

  @Input()
  items: PetrolStationDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
