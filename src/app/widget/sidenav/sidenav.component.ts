import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuItems: MenuItem[] = [
    {title: 'Szukaj stacji', iconName: 'search', href: ['/main']},
    {title: 'Ustawienia', iconName: 'settings', href: ['/settings']},
    {title: 'Wylogój się', iconName: 'exit_to_app', href: ['/logout']},
  ];

  constructor(private router: Router) { }

  onMenuItemClick(path: string[], procedure: () => void ) {
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
