import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionUsuario } from "./interfaces/nvar"

@Component({
  selector: 'app-nvar',
  templateUrl: './nvar.component.html',
  styleUrls: ['./nvar.component.css']
})
export class NvarComponent {

  personalInformacion: InformacionUsuario = {
    nombre: localStorage.getItem('nombre')
  }

  constructor(private router: Router) {

  }

  cerrar_sesion(): void {
    localStorage.clear()
    this.router.navigate(['/app/login']);
  }


}
