import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  subcription: geSubcription;
  isLoading = false;
  perfil: any = {};

  articulosVistos: number = 0;
  limiteAlcanzado: boolean = false;
  planActivado = false;

  planConfig: planPaypalSubcription;
  planSeleccionado!: any | null;
  title = 'Planes de Subcripción'

  constructor(
    private paypalSubcription: PaypalSubcriptionService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanes();
    this.getUser();
  }

  getPlanes(): void {
    this.isLoading = true;
    this.paypalSubcription.getPlanPaypals().subscribe(
      res => {
        this.planPaypals = res.plans;
        error => this.error = error
        this.isLoading = false;
      }
    );
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user || !this.user.role || this.user.role === null) {
      console.log('no hay role')
    }

    this.listar();
  }

  listar() {
    this.profileService.getByUser(this.user.uid).subscribe(
      response => {
        this.profile = response;
      }
    );

  }

  openViewModal(plan: any): void {
    this.planSeleccionado = plan;
  }

  activarPlanGratis() {
    this.profileService.activarPlanGratuito().subscribe({
      next: (resp) => {
        // 1. Actualizas la vista para que el contador aparezca (3 - 0 = 3)
        this.articulosVistos = 0;
        this.limiteAlcanzado = false;
        this.planActivado = true;

        // 2. Avisas al usuario
        this.toastr.success('¡Ya tienes acceso a 3 artículos gratis este mes!');
      }
    });
  }



}
