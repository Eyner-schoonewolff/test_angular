import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './usuario/auth/auth.component';
import { LoginComponent } from './usuario/login/login.component';
import { ListarComponent } from './notificacion/listar/listar.component';
import { RegistrarComponent } from './usuario/registrar-usuario/registrar.component';
import { RegistrarNotificacionComponent } from './notificacion/registrar-notification/registrar.component';
import { AuthGuard, AuthGuardLogin } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
      { path: 'register', component: RegistrarComponent, canActivate: [AuthGuardLogin] },
      {
        path: 'notificacion',
        component: ListarComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'registrar/notificacion',
        component: RegistrarNotificacionComponent,
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
