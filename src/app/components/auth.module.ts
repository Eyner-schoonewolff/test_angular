import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './usuario/registrar-usuario/registrar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './usuario/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ListarComponent } from './notificacion/listar/listar.component';
import { AuthComponent } from './usuario/auth/auth.component';
import { RouterModule } from '@angular/router';
import { NvarComponent } from './nvar/nvar.component';
import { RegistrarNotificacionComponent } from './notificacion/registrar-notification/registrar.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
    RegistrarNotificacionComponent,
    ListarComponent,
    AuthComponent,
    NvarComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class AuthModule { }
