import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FuelTypeService} from '../../service/fuel-type.service';
import {MatRadioChange} from '@angular/material/radio';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-advanced-filter-component',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ marginLeft: '-100vw' }),
        animate('300ms', style({ marginLeft: 0 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ marginLeft: '-100vw' }))
      ])
    ]),
  ]
})
export class AdvancedFilterComponent implements OnInit {
  toggleValue = false;
  fuelTypes: string[];
  selectedFuelType = 'all';
  selectedAvgOpinion = 1;
  selectedDistance = 10;
  selectedSorting = 'distance';

  petrolStationInfo = {
    isWCFree: false,
    isWC: false,
    isRestaurant: false,
    isCompressor: false,
    isCarWash: false,
    isHotDogs: false,
    isSelfService: false,
  };

  @Output('filterClicked')
  eventEmitter = new EventEmitter<any>();

  constructor(private fuelTypeService: FuelTypeService) {
  }

  ngOnInit(): void {
    this.fuelTypeService.getFuelTypes().subscribe(res => this.fuelTypes = res);
  }

  onRadioButtonChange(event: MatRadioChange) {
    this.selectedFuelType = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onSubmit() {
    const paramsObj = {};
    if (this.selectedFuelType !== 'all')
      paramsObj['fuelType'] = this.selectedFuelType;
    if (this.selectedAvgOpinion !== 1)
      paramsObj['avgOpinion'] = this.selectedAvgOpinion;
    if (this.selectedDistance)
      paramsObj['maxDistance'] = this.selectedDistance;
    if (this.selectedSorting)
      paramsObj['sort'] = this.selectedSorting;
    if(this.checkIfFacilityIsProvided()) {
      paramsObj['facilities'] = this.getFacilityString();
    }
    this.eventEmitter.emit(paramsObj);
  }

  switchToggle() {
    this.toggleValue = !this.toggleValue;
  }

  private checkIfFacilityIsProvided() {
    return  Object.keys(this.petrolStationInfo).filter(key => this.petrolStationInfo[key]).length > 0;
  }

  private getFacilityString() {
    return Object.keys(this.petrolStationInfo).filter(key => this.petrolStationInfo[key]).join(',');
  }
}
