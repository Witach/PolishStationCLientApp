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

  @Input()
  isOnLoginPage = false;

  @Output()
  listItemClickedEvent = new EventEmitter<PetrolStationDto>();

  @Input()
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  onListItemClick(petrolStation: PetrolStationDto) {
    debugger
    this.listItemClickedEvent.emit(petrolStation);
  }

}
