import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { Usuario } from '../interfaces/usuario';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = {
    id: 0,
    nombre: '',
    cedula: 0,
    departamento: '',
    descripcion: '',
    estado: ''
  }

  constructor(private router: Router, private servicio: ServerService) { }

  onSubmit(usuario: Usuario) {
    this.servicio.GetToken(usuario).subscribe(
      (data: any) => {
        const usuario = data.session.login
        const datosUsuario = data.session;
        if (usuario) {
          this.router.navigate(['/auth/home']);
          console.log(datosUsuario.cedula)
          localStorage.setItem('idUsuario', data.session.id);
          localStorage.setItem('token', data.data.token);

        } else if (datosUsuario.nombre === " " || datosUsuario.cedula === 0) {
          Swal.fire({
            title: 'Datos icompletos',
            text: 'El nombre o la cedula tienen datos vacios',
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          })
        }

        else if (!usuario) {
          Swal.fire({
            title: 'Usuario Incorrecto',
            text: 'El nombre o la cedula estan incorrectas',
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          })
        }
      }
    )
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.trim() === '') {
        return { 'whitespace': true };
      }
      return null;
    };
  }
}
