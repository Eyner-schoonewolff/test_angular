import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ActivarEstadosNotificationes, Notification, StatusNotification } from '../listar/interfaces/notificacion';
import { Notification as RegistrarNotificaion } from '../registrar-notification/interfaces/notificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioNotificaion {

  constructor(private http: HttpClient) {
  }

  URI: string = environment.apiURL;

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private headers() {

    const headersBody = {
      Authorization: 'Bearer ' + this.getToken() || ''
    };
    return headersBody
  }

  obtenerNotificaciones() {

    const id = localStorage.getItem('idUsuario');
    const headers = this.headers();

    return this.http.get<Notification[]>(this.URI + '/notification/all/' + id, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }

  registrarNotificacion(notificacion: RegistrarNotificaion) {

    const user_id = localStorage.getItem('idUsuario');
    const title = notificacion.title;
    const description = notificacion.description;

    const headers = this.headers();


    return this.http.post<RegistrarNotificaion>(this.URI + '/notification/', { user_id, title, description }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }

  elminarNotificacion(id: number) {

    const headers = this.headers();

    return this.http.put(this.URI + '/notification/deleted', { id }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

  estadoNotificacion(notificacionEstado: StatusNotification) {

    const headers = this.headers();

    return this.http.put(this.URI + '/notification/status', notificacionEstado, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

  activarEstadosNotificacion(notificacionEstado: ActivarEstadosNotificationes) {

    const headers = this.headers();


    return this.http.put(this.URI + '/notification/all_status', notificacionEstado, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

  verNotificaion(id: number) {

    const headers = this.headers();

    return this.http.get(this.URI + '/notification/' + id, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);

        }
        return throwError(error);
      })
    );
  }

}
