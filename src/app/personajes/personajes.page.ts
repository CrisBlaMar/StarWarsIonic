import { Component, OnInit } from '@angular/core';
import { Personajes, Result } from '../interfaz/personajes.interfaces';
import { PersonajesService } from './personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
})
export class PersonajesPage implements OnInit {

  constructor(private personajeservice : PersonajesService ) { }

  buscador: number;
  resul : Result [] = [];
  mostrar: boolean;


  mostrarPersonajes(event){
    this.buscador = event.detail.value;
    this.personajeservice.obtenerPersonajes(this.buscador)
    .subscribe ({ 
      next: resp=>{
        this.resul = resp.results;
        this.mostrar = false;
      }
      ,error : er =>{
        console.log(er)
        this.mostrar = true;
      }
    })
  }

  ngOnInit() {
  }

}
