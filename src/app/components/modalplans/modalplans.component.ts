import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';

@Component({
  selector: 'app-modalplans',
  templateUrl: './modalplans.component.html',
  styleUrls: ['./modalplans.component.css']
})
export class ModalplansComponent implements OnInit {
  planPaypals: planPaypalSubcription;
  planPaypal: planPaypalSubcription;
  error: string;
  
  constructor(
    private paypalSubcription: PaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getPlanes();
    // this.getPlan();
    // this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
  }

  

  getPlanes(): void {
    this.paypalSubcription.getPlanPaypals().subscribe(
      res =>{
        this.planPaypals = res.plans;
        error => this.error = error
        
        
      }
    );
  }

  getPlan(id): void {
    this.paypalSubcription.getPlanPaypal(this.planPaypal.id).subscribe(
      res =>{
        this.planPaypal = res;
        error => this.error = error;
        console.log(this.planPaypal);
      }
    );
  }

}
