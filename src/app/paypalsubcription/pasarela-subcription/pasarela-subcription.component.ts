import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {
  PayPalScriptService,
  IPayPalConfig,
  NgxPaypalComponent,
  ICreateOrderRequest,
} from "ngx-paypal";
import { environment } from 'src/environments/environment';

import { PaypalSubcriptionService } from '../../services/paypalSubcription.service';
import { planPaypalSubcription, subcriptionGenerated } from 'src/app/models/planPaypalSubcription';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsubcripcionComponent } from 'src/app/components/modalsubcripcion/modalsubcripcion.component';
import { plans } from "../../plans";
import { map } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';

declare var paypal;

@Component({
  selector: 'app-pasarela-subcription',
  templateUrl: './pasarela-subcription.component.html',
  styleUrls: ['./pasarela-subcription.component.css'],
  standalone: false
})
export class PasarelaSubcriptionComponent implements OnInit {

  @ViewChild('paypal') paypalElement: ElementRef;
  @ViewChild("advanced") advancedSubscription?: NgxPaypalComponent;
  @Input() planSeleccionado: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  private plans = [];
  public planes: planPaypalSubcription;
  public plan: planPaypalSubcription;
  public planpaypal: planPaypalSubcription;
  public planId: planPaypalSubcription;
  public configs = {};
  subcriptionG: subcriptionGenerated;
  respuesta: any;
  user: User;
  error: string;

  public SubcriptionConfig?: IPayPalConfig;

  constructor(
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private payPalScriptService: PayPalScriptService,
    private payPalService: PaypalSubcriptionService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['planSeleccionado'] && changes['planSeleccionado'].currentValue) {
      // 1. "Apagamos" el botón inmediatamente para limpiar el DOM
      this.planpaypal = null;

      // 2. Ejecutamos la lógica de carga
      this.getPlan();
    }
  }

  getPlan(): void {
    const idPlan = this.planSeleccionado?.id;
    if (!idPlan) return;

    this.payPalService.getPlanPaypal(idPlan).subscribe({
      next: (res) => {
        // 3. Preparamos la configuración ANTES de mostrar el botón
        // Usamos el ID que viene de tu backend (res.id)
        this.initConfig(res.id);

        // 4. Esperamos un "respiro" del DOM para evitar el error de Zoid
        setTimeout(() => {
          this.planpaypal = res;
        }, 200); // 200ms es más seguro para que el iFrame anterior muera
      },
      error: (err) => this.error = err
    });
  }

  calcularTotal() {
    const precio = Number(this.planpaypal?.billing_cycles[0]?.pricing_scheme?.fixed_price?.value || 0);
    const setup = Number(this.planpaypal?.payment_preferences?.setup_fee?.value || 0);
    return precio + setup;
  }

  iniciarPaypal() {
    // 1. Limpiar el contenedor del botón para evitar duplicados/errores de zoid
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }

    // 2. Limpiar scripts previos (tu lógica actual está bien, pero añade esto)
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.includes('paypal')) {
        scripts[i].remove();
      }
    }

    // 3. Registrar de nuevo
    this.payPalScriptService.registerPayPalScript({
      clientId: environment.clientSubscripcionesSandboxId,
      currency: 'USD',
      vault: 'true',
      intent: 'subscription'
    }, (payPalApi) => {
      this.renderizarBoton(payPalApi);
    });
  }

  renderizarBoton(payPalApi: any) {
    payPalApi.Buttons({
      intent: 'subscription',
      createSubscription: (data: any, actions: any) => {
        return actions.subscription.create({
          plan_id: this.planSeleccionado.id
        });
      },
      // ... resto de tu config
    }).render('#paypal-button-container');
  }

  ngOnDestroy() {
    // Elimina el script de PayPal al salir para que no choque al volver a entrar
    const script = document.querySelector('script[src*="://paypal.com"]');
    if (script) {
      script.remove();
    }
  }








  private initConfig(id: string): void {
    this.SubcriptionConfig = {
      clientId: environment.clientSubscripcionesSandboxId,
      currency: 'USD',
      vault: 'true', // Obligatorio para suscripciones
      advanced: {
        extraQueryParams: [
          { name: 'intent', value: 'subscription' } // ESTO es lo que lee el SDK al cargar
        ]
      },
      // Forzamos el tipado con 'as any' para que acepte (data, actions)
      createSubscriptionOnClient: (data: any) => ({
        plan_id: id,
        custom_id: this.user.uid // Usa el ID de tu usuario aquí
      }),
      onApprove: (data: any, actions: any) => {
        // En el momento que el botón diga "Subscribe", data.subscriptionID existirá
        console.log('ID de Suscripción:', data.subscriptionID);
        if (data.subscriptionID) {
          this.profileService.saveSubscriptionId(this.user.uid, data.subscriptionID).subscribe(() => {
            this.router.navigateByUrl('/checkout/gracias');
          });
        }
      }
      ,
      onError: err => {
        console.error('Error en el flujo de PayPal:', err);
      }
    };
  }


  paypalplanId(id: string, status: string, email_address: string, payer_id: string, value: string, subscriptionID: any, paypalplanId: any) {
    throw new Error('Method not implemented.');
  }

  onClose() {
    this.closeModal.emit();
  }


}
