import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


// import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
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
    ])),(trigger('moveImage', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('900ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]))
  ]
})

export class LandingPageComponent {
  animateHeading = false;
  animateButton = false;
  animateImage = false;


 
  // constructor(private renderer: Renderer2) {
  //   this.renderer.setStyle(document.body, 'background', 'url("https://templatekit.jegtheme.com/deliverra/wp-content/uploads/sites/61/2021/03/deliv-297x300.png")');
  //   this.renderer.setStyle(document.body, 'background-size', 'cover');
  //   this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  //   this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
  // }
  ngOnInit(){
    this. triggerAnimation();
  }

  triggerAnimation() {
    this.animateHeading = true;
    this.animateButton = true;
    this.animateImage = true;
  }

}
