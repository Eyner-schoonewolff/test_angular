import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {

  usuario: Usuario = {
    id: 0,
    nombre: '',
    cedula: 0,
    departamento: '',
    descripcion: '',
    estado: ''
  }
  usuarios: Usuario[] = [];

  constructor(private servicio: ServerService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.usuario = {
        id: params['id'],
        nombre: params['nombre'],
        cedula: params['cedula'],
        departamento: '',
        descripcion: params['descripcion'],
        estado: params['estado']
      }
    })
  }

  onSubmit(usuario: Usuario) {

    if (usuario.departamento == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes elegir un departamento",
      });
      return;
    }

    this.servicio.actualizarUsuario(usuario).subscribe(
      (data: any) => {
        const mensaje = data.mensaje;
        console.log(data.estado);


        if (data.estado) {
          Swal.fire({
            title: 'Usuario actualizado',
            text: mensaje,
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/auth/home']);
            }
          });
          return
        } else {
          Swal.fire({
            title: 'el usuario no se ha actualizado',
            text: mensaje,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
          });
        }
      }
    )

  }

}
