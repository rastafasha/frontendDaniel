import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { geSubcription, planPaypalSubcription, productPaypalSubcription, subcriptionGenerated } from 'src/app/models/planPaypalSubcription';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { PaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SubcriptionPaypalService } from 'src/app/services/subcriptionPaypal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allplans',
  templateUrl: './allplans.component.html',
  styleUrls: ['./allplans.component.css']
})
export class AllPlansComponent implements OnInit {

  planPaypals: planPaypalSubcription;
  planPaypal: planPaypalSubcription;
  plan: planPaypalSubcription;
  products: productPaypalSubcription;
  subcriptionG: subcriptionGenerated;
  error: string;
  public user: User;
  public profile: Profile;
  subcription:geSubcription;

  planConfig:planPaypalSubcription;

  constructor(
    private paypalSubcription: PaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private subcriptionService: SubcriptionPaypalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlanes();
    // this.getProductos();
    this.getUser();
    this.getPlan();
    
    
  }

  getPlanes(): void {
    this.paypalSubcription.getPlanPaypals().subscribe(
      res =>{
        this.planPaypals = res.plans;
        error => this.error = error
        // console.log(this.planPaypals);
      }
    );
  }

  getPlan(): void {
    this.paypalSubcription.getPlanPaypal('P-1PJ18025B84179353MTF4PKQ').subscribe(
      res =>{
        this.planPaypal = res;
        error => this.error = error;
      }
    );
  }

  getProductos(): void {
    this.paypalSubcription.getProductPaypals().subscribe(
      res =>{
        this.products = res.products;
        error => this.error = error
        // console.log(this.products);
      }
    );
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || !this.user.role || this.user.role === null){
      console.log('no hay role')
    }

    // this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.listar();
  }

  listar(){
    this.profileService.listarUsuario(this.user.uid).subscribe(
      response =>{
        this.profile = response[0];
        // console.log('profileServer',this.profile);
      }
    );
    
  }





}
