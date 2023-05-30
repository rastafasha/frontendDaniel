import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user:User;
  profile:Profile;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.getUser(id));
  }

  getUser(id:number){
    if (id !== null && id !== undefined) {
      this.userService.getUserById(id).subscribe(
        res =>{
          this.user = res[0];
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
