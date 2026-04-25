import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
    selector: 'app-slidertop',
    templateUrl: './slidertop.component.html',
    styleUrls: ['./slidertop.component.css'],
    standalone: false
})
export class SlidertopComponent implements OnInit {
  banners: Banner;
  error:string;
  loading = false;
  light: string = 'white';
  dark: string = 'black';

  constructor(
    private bannerService: BannerService,
  ) { }

  ngOnInit(): void {
    this.getBanner();
  }

  getBanner(): void {
   this.loading = true;
    this.bannerService.getBannerActivos().subscribe(
      res =>{
        this.banners = res;
        error => this.error = error
        this.loading = false;
      }
    );
  }

}
