import { AuthService } from './auth/auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  isLoading = true;
  isOnline: boolean;
  serverError: boolean;
  showWarning: boolean;

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.isLoading = true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
            this.isLoading = false;
          }
        });
    });
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.isLoading = true;
    this.isOnline = (navigator.onLine) ? true : false;
    window.addEventListener('online', (e) => this.isOnline = true);
    window.addEventListener('offline', (e) => { this.isOnline = false; this.showWarning = true; });
    // this.isLoading = false;
  }

  reload() {
    this.isLoading = true;
    this.showWarning = false;
    window.location.reload();
  }

  ngOnDestroy() {
  }
}
