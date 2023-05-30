import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  user:User;
  profile:Profile;
  post: Post;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getUser(id));
  }

  getUser(id:number){
    if (id !== null && id !== undefined) {
      this.userService.getUserById(+id).subscribe(
        res => {
          this.user = res;
          console.log(this.user);
        }
      );
    }
    // this.activatedRoute.params.subscribe( ({id}) => this.getProfile(id));

  }

  getProfile(id:number){
    if (id !== null && id !== undefined) {
      this.profileService.getProfile(+id).subscribe(
        res => {
          this.profile = res;
          console.log(this.profile);
        }
      );
    }


  }

}
