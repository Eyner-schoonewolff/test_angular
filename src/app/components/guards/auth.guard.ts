import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/app/login']);
      return false;
    }

    return true;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/app/notificacion']);
      return false;
    }
    return true;
  }

}

