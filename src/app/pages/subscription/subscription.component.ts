import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';
import { Plan } from 'src/app/models/plan';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  plan: Plan;
  planes: Plan;
  error:string;

  constructor(
    private messageService: MessageService,
    private planesService: PlanesService,
  ) { }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0, 0);
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

}
