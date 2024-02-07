import { Component } from '@angular/core';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.css'
})
export class PreviousOrdersComponent {
  authenticatedUser:any;
  ngOnInit(){
   // Retrieve the stored user information from local storage
   const storedUser = localStorage.getItem('authenticatedUser');
   console.log( storedUser);
   if (storedUser) {
     // Parse the stored JSON string back into a JavaScript object
     this.authenticatedUser = JSON.parse(storedUser);
     console.log(this.authenticatedUser);
     // Now, this.authenticatedUser contains the information of the authenticated user
   } else {
     // Handle the case when no user information is stored in local storage
     console.log('No user information found in local storage');
   }
  }
}
