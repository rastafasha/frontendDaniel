import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-cintamiembro',
    templateUrl: './cintamiembro.component.html',
    styleUrls: ['./cintamiembro.component.css'],
    standalone: false
})
export class CintamiembroComponent implements OnInit {
  public user: User;
  public userServer: User;
  error: string;
  uid: string;
  roleid:number;
  public identity: User;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.user = userService.usuario;
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    this.getUserServer()
  }

  // ngDoCheck(): void {
  //   this.identity = this.userService.usuario;
  // }

 


  getUserServer(){
    this.userService.getUserById(this.user.uid).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
        console.log(this.userServer);
      }
    );
  }

  gotoSubscripcion(){
    this.router.navigateByUrl('/plan-subcripcion');
  }
  irAlLogin(){
    this.router.navigateByUrl('/login');
  }

}
