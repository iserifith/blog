import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  menu_items: MenuItem[] = [];

  constructor(private _blogService: BlogService) {}

  ngOnInit() {
    this._blogService.behavior_menu_items.subscribe(data => {
      this.menu_items = data;
    });
  }
}
