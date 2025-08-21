import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../EnumFolder/role';
import { environment } from './environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
   ngOnInit() {
    console.log("Production mode:", environment.production);
    console.log("API URL:", environment.apiUrl);
  }
  constructor(private http: HttpClient) {}
  private baseUrl=environment.apiUrl;
  
  login(email: string, password: string, role: string): Observable<any> {
    let endpoint = '';
    if (role===Role.admin) {
        console.log("API URL:", this.baseUrl);  // 👈 Add this

      endpoint = `${this.baseUrl}/admin`;
    } else if (role===Role.staff) {
      endpoint = `${this.baseUrl}/Staffs`;
    } else if ( role===Role.student) {
      endpoint = `${this.baseUrl}/Students`;
    }
    return this.http
      .get<any[]>(endpoint)
      .pipe(
        map((u) =>
          u.find(
            (user) =>
              user.email === email &&
              user.password === password &&
              user.role === role
          )
        )
      );
  }
}
