import { Component, OnInit } from '@angular/core';
import { Role } from '../EnumFolder/role';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private toast: ToastrService) {}
  role: string | null = null;
  ngOnInit() {
    this.role = localStorage.getItem('userRole');
  }
  logout() {
    if (confirm('Are you sure do you want to logout')) {
      localStorage.removeItem('userRole');
      this.toast.warning('Logged out successfully');
      this.router.navigate(['/login']);
    }
  }
}
