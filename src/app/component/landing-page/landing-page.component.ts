import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  animations: [
    (trigger('moveHeading', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ])),
    (trigger('moveButton', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('750ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ])),
    (trigger('moveImage', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('850ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]))
  ]
})

export class LandingPageComponent implements OnInit {
  animateHeading = false;
  animateButton = false;
  animateImage = false;
  // isWelcomePage=true;
  // publisherService =inject(PublisherService);
  private destroy$ = new Subject<void>();
  orderTexts: string[] = ['Pizza', 'Burger', 'Asian', 'Donut', 'Coffee', 'Fast Food'];
  currentIndex = 0;
  orderText: string = this.orderTexts[0];
  triggerAnimation() {
    this.animateHeading = true;
    this.animateButton = true;
    this.animateImage = true;
  }
  constructor(private router: Router, private titleService: Title) {
    titleService.setTitle("Welcome");
    // this.isWelcomePage=true;
    //   this.publisherService.publishData(this.isWelcomePage);
    //   console.log(this.isWelcomePage);
    //   this.router.events.subscribe((event) => console.log(event));
    //   this.router.events.subscribe(event=>{
    //     if(event instanceof NavigationEnd){
    //       if (event.url.includes('welcome')||event.url.includes('')){
    //         this.isWelcomePage=true;
    //         // this.publisherService.publishData({from: "landing-page", value: this.isWelcomePage});
    //         this.publisherService.publishData(this.isWelcomePage);
    //       }else{
    //         this.isWelcomePage=false;
    //         // this.publisherService.publishData({from: "landing-page", value: this.isWelcomePage});
    //         this.publisherService.publishData(this.isWelcomePage);
    //       }
    //     }
    //   });
  }
  ngOnInit() {
    this.triggerAnimation();
    this.startUpdatingText();
    // console.log(isWelcomePage);
    // this.router.events.subscribe((event) => console.log(event));
    // this.router.events.pipe(
    //   filter((event: any) => event instanceof NavigationEnd)
    // ).subscribe((event) => {
    //   this.isWelcomePage=false;
    //   // console.log(isWelcomePage);
    //   this.publisherService.publishData(this.isWelcomePage);
    // });
    // if (event instanceof NavigationEnd) {
    //   this.isWelcomePage=false;
    //   // console.log(isWelcomePage);
    //   this.publisherService.publishData(this.isWelcomePage);
    // }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private startUpdatingText() {
    interval(700)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.orderText = this.orderTexts[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.orderTexts.length;
      });
  }
}