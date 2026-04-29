import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SplashscreenService } from 'src/app/services/splashscreen.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private splashService:SplashscreenService
  ) { 
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Subscribe to reactive user from service
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.user = currentUser;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.splashService.stop();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh(): void {
    window.location.reload();
  }
}
