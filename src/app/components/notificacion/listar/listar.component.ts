import { Component } from '@angular/core';
import { ServicioNotificaion } from '../services/servicio.service';
import { ActivarEstadosNotificationes, Notification, StatusNotification } from './interfaces/notificacion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  notificaciones: Notification[] = [];
  notificacionesOriginales: Notification[] = [];
  notificacionesFiltradas: Notification[] = [];

  notificacion: Notification = {
    id: 0,
    user_id: 0,
    title: '',
    description: '',
    status: 1,
    deleted: 1,
    deleted_date: '',
    creation_date: '',
    user_name: '',
    user_last_name: ''
  };

  estadoNotificaciones: ActivarEstadosNotificationes = {
    user_id: localStorage.getItem('idUsuario'),
    status: 1
  }

  fechaSeleccionada: string = '';

  constructor(private servicio: ServicioNotificaion, private router: Router) { }

  getBackgroundColor(status: number): string {
    return status === 1 ? '#4CAF50' : '#F44336';
  }

  ngOnInit() {
    this.servicio.obtenerNotificaciones().subscribe(
      (data: any) => {
        this.notificacionesOriginales = data.notifications;
        this.notificaciones = [...this.notificacionesOriginales];
      },
      (error) => {
        console.error('Error al obtener notificaciones', error);
      }
    );
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      const fecha = target.value;
      this.fechaSeleccionada = fecha;

      if (fecha) {
        // Filtrar notificaciones
        this.notificacionesFiltradas = this.notificacionesOriginales.filter(noti => {
          const creationDate = noti.creation_date;
          const dateOnly = creationDate.split(' ')[0];
          return dateOnly === fecha;
        });
      } else {
        // Restaurar notificaciones originales si no se selecciona ninguna fecha
        this.notificacionesFiltradas = [...this.notificacionesOriginales];
      }

      this.notificaciones = this.notificacionesFiltradas;
    }
  }

  estado(notificacionEstado: StatusNotification): void {

    this.servicio.estadoNotificacion(notificacionEstado).subscribe(

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

        this.servicio.elminarNotificacion(id).subscribe(
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


  activarTodasLasNotificaciones(notificaionesEstados: ActivarEstadosNotificationes): void {

    this.estadoNotificaciones.status = this.estadoNotificaciones.status === 1 ? 2 : 1;

    this.servicio.activarEstadosNotificacion(notificaionesEstados).subscribe(
      (data: any) => {
        const notificacion = data.detail;
        const mensaje_estado = data.notification;

        if (notificacion === 'ok') {
          const userIdNumber = Number(notificaionesEstados.user_id);

          this.notificaciones.forEach(n => {
            if (n.user_id === userIdNumber) {
              n.status = notificaionesEstados.status;
            }
          });
        } else if (notificacion === 'no') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje_estado,
            footer: '<a href="#">¿Por qué tengo este problema?</a>',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al intentar cambiar el estado de la notificación.',
        });
        console.error('Error al cambiar estado de la notificación', error);
      }
    );
  }

  agregarNotificacion(): void {
    this.router.navigate(['app/registrar/notificacion']);
  }

  verNotificacion(id: number) {

    this.servicio.verNotificaion(id).subscribe(
      (data: any) => {

        const existeNotificacion = data.detail;

        if (existeNotificacion == 'no') {

        } else {

          const modalElement = document.getElementById('notificationModal');

          if (modalElement) {
            this.notificacion = data.notification;
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.show();
          }
        }

      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al obtener la notificación.",
        });
        console.error('Error al eliminar notificación', error);
      }
    );


  }

  

}
