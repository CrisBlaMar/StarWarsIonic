import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Personajes, Result } from "../interfaz/personajes.interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class PersonajesService {
  
    constructor( private httpclient : HttpClient) { }

    //https://swapi.dev/api/people/?search=r2

    private urlApi: string = "https://swapi.dev/api/people/";
    resul : Result [] = [];

    obtenerPersonajes(query : number){
        const params : HttpParams = new HttpParams()
            .set('search', query)
    let url = `${this.urlApi}`
    return this.httpclient.get<Personajes>(url, {params: params});
    }
  
  }