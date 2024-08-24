import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../components/login/interfaces/usuario';
import { RegistrarUsuario } from '../components/registrar-usuario/interfaces/registrar';
import { StatusNotification } from '../components/listar/interfaces/notificacion';
import { Notification } from '../components/listar/interfaces/notificacion';
import { Notification as RegistrarNotificaion } from '../components/registrar-notification/interfaces/notificacion';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {
  }

  URI: any = "http://127.0.0.1:8000/api/v1";

  users: Auth[] = []

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  UserAuth(auth: Auth) {
    let email = auth.email;
    let password = auth.password;

    return this.http.post(this.URI + '/user/auth', { email, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        } else if (error.status === 404) {
          return throwError('Recurso no encontrado');
        } else {
          return throwError('Error desconocido');
        }
      })
    );
  }


  Crear_usario(usuario: RegistrarUsuario) {

    let name = usuario.name;
    let last_name = usuario.last_name;
    let email = usuario.email;
    let password = usuario.password;
    let document = usuario.document;
    let id_rol = usuario.id_rol;


    return this.http.post(this.URI + '/user', { name, last_name, email, password, document, id_rol }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    )
  }

  Obtener_notificaciones() {

    const id = localStorage.getItem('idUsuario');
    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.get<Notification[]>(this.URI + '/notification/all/' + id, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }

  Registrar_notificacion(notificacion: RegistrarNotificaion) {

    const user_id = localStorage.getItem('idUsuario');
    const title = notificacion.title;
    const description = notificacion.description;

    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.post<RegistrarNotificaion>(this.URI + '/notification/', { user_id, title, description }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }

  elminar_notificacion(id: number) {

    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.put(this.URI + '/notification/deleted', { id }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

  estado_notificacion(notificacionEstado: StatusNotification) {

    const token = this.getToken();
    const headers = {
      Authorization: 'Bearer ' + token || ''
    };

    return this.http.put(this.URI + '/notification/status', notificacionEstado, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

  // actualizarNotificacion(notificacion: Notification) {

  //   const nombre = usuario.nombre;
  //   const cedula = usuario.cedula;
  //   const id_departamento = usuario.departamento
  //   const id = usuario.id;

  //   const token = this.getToken();
  //   const headers = {
  //     Authorization: 'Bearer ' + token || ''
  //   };

  //   return this.http.put(this.URI + '/actualizar_usuario', { nombre, cedula, id_departamento, id }, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //       return throwError(error);
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }

}



