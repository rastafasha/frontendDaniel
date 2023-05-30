import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cintamiembro',
  templateUrl: './cintamiembro.component.html',
  styleUrls: ['./cintamiembro.component.css']
})
export class CintamiembroComponent implements OnInit {
  public user: User;
  error: string;
  id: number;
  roleid:number;
  public identity: User;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.user = userService.user;
  }
  ngOnInit(): void {
    this.getUser();
    this.getUserServer();
  }

  // ngDoCheck(): void {
  //   this.identity = this.userService.usuario;
  // }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }


  getUserServer(){
    this.userService.getUserById(this.user.id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error
        console.log(this.user);
      }
    );
  }

  gotoCursos(){
    this.router.navigateByUrl('/subcripciones');
  }

}
