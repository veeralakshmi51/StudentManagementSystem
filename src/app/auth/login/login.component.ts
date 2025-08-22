import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/EnumFolder/role';
import { AuthService } from 'src/app/ServiceFolder/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(
    private router: Router,
    private http: AuthService,
    private toast: ToastrService
  ) {}
  role = Object.values(Role);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
    role: new FormControl('', [Validators.required]),
  });
 loginUser() {
  if (this.loginForm.invalid) {
    this.toast.error('Please fill all required fields');
    return;
  }

  const { email, password, role } = this.loginForm.value as {
    email: string;
    password: string;
    role: string;
  };

  this.http.login(email, password, role).subscribe({
    next: (user) => {
      if (user) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('email', email);
        localStorage.setItem('Username', user.name);
        localStorage.setItem('userId', user.id);

        this.toast.success(`${role} logged in successfully`);

        switch (role) {
          case Role.admin:
            this.router.navigate(['/adminDashboard']);
            break;
          case Role.staff:
            this.router.navigate(['/staffDashboard']);
            break;
          case Role.student:
            this.router.navigate(['/studentDashbioard',user.id]);
            break;
        }
      } else {
        this.errorMessage = 'Invalid email, password, or role';
        this.toast.error(this.errorMessage);
      }
    },
    error: (err) => {
      console.error('Login API error:', err);
      this.toast.error('Something went wrong. Please try again.');
    },
  });
}

}
