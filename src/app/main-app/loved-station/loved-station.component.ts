import {Component, Input, OnInit} from '@angular/core';
import {PetrolStationDto} from '../../../api-models/api-models';
import {LikeService} from '../../service/like.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-loved-station',
  templateUrl: './loved-station.component.html',
  styleUrls: ['./loved-station.component.scss']
})
export class LovedStationComponent implements OnInit {

  @Input()
  petrolStation: PetrolStationDto;
  username: string;

  constructor(private likeService: LikeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(user => {
      this.username = user.email;
    });
  }

  startToLike() {
    this.likeService.postLike(this.petrolStation.id, this.username).subscribe(
      _ => this.petrolStation.isLovedByUser = true
    );
  }

  endLike() {
    this.likeService.postNotLike(this.petrolStation.id, this.username).subscribe(
      _ => this.petrolStation.isLovedByUser = false
    );
  }
}
