import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: Category;
  postrecientes: Post;
  editores: User;
  profiles: Profile;
  error: string;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private profileService: ProfileService,

  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
    this.getEditors();
    // this.getProfiles();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getRecientes().subscribe(
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
    this.userService.getAllEditors().subscribe(
      res =>{
        this.editores = res;
        error => this.error = error
        // console.log(this.editores);
      }
    );
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      res =>{
        this.profiles = res;
        error => this.error = error
        // console.log(this.profiles);
      }
    );
  }
}
