import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private http=inject(HttpClient);
  private endpointUrl="assets/sample-data/users.json";
  constructor(private http: HttpClient){}
  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.endpointUrl);
  }
  authenticate(email: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map(users => users.find((u: { email: string; password: string; }) => u.email === email && u.password === password))
    );
  }
}