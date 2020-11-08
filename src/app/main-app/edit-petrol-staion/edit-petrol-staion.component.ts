import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PetrolStationService} from "../../service/petrol-station.service";
import {FuelTypeService} from "../../service/fuel-type.service";
import {OpinionService} from "../../service/opinion.service";
import {StoreService} from "../../service/store.service";
import {SnackBarService} from "../../widget/snack-bar.service";
import {fieldsDefs} from "../../fields-definitions/fields-definitions";
import {PetrolStationDto, PetrolStationPostDto} from "../../../api-models/api-models";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-edit-petrol-staion',
  templateUrl: './edit-petrol-staion.component.html',
  styleUrls: ['./edit-petrol-staion.component.scss']
})
export class EditPetrolStaionComponent implements OnInit {

  newStation: FormGroup;
  fuelTypeCopy = [];

  fuelTypesCheckboxes: { fuelType: string, checkboxValue: boolean }[] = [];
  petrolStationInfo = {
    isWCFree: false,
    isWC: false,
    isRestaurant: false,
    isCompressor: false,
    isCarWash: false,
    isHotDogs: false,
  };
  private station: PetrolStationDto;

  constructor(private activatedRoute: ActivatedRoute,
              private petrolStationService: PetrolStationService,
              private fuelTypeService: FuelTypeService,
              private opinionService: OpinionService,
              private storeService: StoreService,
              private formsBuilder: FormBuilder,
              private router: Router,
              private snackBar: SnackBarService) {
  }

  ngOnInit(): void {
    const {town, street, streetNumber, name, dkn, postalCode, province} = fieldsDefs;
    this.newStation = this.formsBuilder.group({town, street, streetNumber,  name, dkn, postalCode, province});
    this.activatedRoute.paramMap.pipe(
      map(param => Number(param.get('id'))),
      switchMap(this.getFuelStation),
      tap(this.prepareFuelTypeCheckboxes),
      tap(this.prepareFacilities),
      tap(this.updateFormControl)
      ).subscribe();

  }

  updateFormControl = station => {
    this.newStation.controls.town.setValue(station.localization.name);
    this.newStation.controls.street.setValue(station.localization.street);
    this.newStation.controls.streetNumber.setValue(station.localization.number);
    this.newStation.controls.name.setValue(station.name);
    this.newStation.controls.dkn.setValue(station.dkn);
    this.newStation.controls.postalCode.setValue(station.localization.postalCode);
    this.newStation.controls.province.setValue(station.localization.province);
  }

  prepareFacilities = station => {
    this.petrolStationInfo = {
      isWCFree: station.petrolStationStats.isWCFree,
      isWC: station.petrolStationStats.isWC,
      isRestaurant: station.petrolStationStats.isRestaurant,
      isCompressor: station.petrolStationStats.isCompressor,
      isCarWash: station.petrolStationStats.isCarWash,
      isHotDogs: station.petrolStationStats.isHotDogs,
    };
  }

  private getFuelStation =  id => this.petrolStationService.getPetrolStationById(id);
  prepareFuelTypeCheckboxes = petrolStation => {
    this.station = petrolStation;
    this.fuelTypeService.getFuelTypes().subscribe(this.createFuelTypeCheckboxContext);
  }

  createFuelTypeCheckboxContext = fuelTypes => {
    this.fuelTypesCheckboxes = fuelTypes.map(fuelType => {
      return {fuelType, checkboxValue: this.station.fuelTypes.includes(fuelType)};
    });
    this.fuelTypeCopy = JSON.parse(JSON.stringify(this.fuelTypesCheckboxes));
  }

  onSubmit() {
    if (this.newStation.valid) {
      this.petrolStationService.updatePetrolStation(this.station.id, this.createPetrolStationDTO())
        .subscribe(_ => this.snackBar.openSnackBar('Success :)'));
    }

  }

  createPetrolStationDTO(): PetrolStationPostDto {
    return {
      dkn: this.newStation.controls.dkn.value,
      fuelTypes: this.fuelTypesCheckboxes.filter(fuelType => fuelType.checkboxValue).map(fuelType => fuelType.fuelType),
      localization: {
        name: this.newStation.controls.town.value,
        number: this.newStation.controls.streetNumber.value,
        postalCode: this.newStation.controls.postalCode.value,
        province: this.newStation.controls.province.value,
        street: this.newStation.controls.street.value,
      },
      name: this.newStation.controls.name.value,
      isWC: this.petrolStationInfo.isWC,
      isWCFree: this.petrolStationInfo.isWCFree,
      isRestaurant: this.petrolStationInfo.isRestaurant,
      isCompressor: this.petrolStationInfo.isCompressor,
      isCarWash: this.petrolStationInfo.isCarWash,
      isHotDogs: this.petrolStationInfo.isHotDogs
    };
  }
}
