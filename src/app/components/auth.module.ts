import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar-usuario/registrar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ListarComponent } from './listar/listar.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { NvarComponent } from './nvar/nvar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { RegistrarNotificacionComponent } from './registrar-notification/registrar.component';


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
