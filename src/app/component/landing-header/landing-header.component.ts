import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule,LoginComponent],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent {
  currentRoute: string = '';
  constructor(private router: Router) {}
  ngOnInit(){
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects.split('/')[1];
    });
  }
}