import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {noop} from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuItems: MenuItem[] = [
    {title: 'Szukaj stacji', iconName: 'search', href: ['/main', 'petrol-list']},
    {title: 'Statystyki', iconName: 'signal_cellular_alt', href: ['/statistics']},
    {title: 'Dodaj stacje', iconName: 'plus_one', href: ['/main', 'create']},
    {title: 'Wyloguj się', iconName: 'exit_to_app', href: ['/auth'], procedure: () => this.authService.logout()},
  ];

  constructor(private router: Router, private authService: AuthService) { }

  onMenuItemClick(path: string[], procedure: () => void = noop) {
    procedure();
    this.router.navigate(path);
  }


  ngOnInit(): void {
  }
}

interface MenuItem {
  title: string;
  iconName: string;
  href: string[];
  procedure?: () => void;
}
