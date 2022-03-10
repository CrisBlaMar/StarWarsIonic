import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Result } from '../interfaz/personajes.interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  resul: Result = null;

  constructor(private dataService: DataService, private modalCtrl: ModalController, 
    private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.dataService.obtenerPorId(this.id).subscribe(res => {
      this.resul = res;
    });
  }
 
  /**Método para borrar un personaje de la lista */
  async borrarPersonaje() {
    await this.dataService.borrar(this.resul)
    this.modalCtrl.dismiss();
  }
 
  async modificarPersonaje() {
    await this.dataService.actualizarPersonaje(this.resul);
    const toast = await this.toastCtrl.create({
      message: 'Character Update!.',
      duration: 2000
    });
    toast.present();
 
  }

}
