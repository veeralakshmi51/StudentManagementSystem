import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import{HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component'
import { RouterOutlet } from '@angular/router';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {environment} from 'src/app/ServiceFolder/environment';
import { StudentmarkComponent } from './studentmark/studentmark.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    FormComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    StudentlistComponent,
    StafflistComponent,
    SidebarComponent,
    AdmindashboardComponent,
    StudentdashboardComponent,
    StaffdashboardComponent,
    StudentmarkComponent,
    StudentdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
