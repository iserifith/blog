import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../../interfaces/posts';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private post: IPost;
  private options: MenuItem[];

  constructor(
    private _route: ActivatedRoute,
    private _blogService: BlogService,
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this._route.queryParams.subscribe(params => {
      this._blogService.getPostByTitle(params[0]).subscribe((post: IPost) => {
        this.post = post[0];
      });
    });
  }

  deletePost() {
    this._blogService.deletePost(this.post._id);
  }

  updatePost() {
    console.log('updatedddd');
  }
}
