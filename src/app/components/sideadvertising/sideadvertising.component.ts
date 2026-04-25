import { Component, OnInit } from '@angular/core';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';

@Component({
    selector: 'app-sideadvertising',
    templateUrl: './sideadvertising.component.html',
    styleUrls: ['./sideadvertising.component.css'],
    standalone: false
})
export class SideadvertisingComponent implements OnInit {

  public sideadvices: Sideadvice;
  error: any;
  loading=false;

  constructor(
    private sideadviceService: SideadviceService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.loading=true;
    this.sideadviceService.getBannerActivos().subscribe(
      res =>{
        this.sideadvices = res;
        error => this.error = error;
        this.loading=false;
      }
    );
  }

}
