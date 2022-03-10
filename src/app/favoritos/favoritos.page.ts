import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Result } from '../interfaz/personajes.interfaces';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  resul: Result[] = [];
  constructor(private dataService: DataService,  private modalCtrl: ModalController) { }

  ngOnInit() {
    this.obtenerFavoritos();
  }

  obtenerFavoritos(){
    this.dataService.obtenerPersonajes()
    .subscribe({
      next: resp => {this.resul = resp}
    })
  }

  async abrirPersonaje(resul: Result) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: resul.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }



}
