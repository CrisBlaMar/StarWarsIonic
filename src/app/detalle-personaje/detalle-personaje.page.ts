import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Result } from '../interfaz/personajes.interfaces';
import { PersonajesService } from '../personajes/personajes.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.page.html',
  styleUrls: ['./detalle-personaje.page.scss'],
})
export class DetallePersonajePage implements OnInit {

  constructor(private activeRoute: ActivatedRoute, 
    private personajeservice : PersonajesService, 
    private dataservice : DataService) { }

  resul : Result;
  mostrar: boolean = false;
  favorito : boolean = false;


  listanombre : Result [] = [];
  yaexisten(){
    this.dataservice.obtenerPersonajes()
    .subscribe({
      next: res => {
        this.listanombre = res;
        
      }
    })
  }

  ngOnInit() { 
    this.obtenerPersonaje(); 
    this.comprobarFavorito( this.activeRoute.snapshot.params['name'])
    this.yaexisten();
  }



  obtenerPersonaje(){
    const name = this.activeRoute.snapshot.params['name'];
    this.personajeservice.obtenerPersonajes(name)
    .subscribe({
      next: resp =>{
        this.resul = resp.results[0];
      },
      error: e =>{
        console.log(e);
      }
    })
  }

  comprobarFavorito(nombre: string){
    this.dataservice.obtenerPorId(nombre)
    .subscribe({
      next: res => {
        if(res){
        }
        else{
        }
        this.mostrar = true;
      }
    })
  }

  anadirFavorito(personaje : Result){
    let bandera : boolean = false;

    if(this.listanombre.length == 0){
      this.dataservice.anadir(personaje);
      this.openmodal(personaje.name);
    }else{
      for (let nombre of this.listanombre){
        if (nombre.name == personaje.name) {
          bandera=true;
        }
      }  
        if(bandera == true){
          this.openmodalYahay(personaje.name);
        }else{
          this.dataservice.anadir(personaje);
          this.openmodal(personaje.name);
        }
      
    
    }
    
    
  }

  openmodal(name : string){
    Swal.fire({
      title: '¡GREAT!',
      text:   name +" has been added to the list ",
      icon: 'success'
    });
  }
  openmodalYahay(name : string){
    Swal.fire({
      title: '¡OH OH!',
      text:   " It seems that " +  name  + " is already added to your list ",
      icon: 'error'
    });
  }

}
