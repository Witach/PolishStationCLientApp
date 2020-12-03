import { Component, OnInit } from '@angular/core';
import {StatsService} from '../../service/stats.service';
import {PetrolStationDto, StatsDTO} from '../../../api-models/api-models';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  ranks: StatsDTO = {
    day: '',
    opinionRank: [],
    fuelTypePriceRank: {},
  };
  isLoading = true;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getRankOfPetrolStation().subscribe(value => {
      this.ranks = value;
      this.isLoading = false;
    });
  }

  getKeysOfFuelType() {
    return  Object.keys(this.ranks.fuelTypePriceRank);
  }

  getRanksOfFuelType(fuelTypeName: string) {
    return  this.ranks.fuelTypePriceRank[fuelTypeName];
  }

  getFuelPriceOfName(fuelTypeName: string, index: number) {
    const fuelPrices = this.ranks.fuelTypePriceRank[fuelTypeName][index].fuelPriceDTO;
    return  fuelPrices.find(value => value.fuelType === fuelTypeName)?.price || '-';
  }
}
