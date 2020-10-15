import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';

@Component({
  selector: 'app-station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss']
})
export class StationItemComponent implements OnInit {

  @Input()
  item: PetrolStationDto;

  @Output()
  showOnMap = new EventEmitter<PetrolStationDto>();

  constructor() { }

  ngOnInit(): void {
  }

}
