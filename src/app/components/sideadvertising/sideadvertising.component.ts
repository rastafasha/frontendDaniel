import { Component, OnInit } from '@angular/core';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';

@Component({
  selector: 'app-sideadvertising',
  templateUrl: './sideadvertising.component.html',
  styleUrls: ['./sideadvertising.component.css']
})
export class SideadvertisingComponent implements OnInit {

  public sideadvices: Sideadvice;
  error: any;

  constructor(
    private sideadviceService: SideadviceService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.sideadviceService.getBannerActivos().subscribe(
      res =>{
        this.sideadvices = res;
        error => this.error = error
        console.log(this.sideadvices);
      }
    );
  }

}
