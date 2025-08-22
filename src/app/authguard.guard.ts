import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from './EnumFolder/role';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  const userRole=localStorage.getItem('userRole');
  if(!userRole){
    router.navigate(['/login']);
    return false;
  }
  const expectedRole=route.data['role'] as Role;
  if(expectedRole && expectedRole!==userRole){
    router.navigate(['/access-denied']);
    return false;
  }
  return true;
};
