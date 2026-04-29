import { Component, inject, OnInit } from '@angular/core';
import { ConectividadService } from './services/conectividad.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent{
  title = 'frontendDaniel';
  private connectivity = inject(ConectividadService);
  showSplash:boolean;
}
