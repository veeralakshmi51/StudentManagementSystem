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
      },
      {
        path: 'staff-list',
        component: StafflistComponent,
        title: 'staffList',
      },
      {
        path: 'staff/:id',
        component: FormComponent,
        title: 'StaffById',
      },
      {
        path: 'student',
        component: StudentComponent,
        title: 'Student',
      },
      {
        path: 'student-list',
        component: StudentlistComponent,
        title: 'StudentList',
      },
      {
        path: 'student/:id',
        component: StudentComponent,
        title: 'StudentByID',
      },
      {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
      },
      {
        path: 'adminDashboard',
        component: AdmindashboardComponent,
      },
      {
        path: 'staffDashboard',
        component: StaffdashboardComponent,
      },
      {
        path: 'studentDashboard/:id',
        component: StudentdashboardComponent,
      },
     
      {
        path:'staffDashboard/studentDetails',
        component:StudentdetailsComponent,
      },
      {
        path:'studentMark',
        component:StudentmarkComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
