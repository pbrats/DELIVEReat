import { Component, inject } from '@angular/core';
import { PublisherService } from '../../service/publisher.service';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  publisherService =inject(PublisherService);
  isFaqsPage=true;

  constructor(private titleService: Title,private router: Router) {
    titleService.setTitle("FAQs");
    this.isFaqsPage=true;
    this.publisherService.publishData(this.isFaqsPage);
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        if (event.url.includes('faqs')){
          this.isFaqsPage=true;
          this.publisherService.publishData(this.isFaqsPage);
        }else{
          this.isFaqsPage=false;
          this.publisherService.publishData(this.isFaqsPage);
        }
      }
    });
  }
}
