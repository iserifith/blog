import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  menu_items: MenuItem[];
  display_sidebar: boolean;

  constructor() {}

  ngOnInit() {
    this.menu_items = [
      {
        label: 'Home',
        icon: 'home',
        routerLink: ['/'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Blog',
        icon: 'format_bold',
        routerLink: ['blog'],
      },
      {
        label: 'About',
        icon: 'face',
        routerLink: ['about'],
      },
      {
        label: 'Contact',
        icon: 'forum',
        routerLink: ['contact'],
      },
    ];
  }

  toggle() {
    this.display_sidebar = !this.display_sidebar;
  }
}
