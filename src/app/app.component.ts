import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LandingHeaderComponent } from './component/landing-header/landing-header.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { PublisherService } from './service/publisher.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent,LandingHeaderComponent,LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DELIVEReat';
  // isWelcomePage:boolean | undefined;
  currentRoute: string = '';
  
  // publisherService =inject(PublisherService);

  constructor(private router: Router,private route: ActivatedRoute) {
    // this.publisherService.listenForData()
    // .subscribe((data)=>{
    //   // if(data.from==="landing-page"||data.from==="sign-up-page"){
    //   // if(data.from==="landing-page"){
    //   this.isWelcomePage=data;
    //   console.log(this.isWelcomePage);
    // })
  }
  ngOnInit() {
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects.split('/')[1];
    });
  }
}
