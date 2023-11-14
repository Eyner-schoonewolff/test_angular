import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ListarComponent } from './listar/listar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'home', component: ListarComponent },
        { path: 'register', component: RegistrarComponent },
        { path: 'actualizar', component: ActualizarComponent },
        { path: '**', redirectTo: '404'},
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
