import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../components/interfaces/usuario';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {
  }

  URI: any = "http://localhost:3000";

  users: Usuario[] = []

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  GetToken(usuario: Usuario) {
    let nombre = usuario.nombre;
    let cedula = usuario.cedula;

    return this.http.post(this.URI + '/login', { nombre, cedula }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Recurso no encontrado:', error);
          return throwError('Recurso no encontrado');
        } else {
          console.error('Error no manejado:', error);
          return throwError('Error desconocido');
        }
      })
    );
  }

  Crear_usario(usuario: Usuario) {

    let nombre = usuario.nombre;
    let cedula = usuario.cedula;
    let id_departamento = usuario.departamento;


    return this.http.post(this.URI + '/crear_usuario', { nombre, cedula, id_departamento }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Recurso no encontrado:', error);
          return throwError('Recurso no encontrado');
        } else {
          console.error('Error no manejado:', error);
          return throwError('Error desconocido');
        }
      })
    )
  }

  Obtener_usuarios() {

    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.get<Usuario[]>(this.URI + '/usuarios', { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Acceso denegado. Redirigiendo a la página de inicio de sesión.');
        }
        return throwError(error);
      })
    );
  }

  cambiar_estado_usuario() {
    const id = localStorage.getItem('idUsuario');
    const estado = 2;
    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.put(this.URI + '/desactivar_usuario', { estado, id }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Acceso denegado.');
        }
        return throwError(error);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {

    const nombre = usuario.nombre;
    const cedula = usuario.cedula;
    const id_departamento = usuario.departamento
    const id = usuario.id;

    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.put(this.URI + '/actualizar_usuario', { nombre, cedula, id_departamento, id }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Acceso denegado.');
        }
        return throwError(error);
      })
    );
  }

}



