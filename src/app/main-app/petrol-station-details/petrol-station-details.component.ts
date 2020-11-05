import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PetrolStationService} from "../../service/petrol-station.service";
import {switchMap, tap} from "rxjs/operators";
import {FuelTypeDto, PetrolStationDto} from "../../../api-models/api-models";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {FuelTypeService} from "../../service/fuel-type.service";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'app-petrol-station-details',
  templateUrl: './petrol-station-details.component.html',
  styleUrls: ['./petrol-station-details.component.scss']
})
export class PetrolStationDetailsComponent implements OnInit, AfterViewInit {

  station: PetrolStationDto;

  @ViewChild('gmap')
  map: ElementRef;
  gmap: google.maps.Map;

  initSub: Subscription;

  hoveredGradeId: number = 0;

  clickedGradeId: number = 0;

  isClicked: boolean = false;

  fuelTypesApprovedFromServer: FuelTypeDto[];

  fuelTypesCheckboxes: { fuelType: string, checkboxValue: boolean }[] = [];

  fuelTypeCopy = [];

  constructor(private activatedRoute: ActivatedRoute,
              private petrolStationService: PetrolStationService,
              private fuelTypeService: FuelTypeService) {
  }

  ngOnInit(): void {
    this.initSub = this.activatedRoute.paramMap.pipe(
      switchMap(param => this.petrolStationService.getPetrolStationById(Number(param.get('id')))),
      tap(() => {
        setTimeout(() => {
          this.gmap = this.initMap();
          this.makeUserMarker(Number(this.station.localization.lat), Number(this.station.localization.long));
        }, 0);
      })
    ).subscribe(
      petrolStation => {
        this.station = petrolStation;
        this.fuelTypesCheckboxes = petrolStation.fuelTypes.map(fuelType => {
          return {fuelType, checkboxValue: true};
        });
        console.log(this.station);
      }
    );
    this.fuelTypeService.getFuelTypes().subscribe(fuelTypes => {
      const mappedFuelTypes = fuelTypes.map(fuelType => {
        return {fuelType, checkboxValue: false};
      });
      this.fuelTypesCheckboxes = this.fuelTypesCheckboxes.concat(mappedFuelTypes);
      this.fuelTypeCopy = JSON.parse(JSON.stringify(this.fuelTypesCheckboxes));
    });
  }

  ngAfterViewInit(): void {
  }

  initMap(): google.maps.Map {
    const mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(Number(this.station.localization.lat), Number(this.station.localization.long)),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(this.map.nativeElement, mapProp);
  }

  makeUserMarker(lat: number, long: number) {
    return new google.maps.Marker({
      position: {lng: long, lat},
      map: this.gmap,
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: environment.userMarkerUrl
    });
  }

  remove(fuelType: string) {

  }

  mouseLeave(i: number) {
    if (!this.isClicked) {
      this.hoveredGradeId = 0;
    }
  }

  mouseEnter(i: number) {
    if (!this.isClicked) {
      this.hoveredGradeId = i;
    }
  }

  onGradeClick(i: number) {
    if (!this.isClicked) {
      this.clickedGradeId = i;
      this.isClicked = true;
    }
  }

  approveFuelTypeChanges() {
    let flag = false;
    this.fuelTypeCopy.forEach((val, inex) => {
      if (this.fuelTypesCheckboxes[inex].checkboxValue !== val.checkboxValue) {
        flag = true;
      }
    });
    if (flag) {
      const postDTO = {
        dkn: this.station.dkn,
        fuelTypes: this.fuelTypesCheckboxes.filter(fuelType => fuelType.checkboxValue).map(fuelType => fuelType.fuelType),
        localization: {
          name: this.station.localization.name,
          street: this.station.localization.street,
          number: this.station.localization.number,
          postalCode: this.station.localization.postalCode,
          province: this.station.localization.province,
        },
        name: this.station.name,
        isWC: this.station.petrolStationStats.isWC,
        isWCFree: this.station.petrolStationStats.isWCFree,
        isRestaurant: this.station.petrolStationStats.isRestaurant,
        isCompressor: this.station.petrolStationStats.isCompressor,
        isCarWash: this.station.petrolStationStats.isCarWash,
      };
      this.petrolStationService.updatePetrolStation(this.station.id, postDTO).subscribe(() => {
        this.initSub = this.activatedRoute.paramMap.pipe(
          switchMap(param => this.petrolStationService.getPetrolStationById(Number(param.get('id')))),
          tap(() => {
            setTimeout(() => {
              this.gmap = this.initMap();
              this.makeUserMarker(Number(this.station.localization.lat), Number(this.station.localization.long));
            }, 0);
          })
        ).subscribe(
          petrolStation => {
            this.station = petrolStation;
            this.fuelTypesCheckboxes = petrolStation.fuelTypes.map(fuelType => {
              return {fuelType, checkboxValue: true};
            });
            console.log(this.station);
          }
        );
        this.fuelTypeService.getFuelTypes().subscribe(fuelTypes => {
          const mappedFuelTypes = fuelTypes.map(fuelType => {
            return {fuelType, checkboxValue: false};
          });
          this.fuelTypesCheckboxes = this.fuelTypesCheckboxes.concat(mappedFuelTypes);
          this.fuelTypeCopy = JSON.parse(JSON.stringify(this.fuelTypesCheckboxes));
        });
      });
    }
  }
}
