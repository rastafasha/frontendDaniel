import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  user:User;
  userExiste:User;
  profile:Profile;
  blogs: Post;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserExistente();
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.activatedRoute.params.subscribe( ({id}) => this.listarBlogsUser(id));
    
  }

  getUserExistente(): void {

    this.userExiste = JSON.parse(localStorage.getItem('user'));
    if(!this.userExiste || !this.userExiste.role || this.userExiste.role === null){
      console.log('no hay role')
    }
      
  }


  listar(id:string){
    if(!id == null || !id == undefined || id){
      this.profileService.listarUsuario(id).subscribe(
        response =>{
          this.profile = response[0];
          // console.log('profileServer',this.profile);
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }


  listarBlogsUser(id:string){
    if(!id == null || !id == undefined || id){
      this.postService.getByUser(id).subscribe(
        response =>{
          this.blogs = response[0];
          // console.log('profileServer',this.profile);
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }
}
