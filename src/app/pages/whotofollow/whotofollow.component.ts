import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-whotofollow',
  templateUrl: './whotofollow.component.html',
  styleUrls: ['./whotofollow.component.css']
})
export class WhotofollowComponent implements OnInit {

  editores: User;
  profiles: Profile;
  error: string;
  
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getEditors();
  }

  getEditors(): void {
    this.userService.getAllEditors().subscribe(
      res =>{
        this.editores = res;
        error => this.error = error
        console.log(this.editores);
      }
    );
  }

}
