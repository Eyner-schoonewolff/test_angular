import { Component } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Notification, StatusNotification } from '../listar/interfaces/notificacion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  notificaciones: Notification[] = [];

  constructor(private servicio: ServerService, private router: Router) { }

  getBackgroundColor(status: number): string {
    return status === 1 ? '#4CAF50' : '#F44336';
  }
  ngOnInit() {

    this.servicio.Obtener_notificaciones().subscribe(
      (data: any) => {

        this.notificaciones = data.notifications;

      },
      (error) => {
        console.error('Error al obtener notificaiones', error);
      }
    );
  }


  estado(notificacionEstado: StatusNotification): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    this.servicio.estado_notificacion(notificacionEstado).subscribe(
      (data: any) => {

        const notificacion = data.detail;
        const mensaje_estado = data.notification;

        if (notificacion === 'ok') {

          const index = this.notificaciones.findIndex(n => n.id === notificacionEstado.id);

          if (index !== -1) {
            this.notificaciones[index].status = notificacionEstado.status;
          }

        } else if (notificacion === "no") {

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: mensaje_estado,
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
          });
        }
      },

      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al intentar desactivar la notificación.",
        });
        console.error('Error al eliminar notificación', error);
      }
    );
  }

  eliminar(id: number): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro que deseas eliminar la notificación?",
      text: "Si eliminas la notificación, no podrás acceder nuevamente a esta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicio.elminar_notificacion(id).subscribe(
          (data: any) => {

            const notificacion = data.detail;
            const mensaje_estado = data.notification;

            if (notificacion === 'ok') {

              this.notificaciones = this.notificaciones.filter(n => n.id !== id);

              swalWithBootstrapButtons.fire({
                title: "Eliminada!",
                text: mensaje_estado,
                icon: "success"
              });

            } else if (notificacion === "no") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: mensaje_estado,
                footer: '<a href="#">¿Por qué tengo este problema?</a>'
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al intentar eliminar la notificación.",
            });
            console.error('Error al eliminar notificación', error);
          }
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se ha cancelado el proceso de eliminar la notificación.",
          icon: "error"
        });
      }
    });

  }

  agregarNotificacion(): void {
    this.router.navigate(['app/registrar/notificacion']);
  }

  // redirigirActualizar(usuario: Usuario) {
  //   this.router.navigate(['auth/actualizar', usuario]);
  // }

}
