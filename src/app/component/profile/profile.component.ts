import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  User: any;
  lastVisit: any;

  constructor(private titleService: Title) {
    titleService.setTitle("Profile");
  }
  ngOnInit() {
    const storedUser = localStorage.getItem('User');
    let storedVisit = localStorage.getItem('lastVisit');
    if (storedUser) {
      // Parse the stored JSON string back into an object
      this.User = JSON.parse(storedUser);
      if (storedVisit) {
        let time = JSON.parse(storedVisit);
        this.lastVisit = formatDate(time, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200');
      }
      // console.log(this.User);
      // Now, this.User contains the information of the authenticated user
    } else {
      // Handle the case when no user information is stored in local storage
      console.log('No user information found in local storage');
    }
  }
  SignOut() {
    sessionStorage.clear();
    localStorage.clear();
  }
}

