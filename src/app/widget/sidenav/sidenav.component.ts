import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {POINTS_PREVILIGES} from "../../../api-models/points-previliges";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userPreviliges = POINTS_PREVILIGES;

  userPoints: number;

  menuItems: MenuItem[] = [
    {title: 'Szukaj stacji', iconName: 'search', href: ['/main', 'petrol-list'], isDisabled: false},
    {title: 'Statystyki', iconName: 'signal_cellular_alt', href: ['/statistics'], isDisabled: false},
    {title: 'Dodaj stacje', iconName: 'plus_one', href: ['/main', 'create'], isDisabled: true},
    {title: 'Wyloguj się', iconName: 'exit_to_app', href: ['/auth'], procedure: () => this.authService.logout(), isDisabled: false},
  ];

  constructor(private router: Router, private authService: AuthService) { }

  onMenuItemClick(path: string[], procedure: () => void = noop) {
    procedure();
    this.router.navigate(path);
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe(appUser => {
      this.userPoints = appUser.amountOfPoints;
      this.menuItems = [
        {title: 'Szukaj stacji', iconName: 'search', href: ['/main', 'petrol-list'], isDisabled: false},
        {title: 'Statystyki', iconName: 'signal_cellular_alt', href: ['/statistics'], isDisabled: false},
        {title: 'Dodaj stacje', iconName: 'plus_one', href: ['/main', 'create'], isDisabled: this.userPoints < this.userPreviliges.master},
        {title: 'Wyloguj się', iconName: 'exit_to_app', href: ['/auth'], procedure: () => this.authService.logout(), isDisabled: false},
      ];
    });
  }
}

interface MenuItem {
  title: string;
  iconName: string;
  href: string[];
  procedure?: () => void;
  isDisabled: boolean;
}
