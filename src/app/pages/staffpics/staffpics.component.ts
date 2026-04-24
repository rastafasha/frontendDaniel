import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-staffpics',
    templateUrl: './staffpics.component.html',
    styleUrls: ['./staffpics.component.css'],
    standalone: false
})
export class StaffpicsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
