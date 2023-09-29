import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.user = this.userService.usuario
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if(this.user){
      this.refresh()
    }


  }

  refresh(): void {
    window.location.reload();
  }

}
