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
    styleUrls: ['./allplans.component.css'],
    standalone: false
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
  isLoading = false;

  planConfig:planPaypalSubcription;
  planSeleccionado!: any | null;
  title = 'Planes de Subcripción'

  constructor(
    private paypalSubcription: PaypalSubcriptionService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.getPlanes();
    this.getUser();
  }

  getPlanes(): void {
    this.isLoading = true;
    this.paypalSubcription.getPlanPaypals().subscribe(
      res =>{
        this.planPaypals = res.plans;
        error => this.error = error
        this.isLoading = false;
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
        this.profile = response;
        // console.log('profileServer',this.profile);
      }
    );
    
  }

openViewModal(plan: any): void {
    this.planSeleccionado = plan;
  }



}
