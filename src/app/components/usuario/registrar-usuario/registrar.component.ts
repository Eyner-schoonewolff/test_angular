import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarUsuario } from './interfaces/registrar';
import Swal from 'sweetalert2';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  usuario: RegistrarUsuario = {
    name: '',
    last_name: '',
    password: '',
    email: '',
    document: 0,
    id_rol: 3
  }

  constructor(private servicio: ServerService, private router: Router) { }

  onSubmit(usuario: RegistrarUsuario) {

    this.servicio.registrarUsuario(usuario).subscribe(
      (data: any) => {

        const userResponse = data.response;
        const mensajeAlerta = data.detail;

        if (userResponse == "ok") {

          Swal.fire({
            title: 'Exitoso!',
            text: mensajeAlerta,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/app/login']);
            }
          });
        }
      },
      (log) => {

        if (log.status === 400) {
          Swal.fire({
            title: 'Error',
            text: log.error.detail,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          });
        }
        else if (log.error.response == "no") {
          Swal.fire({
            title: 'Registro Incorrecto',
            text: log.error.detail,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              usuario = {
                name: '',
                last_name: '',
                password: '',
                email: '',
                document: 0,
                id_rol: 0
              };
            }
          });

        } else {
          Swal.fire({
            title: 'Error',
            text: log.error.detail,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          });
        }
      }
    )

  }




}
