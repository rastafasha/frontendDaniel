import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-button',
  standalone: false,
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
  @Input() title: string;

  constructor(
    private location: Location
  ){}

  goBack() {
    this.location.back();
  }
}
