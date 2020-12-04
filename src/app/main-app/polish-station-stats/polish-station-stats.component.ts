import { Component, OnInit } from '@angular/core';
import {StatsService} from '../../service/stats.service';
import {DetailsStatsDTO, FuelPriceStats, FuelStats} from '../../../api-models/api-models';

@Component({
  selector: 'app-polish-station-stats',
  templateUrl: './polish-station-stats.component.html',
  styleUrls: ['./polish-station-stats.component.scss']
})
export class PolishStationStatsComponent implements OnInit {

  multi: any[];
  maxValues: DetailsStatsDTO = {};
  scale = window.innerWidth > 1300 ? 1.4 : 1.05;
  view: any[] = [window.innerWidth / this.scale, 400];


  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Price (zł)';
  timeline: boolean = true;

  isLoading = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    const today = new Date();
    const todayString = this.convertToParamString(today);
    const pastMonth = new Date();
    pastMonth.setDate(today.getDate() - 200);
    const pastMonthString = this.convertToParamString(pastMonth);

    this.statsService.getPetrolStationStats(pastMonthString, todayString, 1).subscribe(stats => {
      this.multi = this.convertToSeriesObject(stats.fuelPriceStats);
      this.maxValues = stats.detailsStatsMap;
      this.isLoading = false;
    });
  }

  convertToParamString(date: Date): string {
    const monthText = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth();
    const dayText = date.getDay() < 10 ? ('0' + (date.getDay() + 1)) : date.getDay();
    return `${date.getFullYear()}-${monthText}-${dayText}`;
  }

  convertToSeriesObject(stats: FuelStats): any{
    return  Object.keys(stats).map(key => {
      return {
        name: key,
        series: stats[key].map(fuelPrice => this.convertFuelStatsItemToSeriesItem(fuelPrice))
      };
    });
  }

  convertFuelStatsItemToSeriesItem(fuel: FuelPriceStats): any{
    return {
          name: new Date(fuel.date),
          value: fuel.price
        };
    }

  dateTickFormatting = (val: any) => {
    if (val instanceof Date) {
      return this.convertToParamString(val);
    }
  }
  onResize(event) {
    this.scale = window.innerWidth > 1300 ? 1.4 : 1.05;
    this.view = [event.target.innerWidth / this.scale, 400];
  }

  getFuelTypeKeys() {
    return Object.keys(this.maxValues);
  }
}

