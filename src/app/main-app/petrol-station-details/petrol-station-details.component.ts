import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PetrolStationService} from '../../service/petrol-station.service';
import {switchMap, tap} from 'rxjs/operators';
import {FuelTypeDto, PetrolStationDto, PetrolStationPostDto} from '../../../api-models/api-models';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {FuelTypeService} from '../../service/fuel-type.service';
import {OpinionService} from '../../service/opinion.service';
import {StoreService} from '../../service/store.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-petrol-station-details',
  templateUrl: './petrol-station-details.component.html',
  styleUrls: ['./petrol-station-details.component.scss']
})
export class PetrolStationDetailsComponent implements OnInit, AfterViewInit {

  station: PetrolStationDto;

  @ViewChild('gmap', {static: false})
  map: ElementRef;
  gmap: google.maps.Map;

  initSub: Subscription;

  hoveredGradeId = 0;

  clickedGradeId = 0;

  isClicked = false;

  fuelTypesApprovedFromServer: FuelTypeDto[];

  fuelTypesCheckboxes: { fuelType: string, checkboxValue: boolean }[] = [];

  fuelTypeCopy = [];

  constructor(private activatedRoute: ActivatedRoute,
              private petrolStationService: PetrolStationService,
              private fuelTypeService: FuelTypeService,
              private opinionService: OpinionService,
              private storeService: StoreService,
              private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initComponent();
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
      this.setMark(i);
      const user = this.authService.currentUserSubject.getValue();
      this.opinionService.sendOpinion({
        mark: this.clickedGradeId,
        petrolStationId: this.station.id,
        userId: user.id
      }).subscribe();
    }
  }

  approveFuelTypeChanges() {
    if (this.checkForFuelTypeChanges()) {
      const postDTO = this.generatePostDTOFromLocalChanged();
      this.petrolStationService.updatePetrolStation(this.station.id, postDTO)
        .subscribe(() => this.initComponent());
    }
  }

  checkForFuelTypeChanges() {
    let flag = false;
    this.fuelTypeCopy.forEach((val, inex) => {
      if (this.fuelTypesCheckboxes[inex].checkboxValue !== val.checkboxValue) {
        flag = true;
      }
    });
    return flag;
  }

  generatePostDTOFromLocalChanged(): PetrolStationPostDto {
    return {
      dkn: this.station.dkn,
      fuelTypes: this.fuelTypesCheckboxes.filter(fuelType => fuelType.checkboxValue).map(fuelType => fuelType.fuelType),
      localization: {...this.station.localization},
      name: this.station.name,
      isWC: this.station.petrolStationStats.isWC,
      isWCFree: this.station.petrolStationStats.isWCFree,
      isRestaurant: this.station.petrolStationStats.isRestaurant,
      isCompressor: this.station.petrolStationStats.isCompressor,
      isCarWash: this.station.petrolStationStats.isCarWash,
    };
  }

  initComponent(): void {
    this.initSub = this.activatedRoute.paramMap.pipe(
      switchMap(param => this.petrolStationService.getPetrolStationById(Number(param.get('id')))),
      tap(this.initMapFun),
      tap(this.getFuelStationInfo),
      tap(this.prepareFuelTypeCheckboxes),
      tap(this.prepareOpinion)
    ).subscribe();
  }

  initMapFun = () =>
    setTimeout(() => {
      this.gmap = this.initMap();
      this.makeUserMarker(Number(this.station.localization.lat), Number(this.station.localization.long));
    }, 0)

  getFuelStationInfo = petrolStation => this.station = petrolStation;

  prepareFuelTypeCheckboxes = petrolStation => {
    this.fuelTypeService.getFuelTypes().subscribe(this.createFuelTypeCheckboxContext);
  }

  createFuelTypeCheckboxContext = fuelTypes => {
    this.fuelTypesCheckboxes = fuelTypes.map(fuelType => {
      return {fuelType, checkboxValue: this.station.fuelTypes.includes(fuelType)};
    });
    this.fuelTypeCopy = JSON.parse(JSON.stringify(this.fuelTypesCheckboxes));
  }

  opinionPrepareClosure(user: any): any {
    return opinions => {
      const isOpinionOwnedByUser = opinion => opinion.userId === user.id && opinion.petrolStationId === this.station.id;
      const usersOpinions = opinions.filter(isOpinionOwnedByUser);
      if (usersOpinions.length > 0) {
        this.setMark(usersOpinions[0].mark);
      }
    };
  }

  setMark(mark: number): void {
    this.isClicked = true;
    this.clickedGradeId = mark;
  }

  prepareOpinion = petrolStation => {
    const user = this.authService.currentUserSubject.getValue();
    this.opinionService.geUsersOpinions(user.email)
      .subscribe(this.opinionPrepareClosure(user));
  }
}
