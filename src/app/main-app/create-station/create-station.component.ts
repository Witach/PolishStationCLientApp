import {Component, OnInit} from '@angular/core';
import {PetrolStationService} from '../../service/petrol-station.service';
import {FuelTypeService} from '../../service/fuel-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OpinionService} from '../../service/opinion.service';
import {StoreService} from '../../service/store.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SnackBarService} from '../../widget/snack-bar.service';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';
import {PetrolStationDto, PetrolStationPostDto} from '../../../api-models/api-models';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.scss']
})
export class CreateStationComponent implements OnInit {

  userPosition: Position;

  newStation: FormGroup;

  isLoading = false;

  fuelTypesCheckboxes: { fuelType: string, checkboxValue: boolean }[] = [];
  petrolStationInfo = {
    isWCFree: false,
    isWC: false,
    isRestaurant: false,
    isCompressor: false,
    isCarWash: false,
    isHotDogs: false,
    isSelfService: false,
  };

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
    this.isLoading = true;
    navigator.geolocation.getCurrentPosition(position => {
      this.userPosition = position;
    });
    this.fuelTypeService.getFuelTypes().subscribe(this.createFuelTypeCheckboxContext);
    const {town, street, streetNumber, name, dkn, postalCode, province} = fieldsDefs;
    this.newStation = this.formsBuilder.group({town, street, streetNumber,  name, dkn, postalCode, province});
  }

  prepareFuelTypeCheckboxes = petrolStation => {
    this.fuelTypeService.getFuelTypes().subscribe(this.createFuelTypeCheckboxContext);
  }

  createFuelTypeCheckboxContext = fuelTypes => {
    this.fuelTypesCheckboxes = fuelTypes.map(fuelType => {
      return {fuelType, checkboxValue: false};
    });
    this.isLoading = false;
  }

  onSubmit() {
    this.isLoading = true;
    if (this.newStation.valid) {
      this.petrolStationService.createPetrolStation(this.createPetrolStationDTO())
        .subscribe(dto => {
          this.router.navigate(['/main', 'petrol-item', dto.id]);
          this.isLoading = false;
        }, error => {
          this.snackBar.openSnackBar(error.message);
          this.isLoading = false;
        });
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
      isHotDogs: this.petrolStationInfo.isHotDogs,
      isSelfService: this.petrolStationInfo.isSelfService
    };
  }
}

