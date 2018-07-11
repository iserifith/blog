import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { IPost } from '../../../interfaces/posts';

interface Category {
  name: string;
}

interface Select {
  label: string;
  value: string | null;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  post: IPost = {
    category: null,
    isPublished: true,
    title: null,
    body: null,
  };
  title: string;
  body: string;
  categories: Select[];
  selectedCategory: Category;

  constructor(private _blogService: BlogService) {
    this.categories = [
      { label: 'Select Category', value: null },
      { label: 'JavaScript', value: 'JavaScript' },
      { label: 'Linux', value: 'Linux' },
      { label: 'SSH', value: 'SSH' },
      { label: 'Others', value: 'Others' },
    ];
  }

  ngOnInit() {}

  submit() {
    this.post.title = this.title;
    this.post.body = this.body;
    this.post.isPublished = true;

    if (this.selectedCategory != undefined) {
      this.post.category = this.selectedCategory.name;
    } else {
      this.post.category = 'Uncategorized';
    }

    this._blogService.createNewPost(this.post).subscribe((post: IPost) => {
      this._blogService.newBlogPost(post);
    });
  }
}
