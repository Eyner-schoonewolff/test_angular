import { Component } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Usuario } from '../interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    cedula: 0,
    departamento: '',
    descripcion: '',
    estado: ''
  }
  usuarios: Usuario[] = [];

  constructor(private servicio: ServerService, private router: Router) { }

  ngOnInit() {
    this.servicio.Obtener_usuarios().subscribe(
      (data: any) => {
        this.usuarios = data.usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  cerrar_sesion(): void {
    localStorage.clear()
    this.usuarios.splice(0, this.usuarios.length);
    this.router.navigate(['/auth/login']);
  }

  desactivar(): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro que deseas descativar tu usuario?",
      text: "Si desactivas la cuenta no podras acceder con este usuario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "si, desactivar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicio.cambiar_estado_usuario().subscribe(
          (data: any) => {
            const usuario_activo = data.estado;
            const mensaje_estado = data.mensaje;

            if (usuario_activo) {

              swalWithBootstrapButtons.fire({
                title: "Descativada!",
                text: mensaje_estado,
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  this.router.navigate(['/auth/login']);
                }
              });

            } else if (!usuario_activo) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: mensaje_estado,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            }
          }
        )


      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "se ha cancelado el proceso de desactivar usuario :)",
          icon: "error"
        });
      }
    });



  }

  redirigirActualizar(usuario: Usuario) {
    this.router.navigate(['auth/actualizar', usuario]);
  }

}
