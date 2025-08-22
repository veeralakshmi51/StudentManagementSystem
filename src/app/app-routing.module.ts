import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './auth/login/login.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { StudentmarkComponent } from './studentmark/studentmark.component';
import { authguardGuard } from './authguard.guard';
import { Role } from './EnumFolder/role';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'access-denied', component:AccessdeniedComponent},

  // {
  //   path: 'student',
  //   component: StudentComponent,
  // },
  // {
  //   path: 'student-list',
  //   component: StudentlistComponent,
  // },
  // {
  //   path: 'student/:id',
  //   component: StudentComponent,
  // },
  // {
  //   path: 'staff',
  //   component: FormComponent,
  // },
  // {
  //   path:'staff-list',
  //   component:StafflistComponent
  // },
  // {
  //   path: 'staff/:id',
  //   component: FormComponent,
  // },
  // {
  //   path:'admin',
  //   component:AdminComponent,
  // },
  // {
  //   path:'adminDashboard',
  //   component:AdmindashboardComponent
  // },
  // {
  //   path:'studentDashboard',
  //   component:StudentdashboardComponent
  // },
  // {
  //   path:'staffDashboard',
  //   component:StafflistComponent
  // }
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'staff',
        component: FormComponent,
        title: 'Staff',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'staff-list',
        component: StafflistComponent,
        title: 'staffList',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'staff/:id',
        component: FormComponent,
        title: 'StaffById',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'student',
        component: StudentComponent,
        title: 'Student',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'student-list',
        component: StudentlistComponent,
        title: 'StudentList',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'student/:id',
        component: StudentComponent,
        title: 'StudentByID',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'adminDashboard',
        component: AdmindashboardComponent,
        canActivate:[authguardGuard],
        data:{role:Role.admin}
      },
      {
        path: 'staffDashboard',
        component: StaffdashboardComponent,
        canActivate:[authguardGuard],
        data:{role:Role.student}
      },
      {
        path: 'studentDashboard/:id',
        component: StudentdashboardComponent,
        canActivate:[authguardGuard],
        data:{role:Role.student}
      },
     
      {
        path:'staffDashboard/studentDetails',
        component:StudentdetailsComponent,
        canActivate:[authguardGuard],
        data:{role:Role.staff}
      },
      {
        path:'studentMark',
        component:StudentmarkComponent,
        canActivate:[authguardGuard],
        data:{role:Role.staff}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
