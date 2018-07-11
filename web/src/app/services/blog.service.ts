import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPost } from '../interfaces/posts';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { MenuItem } from 'primeng/api';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  posts_api = 'http://localhost:4300/api/posts';
  post_api = 'http://localhost:4300/api/posts/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private posts: IPost[] = [];
  private menu_items: MenuItem[] = [
    {
      label: 'New Post',
      icon: 'fa fa-fw fa-pen-fancy',
      routerLink: ['create-post'],
    },
  ];

  public behavior_posts = new BehaviorSubject<IPost[]>(this.posts);
  public behavior_menu_items = new BehaviorSubject<MenuItem[]>(this.menu_items);

  constructor(private _http: HttpClient, private _router: Router) {
    this.initializeBlog();
  }

  getPostByTitle(title: string): Observable<IPost> {
    return this._http.get<IPost>(this.post_api + title);
  }

  createNewPost(post: IPost) {
    return this._http.post<IPost>(this.post_api, post);
  }

  deletePost(id: string) {
    this._http
      .delete(this.post_api + id, this.httpOptions)
      .subscribe((post: IPost) => {
        for (let i = 0; i < this.menu_items.length; i++) {
          if (this.menu_items[i].label == post.title) {
            this.menu_items.splice(i, 1);
          }
        }
      });
  }

  initializeBlog() {
    this._http.get(this.post_api).subscribe((posts: object) => {
      _.forOwn(posts, (value: IPost) => {
        this.posts.push(value);
      });
      this.posts.forEach((post: IPost) => {
        this.menu_items.push({
          label: post.title,
          routerLink: ['post'],
          queryParams: [post.title],
          routerLinkActiveOptions: { exact: true },
        });
      });
    });
  }

  newBlogPost(post) {
    this.posts.push(post);
    this.menu_items.push({
      label: post.title,
      routerLink: ['post'],
      queryParams: [post.title],
      routerLinkActiveOptions: { exact: true },
    });

    let navExtras: NavigationExtras = {
      queryParams: { '0': post.title },
    };
    this._router.navigate(['/blog/post'], navExtras);
    return false;
  }
}
