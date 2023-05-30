import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whotofollow',
  templateUrl: './whotofollow.component.html',
  styleUrls: ['./whotofollow.component.css']
})
export class WhotofollowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
