import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/components/usuario/services/server.service';
import { Auth } from './interfaces/usuario';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth: Auth = {
    email: '',
    password: ''

  }

  constructor(private router: Router, private servicio: ServerService) { }

  onSubmit(auth: Auth) {
    this.servicio.aunetnticacionUsuario(auth).subscribe(
      (data: any) => {

        if (data.auth == "ok") {
          this.router.navigate(['/app/notificacion']);

          localStorage.setItem('idUsuario', data.user.id);
          localStorage.setItem('nombre', data.user.name +' '+ data.user.last_name);
          localStorage.setItem('token', data.token);
        }
      },

      (log) => {

        if (log.error.auth == "no") {
          Swal.fire({
            title: 'Usuario Incorrecto',
            text: log.error.detail,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: log.error,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          });
        }
      }
    );
  }


  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    };
  }
}
