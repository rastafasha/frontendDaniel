import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: Category;
  postrecientes: Post;
  editors: User;
  error: string;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
    this.getEditors();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getRecentPosts().subscribe(
      res =>{
        this.postrecientes = res;
        error => this.error = error
        // console.log(this.recentposts);
      }
    );
  }

  getCategories(): void {
    // return this.planesService.carga_info();
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categories = res;
        error => this.error = error
        // console.log(this.categories);
      }
    );
  }

  getEditors(): void {
    // return this.planesService.carga_info();
    this.userService.getAllEditors('EDITOR').subscribe(
      res =>{
        this.editors = res;
        error => this.error = error
        // console.log(this.editors);
      }
    );
  }

}
