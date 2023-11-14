import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ListarComponent } from './listar/listar.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { ActualizarComponent } from './actualizar/actualizar.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
    ListarComponent,
    AuthComponent,
    ActualizarComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class AuthModule { }
