import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Result } from '../interfaz/personajes.interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  obtenerPersonajes(): Observable<Result[]> {
    const pers = collection(this.firestore, 'personaje');
    return collectionData(pers, { idField: 'id'}) as Observable<Result[]>;
  }
 
  obtenerPorId(id): Observable<Result>{
    const pers = doc(this.firestore, `personaje/${id}`);
    return docData(pers, { idField: 'id' }) as Observable<Result>;
  }
 
  anadir(personaje : Result) {
    const pers = collection(this.firestore, 'personaje');
    return addDoc(pers, personaje); //devuelve varias propiedades, y tambien el id raro
  }
 
  borrar(personaje : Result ) {
    const pers = doc(this.firestore, `personaje/${personaje.id}`);
    return deleteDoc(pers);
  }
 
  actualizarPersonaje(personaje : Result) {
    const pers = doc(this.firestore, `personaje/${personaje.id}`);
    return updateDoc(pers, { name: personaje.name});
  }

}
