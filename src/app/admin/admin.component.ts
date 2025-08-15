import { Component } from '@angular/core';
import { admin } from '../InterfaceFolder/studentDetails';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../EnumFolder/role';
import { AdminService } from '../ServiceFolder/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http:AdminService,private toast:ToastrService){}
   admin:admin[]=[];
   adminForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
    adminId:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    role:new FormControl(Role.admin,[Validators.required])
   });
   loginAdmin(){
    if(this.adminForm.valid){
      const adminData=this.adminForm.value as admin;
      this.http.addNewAdmin(adminData).subscribe((admin)=>{
        this.admin.push(admin);
        this.toast.success('New Admin User created successfully');
        this.adminForm.reset({role:Role.admin});
      })
    }
   }
}
