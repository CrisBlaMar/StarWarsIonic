import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonajesPageRoutingModule } from './personajes-routing.module';

import { PersonajesPage } from './personajes.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonajesPageRoutingModule
  ],
  declarations: [PersonajesPage]
})
export class PersonajesPageModule {}
