import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from './interfaces/notificacion';
import { ServicioNotificaion } from '../services/servicio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarNotificacionComponent {

  notificacion: Notification = {
    user_id: 0,
    title: '',
    description: ''
  }

  constructor(private router: Router, private servicio: ServicioNotificaion) {

  }

  onSubmit(notificacion: Notification) {
    this.servicio.registrarNotificacion(notificacion).subscribe(

      (data: any,) => {

        let response = data.detail;

        Swal.fire({
          title: 'Exitoso!',
          text: response,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/app/notificacion']);
          }
        });


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
              notificacion = {
                user_id: 0,
                title: '',
                description: ''
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
