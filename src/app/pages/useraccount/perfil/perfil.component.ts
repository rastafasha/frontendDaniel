import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { PostService } from 'src/app/services/post.service';
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
  blogs:Post;
  userPagos!: Payment;
  uid:User;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private pagoService: PaymentService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.listarBlogsUser(id));
  }
  
  getUserServer(id:string){
    if (id !== null && id !== undefined) {
      this.userService.getUserById(id).subscribe(
        res =>{
          this.user = res[0];
          // console.log(this.user);
        }
        );
      }
      
      
      this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getProfile(id));

  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.getUserPagos();
  }

  getUserPagos(){

    this.pagoService.getPagosbyUser(this.user.uid).subscribe((data: any) => {
      this.userPagos = data;
      // console.log('userPagos',this.userPagos)
    });
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
          this.blogs = response;
          // console.log('blogsUser',this.blogs);
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }

}
