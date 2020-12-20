import {Component, OnInit} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';
import {LikeService} from '../../service/like.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-loved-list',
  templateUrl: './loved-list.component.html',
  styleUrls: ['./loved-list.component.scss']
})
export class LovedListComponent implements OnInit {
  isLoading = true;

  petrolStations: PetrolStationDto[] = [];

  constructor(private lovedService: LikeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(user => {
      this.lovedService.getLikedPetrolStations(user.email).subscribe(
        _ => {
          this.isLoading = false;
          debugger;
          this.petrolStations = _;
        }
      );
    });
  }

}
