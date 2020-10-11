import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  @Input()
  items: PetrolStationDto[];

  @Output()
  listItemClickedEvent = new EventEmitter<PetrolStationDto>();

  constructor() { }

  ngOnInit(): void {
  }

  onListItemClick(petrolStation: PetrolStationDto) {
    this.listItemClickedEvent.emit(petrolStation);
  }

}
