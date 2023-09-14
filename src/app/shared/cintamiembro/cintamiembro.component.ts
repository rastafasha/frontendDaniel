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
    this.getUser();
    // this.getUserServer();
  }

  // ngDoCheck(): void {
  //   this.identity = this.userService.usuario;
  // }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    // console.log(this.user);
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
  }


  // getUserServer(id){
  //   this.userService.getUserById(this.user.uid).subscribe(
  //     res =>{
  //       this.user = res[0];
  //       error => this.error = error
  //       console.log(this.userServer);
  //     }
  //   );
  // }

  gotoCursos(){
    this.router.navigateByUrl('/subcripciones');
  }
  irAlLogin(){
    this.router.navigateByUrl('/login');
  }

}
