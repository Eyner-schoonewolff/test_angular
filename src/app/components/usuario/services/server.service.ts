import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../login/interfaces/usuario';
import { RegistrarUsuario } from '../registrar-usuario/interfaces/registrar';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {
  }

  URI: string = environment.apiURL;

  users: Auth[] = []

  aunetnticacionUsuario(auth: Auth) {
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


  registrarUsuario(usuario: RegistrarUsuario) {

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




}



