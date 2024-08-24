import { Component, OnInit } from '@angular/core';
import { ServerService } from './components/usuario/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  result: any;
  constructor(private server:ServerService){}
  ngOnInit(): void {
  }
}
