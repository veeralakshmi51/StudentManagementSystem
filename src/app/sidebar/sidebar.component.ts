import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  role: string | null = null;
  studentId: string | null = null;
  constructor(private router: Router, private toast: ToastrService) {}
  ngOnInit() {
    this.role = localStorage.getItem('userRole');
    this.studentId = localStorage.getItem('userId');
  }
  logout() {
    if (confirm('Are you sure do you want to logout')) {
      localStorage.removeItem('userRole');
      this.toast.warning('Logged out successfully');
      this.router.navigate(['/login']);
    }
  }
}
