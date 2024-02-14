import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LandingHeaderComponent } from './component/landing-header/landing-header.component';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent,LandingHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DELIVEReat';
  currentRoute: string = '';
  storedUser:any;
    // isWelcomePage:boolean | undefined;
  // publisherService =inject(PublisherService);

  constructor(private router: Router,private route: ActivatedRoute) {
    this.storedUser =localStorage.getItem('User');
    console.log("ayto pou thelo");
    console.log(this.storedUser);
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
      console.log(this.currentRoute);
      if(this.currentRoute == 'faqs' || this.currentRoute == 'about' || this.currentRoute == 'support' || this.currentRoute == 'terms-of-use' || this.currentRoute == 'discovery'){
        // this.currentRoute == '**'
        this.storedUser =localStorage.getItem('User');
        console.log(this.storedUser);
        }
    });
    
  }
  
}
