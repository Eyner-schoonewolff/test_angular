import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { Usuario } from '../interfaces/usuario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  usuario: Usuario = {
    id: 0,
    nombre: '',
    cedula: 0,
    departamento: '',
    descripcion: '',
    estado: ''
  }

  constructor(private servicio: ServerService, private router: Router) { }

  onSubmit(usuario: Usuario) {
    this.servicio.Crear_usario(usuario).subscribe(
      (data: any) => {

        const usuario_creado = data.estado_creado;
        const mensaje_alerta = data.mensaje;

        if (usuario_creado) {

          Swal.fire({
            title: 'Exitoso!',
            text: mensaje_alerta,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/auth/login']);
            }
          });

        } else if (!usuario_creado) {
          Swal.fire({
            title: 'Ups.. Hubo un problema',
            text: mensaje_alerta,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              usuario = {
                id: 0,
                nombre: '',
                cedula: 0,
                departamento: '',
                descripcion: '',
                estado: ''
              };
            }
          });
        }
      }
    )

  }


}
