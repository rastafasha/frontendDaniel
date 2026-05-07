import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  public user: User;
  
  constructor() { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }


}
