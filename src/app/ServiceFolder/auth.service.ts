import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../EnumFolder/role';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string, role: string): Observable<any> {
    let endpoint = '';
    if (role===Role.admin) {
      endpoint = 'http://localhost:3002/admin';
    } else if (role===Role.staff) {
      endpoint = 'http://localhost:3001/Staffs';
    } else if ( role===Role.student) {
      endpoint = 'http://localhost:3000/Students';
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
