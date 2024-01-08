import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LandingHeaderComponent } from './component/landing-header/landing-header.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { PublisherService } from './service/publisher.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent,LandingHeaderComponent,LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estiatoria';
  isWelcomePage:boolean | undefined;
  
  publisherService =inject(PublisherService);

  constructor(private router: Router,private route: ActivatedRoute) {
    this.publisherService.listenForData()
    .subscribe((data)=>{
      this.isWelcomePage=data;
      console.log(this.isWelcomePage);
    })

  }
  

}
